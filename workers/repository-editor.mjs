import {validateContent} from '../src/lib/content-validation.mjs';
const REPO='manaturaloso/sistematicando-web',BRANCH='feat/feature-catalog';
const FILES=['articles','contact','faqs','features','guides','home','implementation','navigation','pages','pricing','site','solutions','terms'].map(name=>'content/'+name+'.json');
const blocked=new Set(['__proto__','constructor','prototype','id','slug','status','evidence','dependencies','href','privacyPath','icon','symbol','group','moduleId','moduleIds','planIds','sectors','feature','guideSlugs','faqIds','related','tags','currency','launchDraft','launchDraftLabel','launchDraftNotice','coral','ink','policyDate','ruc','whatsapp','email']);
const sha=value=>typeof value==='string'&&/^[a-f\d]{40}$/.test(value);
const textFrom64=value=>new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(atob(value.replace(/\s/g,'')),char=>char.charCodeAt(0)));
export class EditorError extends Error{constructor(status,message){super(message);this.status=status;}}
export function createRepositoryEditor({fetcher=fetch}={}){
 const fail=(status,message)=>{throw new EditorError(status,message);};
 async function api(token,route,method='GET',body){
  const response=await fetcher(`https://api.github.com/repos/${REPO}/${route}`,{method,redirect:'error',headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'Sistematicando-Visual-Editor',...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});
  if(!response.ok)fail(method==='PATCH'&&[409,422].includes(response.status)?409:502,method==='PATCH'?'La rama cambió o rechazó el commit. Recarga y revisa; no se forzó la actualización.':'GitHub no confirmó la operación. Revisa el estado antes de reintentar.');
  return response.json();
 }
 async function snapshot(token){
  const ref=await api(token,`git/ref/heads/${BRANCH}`),head=ref.object?.sha;if(!sha(head))fail(502,'Referencia de GitHub inválida.');
  const commit=await api(token,`git/commits/${head}`),treeSha=commit.tree?.sha;if(!sha(treeSha))fail(502,'Árbol de GitHub inválido.');
  const tree=await api(token,`git/trees/${treeSha}?recursive=1`);if(tree.truncated!==false||tree.sha!==treeSha||!Array.isArray(tree.tree))fail(502,'Inventario incompleto; no se permite guardar.');
  const regular=new Map(tree.tree.filter(item=>item.type==='blob'&&item.mode==='100644').map(item=>[item.path,item]));
  const read=async file=>{if(!regular.has(file))fail(422,'Archivo no regular o no disponible.');const entry=await api(token,`contents/${file}?ref=${head}`);if(entry.type!=='file'||entry.encoding!=='base64'||entry.sha!==regular.get(file).sha||typeof entry.content!=='string'||entry.content.length>1500000)fail(502,'Contenido de GitHub incompleto.');try{return JSON.parse(textFrom64(entry.content));}catch{fail(422,'JSON de contenido inválido.');}};
  const config=await read('.pages.yml');if(!Array.isArray(config.content))fail(422,'Esquema CMS inválido.');
  const declared=new Set(config.content.map(entry=>entry.path));if(declared.size!==FILES.length||FILES.some(file=>!declared.has(file)))fail(422,'El inventario CMS cambió; requiere revisión técnica.');
  const documents=Object.fromEntries(await Promise.all(FILES.map(async file=>[file,await read(file)])));
  const media=new Set([...regular.keys()].filter(file=>/^public\/media\/[\w./-]+\.(png|jpe?g|webp|svg)$/i.test(file)).map(file=>file.slice('public'.length)));
  try{validateContent({documents,config,media});}catch{fail(422,'El contenido de origen no supera la validación compartida.');}
  return {head,treeSha,documents,config,media};
 }
 async function read(token){const value=await snapshot(token);return {head:value.head,repository:REPO,branch:BRANCH,documents:value.documents,media:[...value.media],contentWritesEnabled:false};}
 async function commit(token,body){
  if(!body||!sha(body.baseHead)||!Array.isArray(body.edits)||!body.edits.length||body.edits.length>30)fail(400,'Solicitud de cambios inválida.');
  const current=await snapshot(token);if(body.baseHead!==current.head)fail(409,'La rama cambió desde que abriste el contenido. Recarga antes de guardar.');
  const touched=new Set(),changes=[],seen=new Set();
  for(const edit of body.edits){
   if(!FILES.includes(edit.file)||!Array.isArray(edit.path)||!edit.path.length||edit.path.length>20||edit.path.some(key=>typeof key!=='string'||blocked.has(key))||typeof edit.oldValue!=='string'||typeof edit.value!=='string'||!edit.value.trim()||edit.value.length>20000)fail(422,'Campo o valor fuera del alcance de edición visual.');
   const id=JSON.stringify([edit.file,edit.path]);if(seen.has(id))fail(422,'Campo repetido en la solicitud.');seen.add(id);
   let target=current.documents[edit.file];for(const key of edit.path.slice(0,-1)){if(!target||typeof target!=='object'||!Object.hasOwn(target,key))fail(422,'Campo inexistente.');target=target[key];}
   const key=edit.path.at(-1);if(!target||typeof target!=='object'||!Object.hasOwn(target,key)||typeof target[key]!=='string')fail(422,'Campo no editable.');
   if(target[key]!==edit.oldValue)fail(409,'El valor del campo cambió. Recarga antes de guardar.');
   const image=edit.file==='content/site.json'&&['logoLight','logoDark','favicon'].includes(key);
   if(image&&!current.media.has(edit.value))fail(422,'La imagen debe existir en la biblioteca del repositorio.');
   if(!image&&(/^https?:|^\//.test(edit.value)||/^https?:|^\//.test(edit.oldValue)))fail(422,'Las rutas se editan desde el CMS estructurado.');
   if(edit.value===edit.oldValue)continue;
   target[key]=edit.value;touched.add(edit.file);changes.push({file:edit.file,path:edit.path,oldValue:edit.oldValue,value:edit.value});
  }
  if(!changes.length)fail(422,'No hay cambios para guardar.');
  try{validateContent({documents:current.documents,config:current.config,media:current.media});}catch{fail(422,'Los cambios no superan la validación compartida. No se actualizó la rama.');}
  const tree=[];
  for(const file of touched){const blob=await api(token,'git/blobs','POST',{content:JSON.stringify(current.documents[file],null,2)+'\n',encoding:'utf-8'});if(!sha(blob.sha))fail(502,'GitHub no confirmó el contenido.');tree.push({path:file,mode:'100644',type:'blob',sha:blob.sha});}
  const nextTree=await api(token,'git/trees','POST',{base_tree:current.treeSha,tree});if(!sha(nextTree.sha))fail(502,'GitHub no confirmó el árbol.');
  const author={name:'Joel Alejandro Yañez Caballero',email:'joel.yc23@gmail.com'};
  const nextCommit=await api(token,'git/commits','POST',{message:'content: save visual editor changes',tree:nextTree.sha,parents:[current.head],author,committer:author});if(!sha(nextCommit.sha))fail(502,'GitHub no confirmó el commit.');
  const updated=await api(token,`git/refs/heads/${BRANCH}`,'PATCH',{sha:nextCommit.sha,force:false});if(updated.object?.sha!==nextCommit.sha)fail(502,'Actualización no confirmada; comprueba la rama antes de reintentar.');
  return {commit:nextCommit.sha,branch:BRANCH,repository:REPO,files:[...touched],published:false};
 }
 return {read,commit};
}
