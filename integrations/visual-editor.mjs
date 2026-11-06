import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash,randomBytes} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const execute=promisify(execFile);
const branch='feat/feature-catalog';
const hash=text=>createHash('sha256').update(text).digest('hex');
const excluded=new Set(['id','slug','status','evidence','dependencies','href','privacyPath','icon','symbol','group','moduleId','moduleIds','planIds','sectors','feature','guideSlugs','faqIds','related','tags','currency','launchDraftLabel','launchDraftNotice']);
export async function createVisualEditor(root){
 const token=randomBytes(32).toString('hex'),pending=new Map();let queue=Promise.resolve(),pushPending=null;
 const git=async(...args)=>(await execute('git',args,{cwd:root,timeout:30000,maxBuffer:100000})).stdout.trim();
 async function fileData(file){
  if(!/^content\/[a-z-]+\.json$/.test(file))throw new Error('invalid-file');
  const absolute=path.join(root,file),stat=await fs.lstat(absolute);
  if(stat.isSymbolicLink()||!(await fs.realpath(absolute)).startsWith(await fs.realpath(path.join(root,'content'))+path.sep))throw new Error('invalid-file');
  const raw=await fs.readFile(absolute,'utf8');return {raw,data:JSON.parse(raw),hash:hash(raw)};
 }
 async function state(){
  const config=JSON.parse(await fs.readFile(path.join(root,'.pages.yml'),'utf8'));
  const records=[];
  const labelFor=(file,parts)=>{const entry=config.content.find(item=>item.path===file&&(file!=='content/pages.json'||item.fields.some(field=>field.name===parts[0])));let fields=entry?.fields??[];let label=entry?.label??'Contenido';for(const part of parts){if(/^\d+$/.test(part))continue;const field=fields.find(item=>item.name===part);if(field){label=field.label;fields=field.fields??[];}}return (entry?.label??'Contenido')+' · '+label;};
  for(const file of new Set(config.content.map(item=>item.path))){
   const source=await fileData(file);
   function walk(value,parts=[]){
    if(value&&typeof value==='object'){for(const [key,child]of Object.entries(value))if(!excluded.has(key))walk(child,[...parts,key]);return;}
    const key=parts.at(-1);
    if(typeof value==='string'&&value.trim()&&!['coral','ink','policyDate','ruc','whatsapp','email'].includes(key)&&!/^https?:|^\//.test(value))records.push({file,path:parts,value,hash:source.hash,label:labelFor(file,parts),kind:'text'});
    if(file==='content/site.json'&&['logoLight','logoDark','favicon'].includes(key)&&typeof value==='string')records.push({file,path:parts,value,hash:source.hash,label:labelFor(file,parts),kind:'image'});
   }
   walk(source.data);
  }
  const media=(await fs.readdir(path.join(root,'public/media'))).filter(name=>/^[\w.-]+\.(png|jpe?g|webp)$/i.test(name)).map(name=>'/media/'+name);
  return {token,records,media,pending:[...pending.keys()],head:await git('rev-parse','HEAD'),branch:await git('branch','--show-current'),pushPending};
 }
 async function save(body){
  const current=await state();
  const record=current.records.find(item=>item.file===body.file&&JSON.stringify(item.path)===JSON.stringify(body.path));
  if(!record)throw new Error('invalid-field');
  if(typeof body.value!=='string'||!body.value.trim()||body.value.length>20000)throw new Error('invalid-value');
  if(record.kind==='image'&&!current.media.includes(body.value))throw new Error('invalid-image');
  const source=await fileData(record.file);
  if(body.hash!==source.hash)throw new Error('conflict');
  let target=source.data;for(const key of record.path.slice(0,-1))target=target[key];target[record.path.at(-1)]=body.value;
  const cleanBefore=pending.get(record.file)?.cleanBefore??!(await git('status','--porcelain','--',record.file));
  const next=JSON.stringify(source.data,null,2)+'\n';
  const tmp=path.join(root,record.file+'.visual-'+randomBytes(8).toString('hex')+'.tmp');
  await fs.writeFile(tmp,next,{flag:'wx'});await fs.rename(tmp,path.join(root,record.file));
  try{await execute(process.execPath,['scripts/validate-content.mjs'],{cwd:root,timeout:15000,maxBuffer:100000});}
  catch{if((await fileData(record.file)).hash!==hash(next))throw new Error('conflict');await fs.writeFile(tmp,source.raw,{flag:'wx'});await fs.rename(tmp,path.join(root,record.file));throw new Error('validation');}
  const originalHash=pending.get(record.file)?.originalHash??source.hash;
  if(hash(next)===originalHash)pending.delete(record.file);else pending.set(record.file,{hash:hash(next),originalHash,cleanBefore});return state();
 }
 async function commit(body){
  if(await git('branch','--show-current')!==branch||body.head!==await git('rev-parse','HEAD'))throw new Error('conflict');
  if(await git('diff','--cached','--name-only'))throw new Error('staged-changes');
  if(pending.size&&!pushPending){
   for(const [file,info]of pending){if(!info.cleanBefore)throw new Error('preexisting-changes');if((await fileData(file)).hash!==info.hash)throw new Error('conflict');}
   await git('add','--',...pending.keys());
   try{await git('-c','user.name=Joel Alejandro Yañez Caballero','-c','user.email=joel.yc23@gmail.com','commit','-m','content: save visual editor changes');}
   catch{await git('reset','--',...pending.keys());throw new Error('commit-failed');}
   pushPending=await git('rev-parse','HEAD');pending.clear();
  }
  if(!pushPending)throw new Error('nothing-to-commit');
  try{await git('push','origin',`${pushPending}:refs/heads/${branch}`);pushPending=null;}
  catch{throw new Error('push-failed');}
  return state();
 }
 const errors={'conflict':'El archivo, la rama o el commit cambió. Recarga antes de guardar.','validation':'El cambio no supera la validación. Se restauró el archivo anterior.','push-failed':'Commit creado localmente; no se pudo enviar. Reintenta el envío sin crear otro commit.','preexisting-changes':'Hay cambios previos en un archivo editado. Revisa y guarda con Git manualmente.','staged-changes':'Hay otros cambios preparados en Git. Revisa el índice manualmente.','push-first':'Envía primero el commit pendiente.','nothing-to-commit':'No hay cambios de esta sesión para guardar en GitHub.'};
 return async function middleware(req,res,next){
  if(!req.url?.startsWith('/__visual_editor/'))return next();
  const reply=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));};
  let origin;try{origin=new URL('http://'+req.headers.host);}catch{return reply(403,{error:'Acceso local requerido.'});}
  if(!['127.0.0.1','localhost','[::1]'].includes(origin.hostname)||!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress)||req.headers['sec-fetch-site']==='cross-site'||(req.headers.origin&&req.headers.origin!==origin.origin))return reply(403,{error:'Acceso local requerido.'});
  const route=new URL(req.url,origin).pathname;
  if(req.method==='GET'&&route==='/__visual_editor/state'){try{return reply(200,await queue.then(()=>state()));}catch{return reply(500,{error:'No se pudo leer el proyecto.'});}}
  if(req.method!=='POST')return reply(405,{error:'Método no permitido.'});
  if(req.headers.origin!==origin.origin||req.headers['x-editor-token']!==token||req.headers['content-type']!=='application/json')return reply(403,{error:'Solicitud no autorizada.'});
  let raw='',oversize=false;for await(const chunk of req){if(Buffer.byteLength(raw)+chunk.length>65536){oversize=true;break;}raw+=chunk;}
  if(oversize)return reply(413,{error:'Cambio demasiado grande.'});
  let body;try{body=JSON.parse(raw);}catch{return reply(400,{error:'JSON inválido.'});}
  const action=route==='/__visual_editor/save'?save:route==='/__visual_editor/commit'?commit:null;
  if(!action)return reply(404,{error:'Acción desconocida.'});
  const task=queue.then(()=>action(body));queue=task.catch(()=>{});
  try{return reply(200,await task);}catch(error){return reply(error.message==='conflict'?409:422,{error:errors[error.message]??'No se pudo completar el cambio. Revisa el proyecto antes de continuar.'});}
 };
}
export default function visualEditor(){return {name:'sistematicando-visual-editor',hooks:{'astro:server:setup':async({server})=>{server.middlewares.use(await createVisualEditor(process.cwd()));}}};}
