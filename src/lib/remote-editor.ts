export interface Binding {file:string;label?:string;path:string[];value:string;hash:string;kind:'text'|'image';}
export interface EditorState {token:string;records:Binding[];media:string[];pending:string[];head:string;branch:string;pushPending:string|null;}
export interface Edit {file:string;path:string[];oldValue:string;value:string;}
const blocked=new Set(['__proto__','constructor','prototype','id','slug','status','evidence','dependencies','href','privacyPath','icon','symbol','group','moduleId','moduleIds','planIds','sectors','feature','guideSlugs','faqIds','related','tags','currency','launchDraft','launchDraftLabel','launchDraftNotice','coral','ink','policyDate','ruc','whatsapp','email']);
const key=(record:{file:string;path:string[]})=>JSON.stringify([record.file,record.path]);
export class RemoteEditorError extends Error {status:number;constructor(message:string,status:number){super(message);this.status=status;}}
export class RemoteEditor {
 private token='';private baseRecords:Binding[]=[];private changes=new Map<string,Edit>();private current!:EditorState;
 writesEnabled=false;needsBuild=false;
 private fetcher:typeof fetch;
 constructor(fetcher:typeof fetch=fetch){this.fetcher=fetcher.bind(globalThis);}
 private async api(route:string,body?:object){
  const response=await this.fetcher(route,{credentials:'same-origin',cache:'no-store',...(body?{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-Token':this.token},body:JSON.stringify(body)}:{})});
  const data=await response.json();if(!response.ok)throw new RemoteEditorError(data.error??'No se pudo completar la operación.',response.status);return data;
 }
 async connect():Promise<EditorState>{
  const session=await this.api('/auth/session');if(!session.authenticated||session.repository!=='manaturaloso/sistematicando-web'||session.branch!=='feat/feature-catalog'||typeof session.csrf!=='string')throw new RemoteEditorError('Sesión del editor no válida.',403);
  const snapshot=await this.api('/editor-api/state');if(snapshot.repository!==session.repository||snapshot.branch!==session.branch||!/^[a-f\d]{40}$/.test(snapshot.head)||!snapshot.documents||!Array.isArray(snapshot.media))throw new RemoteEditorError('Snapshot del editor no válido.',502);
  this.token=session.csrf;this.writesEnabled=session.contentWritesEnabled===true&&snapshot.contentWritesEnabled===true;this.needsBuild=false;this.changes.clear();this.baseRecords=[];
  for(const [file,document]of Object.entries(snapshot.documents)){
   if(!/^content\/[a-z-]+\.json$/.test(file))continue;
   const walk=(value:unknown,path:string[]=[])=>{
    if(value&&typeof value==='object'){for(const [part,child]of Object.entries(value))if(!blocked.has(part))walk(child,[...path,part]);return;}
    if(typeof value!=='string'||!value.trim())return;
    const image=file==='content/site.json'&&['logoLight','logoDark','favicon'].includes(path.at(-1)!);
    if(!image&&/^https?:|^\//.test(value))return;
    this.baseRecords.push({file,path,value,hash:snapshot.head,kind:image?'image':'text',label:image?'Marca · '+path.at(-1):value.slice(0,80)});
   };walk(document);
  }
  this.current={token:this.token,records:this.baseRecords.map(record=>({...record})),media:snapshot.media,pending:[],head:snapshot.head,branch:snapshot.branch,pushPending:null};return this.state();
 }
 state():EditorState{return {...this.current,records:this.baseRecords.map(record=>({...record,value:this.changes.get(key(record))?.value??record.value})),pending:[...new Set(this.edits.map(edit=>edit.file))]};}
 get edits():Edit[]{return [...this.changes.values()].map(edit=>({...edit,path:[...edit.path]}));}
 get previewRecords():Binding[]{return this.baseRecords.map(record=>({...record}));}
 stage(body:{file:string;path:string[];hash:string;value:string}):EditorState{
  if(this.needsBuild)throw new RemoteEditorError('Recarga una vista compilada del nuevo commit antes de editar.',409);
  const record=this.baseRecords.find(item=>key(item)===key(body));if(!record||body.hash!==this.current.head||typeof body.value!=='string'||!body.value.trim()||body.value.length>20000)throw new RemoteEditorError('Campo o borrador no válido.',422);
  if(record.kind==='image'&&!this.current.media.includes(body.value))throw new RemoteEditorError('Selecciona una imagen de la biblioteca.',422);
  if(body.value===record.value)this.changes.delete(key(record));else this.changes.set(key(record),{file:record.file,path:record.path,oldValue:record.value,value:body.value});return this.state();
 }
 async commit():Promise<EditorState>{
  if(!this.writesEnabled)throw new RemoteEditorError('El guardado alojado está desactivado.',503);
  if(!this.changes.size)throw new RemoteEditorError('No hay cambios para guardar.',422);
  let result;try{result=await this.api('/editor-api/commit',{baseHead:this.current.head,edits:this.edits});}catch(error){if(error instanceof RemoteEditorError&&[401,403].includes(error.status))this.writesEnabled=false;throw error;}
  if(!/^[a-f\d]{40}$/.test(result.commit)||result.branch!==this.current.branch||result.repository!=='manaturaloso/sistematicando-web'||result.published!==false)throw new RemoteEditorError('Resultado no confirmado; revisa GitHub antes de reintentar.',502);
  this.baseRecords=this.state().records.map(record=>({...record,hash:result.commit}));this.current={...this.current,head:result.commit};this.changes.clear();this.needsBuild=true;return this.state();
 }
 exportDraft(){return {schemaVersion:1,repository:'manaturaloso/sistematicando-web',branch:'feat/feature-catalog',baseHead:this.current.head,edits:this.edits};}
 restoreDraft(draft:unknown):EditorState{
  if(this.needsBuild)throw new RemoteEditorError('Recompila la vista antes de recuperar un borrador.',409);
  const data=draft as {schemaVersion:number;repository:string;branch:string;baseHead:string;edits:Edit[]};
  if(!data||data.schemaVersion!==1||data.repository!=='manaturaloso/sistematicando-web'||data.branch!==this.current.branch||data.baseHead!==this.current.head)throw new RemoteEditorError('El borrador no corresponde a este repositorio, rama y commit.',409);
  if(!Array.isArray(data.edits)||data.edits.length>30)throw new RemoteEditorError('Borrador inválido.',422);
  const changes=new Map<string,Edit>();for(const edit of data.edits){
   if(!edit||!Array.isArray(edit.path)||typeof edit.file!=='string')throw new RemoteEditorError('Campo de borrador inválido.',422);
   const record=this.baseRecords.find(item=>key(item)===key(edit));
   if(!record||edit.oldValue!==record.value||typeof edit.value!=='string'||!edit.value.trim()||edit.value.length>20000||changes.has(key(edit))||(record.kind==='image'&&!this.current.media.includes(edit.value)))throw new RemoteEditorError('Campo o valor del borrador inválido.',422);
   if(edit.value!==record.value)changes.set(key(edit),{file:record.file,path:[...record.path],oldValue:record.value,value:edit.value});
  }
  this.changes=changes;return this.state();
 }
 discardDraft(){this.changes.clear();}
 async logout(){await this.api('/auth/logout',{});}
}
