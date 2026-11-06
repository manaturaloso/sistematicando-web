import {RemoteEditor,RemoteEditorError,type Binding,type EditorState as State} from '../lib/remote-editor';
const root=document.querySelector<HTMLElement>('.visual-editor')!;
const remote=root.dataset.mode==='hosted'?new RemoteEditor():null;
let previewMeta:{commit?:string;modified?:string}|null=null,previewReady=!remote;
const frame=document.querySelector<HTMLIFrameElement>('#ve-preview')!;
const status=document.querySelector<HTMLElement>('#ve-status')!;
const form=document.querySelector<HTMLFormElement>('#ve-form')!;
const fields=document.querySelector<HTMLSelectElement>('#ve-field')!;
const value=document.querySelector<HTMLTextAreaElement>('#ve-value')!;
const images=document.querySelector<HTMLSelectElement>('#ve-image')!;
const page=document.querySelector<HTMLSelectElement>('#ve-page')!;
const github=document.querySelector<HTMLButtonElement>('#ve-github')!;
const dialog=document.querySelector<HTMLDialogElement>('#ve-confirm')!;
let state:State|null=null,selected:Binding|null=null,dirty=false,busy=false,candidates:Binding[]=[];
const key=(record:Binding)=>JSON.stringify([record.file,record.path]);
const say=(message:string)=>{status.textContent=message;};
const option=(text:string,val:string)=>{const item=document.createElement('option');item.textContent=text;item.value=val;return item;};
const post=(data:object)=>frame.contentWindow?.postMessage({editor:'sistematicando',...data},location.origin);
function lists(){if(!state)return;for(const id of ['ve-pending','ve-confirm-files']){const list=document.getElementById(id)!;list.replaceChildren();for(const file of state.pending){const li=document.createElement('li');li.textContent=file;list.append(li);}if(state.pushPending){const li=document.createElement('li');li.textContent='Commit local pendiente de envío: '+state.pushPending.slice(0,7);list.append(li);}}github.disabled=busy||(!state.pending.length&&!state.pushPending)||!!(remote&&(!previewReady||!remote.writesEnabled||remote.needsBuild));
 if(remote)for(const id of ['ve-pending','ve-confirm-files']){const list=document.getElementById(id)!;list.replaceChildren();for(const edit of remote.edits){const li=document.createElement('li'),before=document.createElement('del'),after=document.createElement('ins');li.textContent=edit.file+' · '+edit.path.join(' / ')+': ';before.textContent=edit.oldValue;after.textContent=edit.value;li.append(before,document.createTextNode(' → '),after);list.append(li);}}}
function select(record:Binding){selected=record;value.value=record.value;images.value=record.value;const image=record.kind==='image';value.hidden=image;document.querySelector('label[for="ve-value"]')!.toggleAttribute('hidden',image);images.hidden=!image;document.querySelector('label[for="ve-image"]')!.toggleAttribute('hidden',!image);document.getElementById('ve-source')!.textContent=record.file+' → '+record.path.join(' / ');dirty=false;form.hidden=false;}
async function request(action:string,body?:object){
 if(remote){if(action==='state')return remote.connect();if(action==='save')return remote.stage(body as {file:string;path:string[];hash:string;value:string});if(action==='commit')return remote.commit();}
 const response=await fetch('/__visual_editor/'+action,body?{method:'POST',headers:{'Content-Type':'application/json','X-Editor-Token':state!.token},body:JSON.stringify(body)}:{cache:'no-store'});
 const data=await response.json();if(!response.ok)throw new Error(data.error??'No se pudo completar la operación.');return data as State;
}
function allowedDiscard(){return !dirty||window.confirm('Hay una vista previa sin guardar. ¿Quieres descartarla?');}
function syncPreview(){if(!state)return;if(remote&&!previewMeta){post({type:'handshake'});return;}if(remote){previewReady=!!previewMeta&&previewMeta.commit===state.head&&previewMeta.modified==='false'&&!remote.needsBuild;if(!previewReady){form.hidden=true;selected=null;if(previewMeta)say('La vista previa no corresponde a este commit limpio. Recompila el editor desde '+state.head.slice(0,7)+' antes de editar.');lists();return;}}post({type:'bindings',records:remote?remote.previewRecords:state.records});if(remote)post({type:'overlay',edits:remote.edits});lists();}
async function refresh(){state=await request('state');images.replaceChildren(...state.media.map(url=>option(url.split('/').at(-1)!,url)));lists();syncPreview();if(remote){document.getElementById('ve-login')!.hidden=true;document.getElementById('ve-logout')!.hidden=false;document.getElementById('ve-export')!.hidden=false;document.getElementById('ve-import-button')!.hidden=false;document.getElementById('ve-remote-access')!.textContent=remote.writesEnabled?'Sesión autorizada · Guardado sujeto a revisión y versión de la vista.':'Sesión autorizada · Guardado desactivado en el servidor.';}}
window.addEventListener('message',event=>{
 if(event.origin!==location.origin||event.source!==frame.contentWindow||event.data?.editor!=='sistematicando')return;
 if(event.data.type==='ready'){previewMeta={commit:event.data.commit,modified:event.data.modified};if(!dirty){form.hidden=true;selected=null;}syncPreview();}
 if(!state||!previewReady)return;
 if(event.data.type==='select'){
  if(dirty){if(!allowedDiscard()){if(selected)post({type:'focus-binding',key:key(selected)});return;}dirty=false;form.hidden=true;frame.contentWindow?.location.reload();return;}
  candidates=state.records.filter(record=>event.data.keys.includes(key(record)));if(!candidates.length)return;if(remote&&candidates.length>1){form.hidden=true;selected=null;say('Este elemento coincide con varios campos. Usa el editor estructurado para evitar modificar un campo equivocado.');return;}
  fields.replaceChildren(...candidates.map((record,index)=>option(record.label??record.value.slice(0,80),String(index))));
  select(candidates[0]);say(candidates.length>1?'Este texto aparece en varios campos. Selecciona el campo correcto antes de guardar.':'Contenido seleccionado. Los cambios de vista previa aún no están guardados.');value.hidden?images.focus():value.focus();
 }
});
fields.addEventListener('change',()=>{if(allowedDiscard())select(candidates[Number(fields.value)]);});
function draft(){if(!selected)return;dirty=true;post({type:'draft',value:selected.kind==='image'?images.value:value.value});say('Vista previa modificada. Aún no guardada en el proyecto ni en GitHub.');}
value.addEventListener('input',draft);images.addEventListener('change',draft);
form.addEventListener('submit',async event=>{event.preventDefault();if(!state||!selected||busy)return;busy=true;document.querySelector<HTMLButtonElement>('#ve-save')!.disabled=true;try{state=await request('save',{file:selected.file,path:selected.path,hash:selected.hash,value:selected.kind==='image'?images.value:value.value});dirty=false;form.hidden=true;lists();if(remote){syncPreview();say('Borrador añadido a revisión en esta pestaña. Aún no se envió a GitHub.');}else{frame.contentWindow?.location.reload();say('Guardado y validado en el proyecto. Falta crear el commit y enviarlo a GitHub.');}}catch(error){say((error as Error).message);}finally{busy=false;document.querySelector<HTMLButtonElement>('#ve-save')!.disabled=false;lists();}});
document.getElementById('ve-cancel')!.addEventListener('click',()=>{if(selected){post({type:'draft',value:selected.value});select(selected);}say('Vista previa descartada. El archivo no cambió.');});
page.addEventListener('change',()=>{if(!allowedDiscard())return;dirty=false;form.hidden=true;frame.src=page.value+'?editor-preview=1';});
document.querySelector<HTMLSelectElement>('#ve-width')!.addEventListener('change',event=>{frame.style.width=(event.target as HTMLSelectElement).value;});
document.getElementById('ve-reload')!.addEventListener('click',async()=>{if(!allowedDiscard())return;dirty=false;if((remote?.edits.length)&&!window.confirm('Recargar descartará los cambios añadidos a revisión. ¿Continuar?'))return;if(root.dataset.local==='true'||remote)try{await refresh();}catch(error){say((error as Error).message);return;}form.hidden=true;frame.contentWindow?.location.reload();});
github.addEventListener('click',()=>{if(!allowedDiscard())return;dialog.showModal();});
document.getElementById('ve-confirm-cancel')!.addEventListener('click',()=>dialog.close());
document.getElementById('ve-confirm-save')!.addEventListener('click',async()=>{if(!state||busy)return;busy=true;dialog.close();github.disabled=true;say('Creando commit y enviando a la rama de desarrollo…');try{state=await request('commit',{head:state.head});say('Cambios guardados en GitHub: '+state.head.slice(0,7)+'. No se publicó producción.'+(remote?' Recompila la vista antes de continuar editando.':''));if(remote){previewReady=false;form.hidden=true;selected=null;}}catch(error){say((error as Error).message);if(!remote)try{state=await request('state');}catch{/* Keep the failure message; never report a save. */}if(remote&&error instanceof RemoteEditorError&&[401,403].includes(error.status)){document.getElementById('ve-login')!.hidden=false;say(error.message+' Descarga el borrador antes de volver a iniciar sesión.');}}finally{busy=false;lists();}});
window.addEventListener('beforeunload',event=>{if(dirty||remote?.edits.length){event.preventDefault();}});
if(root.dataset.local==='true'||remote)refresh().then(()=>{if(remote){if(previewReady)say(remote.writesEnabled?'Editor conectado. Añade cambios a revisión antes de enviarlos.':'Editor conectado en modo de revisión; guardado desactivado.');return;}say(state?.pending.length?'Cambios guardados en el proyecto. Falta revisar y enviar a GitHub.':'Proyecto conectado. Selecciona un texto o logo de la vista previa.');}).catch(error=>say((error as Error).message));

if(remote){
 document.getElementById('ve-export')!.addEventListener('click',()=>{if(!state)return;try{if(dirty&&selected){state=remote.stage({file:selected.file,path:selected.path,hash:selected.hash,value:selected.kind==='image'?images.value:value.value});dirty=false;lists();}const blob=new Blob([JSON.stringify(remote.exportDraft(),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='sistematicando-borrador.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);say('Borrador descargado. No contiene credenciales ni se envió a GitHub.');}catch(error){say((error as Error).message);}});
 document.getElementById('ve-import-button')!.addEventListener('click',()=>document.querySelector<HTMLInputElement>('#ve-import')!.click());
 document.querySelector<HTMLInputElement>('#ve-import')!.addEventListener('change',async event=>{const input=event.target as HTMLInputElement,file=input.files?.[0];if(!file)return;try{if(!previewReady)throw new Error('Espera una vista previa del commit correcto.');if(file.size>65536)throw new Error('El borrador supera 64 KiB.');if((dirty||remote.edits.length)&&!window.confirm('Recuperar sustituirá el borrador de esta pestaña. ¿Continuar?'))return;state=remote.restoreDraft(JSON.parse(await file.text()));dirty=false;form.hidden=true;lists();syncPreview();say('Borrador recuperado para revisión. No se envió a GitHub.');}catch(error){say((error as Error).message);}finally{input.value='';}});
 document.getElementById('ve-logout')!.addEventListener('click',async()=>{if((dirty||remote.edits.length)&&!window.confirm('Cerrar sesión perderá el borrador de esta pestaña. Descárgalo antes si necesitas conservarlo. ¿Continuar?'))return;try{await remote.logout();remote.discardDraft();dirty=false;location.reload();}catch(error){say((error as Error).message);}});
}
