import {createRepositoryEditor,EditorError} from './repository-editor.mjs';
// Authenticated repository editor. Remote writes remain disabled by default.
export const REPOSITORY='manaturaloso/sistematicando-web';
export const EDITOR_BRANCH='feat/feature-catalog';
const LOGIN='manaturaloso';
const STATE='__Host-sistematicando_oauth';
const SESSION='__Host-sistematicando_session';
const encoder=new TextEncoder(),decoder=new TextDecoder();
const bytesToBase64=bytes=>btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
const fromBase64=value=>Uint8Array.from(atob(value.replaceAll('-','+').replaceAll('_','/')),char=>char.charCodeAt(0));
const nonce=()=>bytesToBase64(crypto.getRandomValues(new Uint8Array(32)));
function configured(env){
 try{const origin=new URL(env.EDITOR_ORIGIN);return origin.protocol==='https:'&&origin.origin===env.EDITOR_ORIGIN&&!origin.username&&!origin.password&&env.GITHUB_CLIENT_ID?.trim()&&env.GITHUB_CLIENT_SECRET?.trim()&&/^[a-f\d]{64}$/i.test(env.SESSION_KEY);}catch{return false;}
}
async function key(env){return crypto.subtle.importKey('raw',Uint8Array.from(env.SESSION_KEY.match(/../g),part=>parseInt(part,16)),{name:'AES-GCM'},false,['encrypt','decrypt']);}
async function seal(value,env){const iv=crypto.getRandomValues(new Uint8Array(12));const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode(env.EDITOR_ORIGIN)},await key(env),encoder.encode(JSON.stringify(value)));return bytesToBase64(iv)+'.'+bytesToBase64(new Uint8Array(encrypted));}
async function open(value,env,now){
 try{if(typeof value!=='string'||value.length>6000)return null;const parts=value.split('.');if(parts.length!==2)return null;const payload=await crypto.subtle.decrypt({name:'AES-GCM',iv:fromBase64(parts[0]),additionalData:encoder.encode(env.EDITOR_ORIGIN)},await key(env),fromBase64(parts[1]));const decoded=JSON.parse(decoder.decode(payload));return Number.isSafeInteger(decoded.exp)&&decoded.exp>now?decoded:null;}catch{return null;}
}
const cookie=(name,value,ttl)=>`${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${ttl}`;
function cookies(request){return Object.fromEntries((request.headers.get('Cookie')??'').split(';').map(item=>item.trim().split('=')).filter(parts=>parts.length===2));}
function response(status,data,extra={}){return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Pragma':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'",...extra}});}
const redirect=(url,cookieValue)=>response(302,{redirect:true},{Location:url,'Set-Cookie':cookieValue});
async function identity(token,fetcher){
 const headers={Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'Sistematicando-Visual-Editor'};
 const user=await fetcher('https://api.github.com/user',{headers,redirect:'error'});if(!user.ok)throw new Error('denied');const profile=await user.json();if(profile.login!==LOGIN)throw new Error('denied');
 const repository=await fetcher(`https://api.github.com/repos/${REPOSITORY}`,{headers,redirect:'error'});if(!repository.ok)throw new Error('denied');const repo=await repository.json();if(repo.full_name!==REPOSITORY||repo.permissions?.push!==true)throw new Error('denied');return {login:profile.login};
}
export function createAuthHandler({fetcher=fetch,now=()=>Math.floor(Date.now()/1000)}={}){
 const repositoryEditor=createRepositoryEditor({fetcher});
 return async function handle(request,env){
  if(!configured(env))return response(503,{error:'Autenticación sin configurar. No hay acceso ni escritura habilitados.'});
  const url=new URL(request.url);
  if(url.origin!==env.EDITOR_ORIGIN)return response(403,{error:'Origen no autorizado.'});
  const origin=request.headers.get('Origin');if(origin&&origin!==env.EDITOR_ORIGIN)return response(403,{error:'Origen no autorizado.'});
  const route=url.pathname,jar=cookies(request),time=now();
  if(route==='/auth/login'&&request.method==='GET'){
   const state=nonce(),payload=await seal({kind:'oauth',state,exp:time+300},env);
   const destination=new URL('https://github.com/login/oauth/authorize');destination.searchParams.set('client_id',env.GITHUB_CLIENT_ID);destination.searchParams.set('redirect_uri',env.EDITOR_ORIGIN+'/auth/callback');destination.searchParams.set('state',state);
   return redirect(destination.href,cookie(STATE,payload,300));
  }
  if(route==='/auth/callback'&&request.method==='GET'){
   const state=await open(jar[STATE],env,time),clear=cookie(STATE,'',0);
   if(!state||state.kind!=='oauth'||url.searchParams.getAll('state').length!==1||url.searchParams.getAll('code').length!==1||url.searchParams.get('state')!==state.state||!url.searchParams.get('code')||url.searchParams.get('code').length>1024)return response(403,{error:'Inicio de sesión inválido o caducado.'},{'Set-Cookie':clear});
   try{
    const exchange=await fetcher('https://github.com/login/oauth/access_token',{method:'POST',redirect:'error',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({client_id:env.GITHUB_CLIENT_ID,client_secret:env.GITHUB_CLIENT_SECRET,code:url.searchParams.get('code'),redirect_uri:env.EDITOR_ORIGIN+'/auth/callback'})});
    if(!exchange.ok)throw new Error('denied');const grant=await exchange.json();
    if(typeof grant.access_token!=='string'||!grant.access_token||grant.access_token.length>1024)throw new Error('denied');
    const ttl=grant.expires_in===undefined?3600:Math.min(grant.expires_in,3600);if(!Number.isSafeInteger(ttl)||ttl<60)throw new Error('denied');
    const user=await identity(grant.access_token,fetcher);
    const session=await seal({kind:'session',token:grant.access_token,csrf:nonce(),login:user.login,exp:time+ttl},env);
    const result=redirect(env.EDITOR_ORIGIN+'/auth/session',cookie(SESSION,session,ttl));result.headers.append('Set-Cookie',clear);return result;
   }catch{return response(403,{error:'No se pudo autorizar esta cuenta para editar el repositorio.'},{'Set-Cookie':clear});}
  }
  if(route==='/auth/session'&&request.method==='GET'){
   const session=await open(jar[SESSION],env,time);
   if(!session||session.kind!=='session'||session.login!==LOGIN)return response(401,{error:'Inicia sesión con GitHub.'},{'Set-Cookie':cookie(SESSION,'',0)});
   try{const user=await identity(session.token,fetcher);return response(200,{authenticated:true,login:user.login,repository:REPOSITORY,branch:EDITOR_BRANCH,csrf:session.csrf,expiresAt:session.exp,contentWritesEnabled:env.VISUAL_WRITES_ENABLED==='true'});}
   catch{return response(403,{error:'Permiso de escritura no confirmado.'},{'Set-Cookie':cookie(SESSION,'',0)});}
  }
  if(route==='/auth/logout'&&request.method==='POST'){
   const session=await open(jar[SESSION],env,time);
   if(origin!==env.EDITOR_ORIGIN||!session||session.kind!=='session'||request.headers.get('X-CSRF-Token')!==session.csrf)return response(403,{error:'Solicitud no autorizada.'});
   return response(200,{signedOut:true},{'Set-Cookie':cookie(SESSION,'',0)});
  }
  if(route==='/editor-api/state'||route==='/editor-api/commit'){
   const session=await open(jar[SESSION],env,time);
   if(!session||session.kind!=='session'||session.login!==LOGIN)return response(401,{error:'Inicia sesión con GitHub.'});
   if(route==='/editor-api/commit'){
    if(env.VISUAL_WRITES_ENABLED!=='true')return response(503,{error:'Guardado alojado desactivado hasta configuración y pruebas autorizadas.'});
    if(request.method!=='POST')return response(405,{error:'Método no permitido.'});
    if(origin!==env.EDITOR_ORIGIN||request.headers.get('X-CSRF-Token')!==session.csrf||request.headers.get('Content-Type')!=='application/json')return response(403,{error:'Solicitud no autorizada.'});
   }else if(request.method!=='GET')return response(405,{error:'Método no permitido.'});
   try{
    await identity(session.token,fetcher);
    if(route==='/editor-api/state')return response(200,{...await repositoryEditor.read(session.token),contentWritesEnabled:env.VISUAL_WRITES_ENABLED==='true'});
    const reader=request.body?.getReader();let chunks=[],size=0;
    if(!reader)return response(400,{error:'Solicitud vacía.'});
    while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;if(size>65536){await reader.cancel();return response(413,{error:'Solicitud demasiado grande.'});}chunks.push(part.value);}
    const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
    let body;try{body=JSON.parse(decoder.decode(bytes));}catch{return response(400,{error:'JSON inválido.'});}
    return response(200,await repositoryEditor.commit(session.token,body));
   }catch(error){return response(error instanceof EditorError?error.status:403,{error:error instanceof EditorError?error.message:'No se pudo verificar el permiso para esta operación.'});}
  }
  // Unknown routes never proxy GitHub or expose the local filesystem API.
  return response(route.startsWith('/auth/')?405:404,{error:'Operación no habilitada.'});
 };
}
export default {fetch:createAuthHandler()};
