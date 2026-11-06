export {};
interface Binding {file:string;label?:string;path:string[];value:string;hash:string;kind:'text'|'image';}
interface State {token:string;records:Binding[];media:string[];pending:string[];head:string;branch:string;pushPending:string|null;}
const root=document.querySelector<HTMLElement>('.visual-editor')!;
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
function lists(){if(!state)return;for(const id of ['ve-pending','ve-confirm-files']){const list=document.getElementById(id)!;list.replaceChildren();for(const file of state.pending){const li=document.createElement('li');li.textContent=file;list.append(li);}if(state.pushPending){const li=document.createElement('li');li.textContent='Commit local pendiente de envío: '+state.pushPending.slice(0,7);list.append(li);}}github.disabled=busy||(!state.pending.length&&!state.pushPending);}
function select(record:Binding){selected=record;value.value=record.value;images.value=record.value;const image=record.kind==='image';value.hidden=image;document.querySelector('label[for="ve-value"]')!.toggleAttribute('hidden',image);images.hidden=!image;document.querySelector('label[for="ve-image"]')!.toggleAttribute('hidden',!image);document.getElementById('ve-source')!.textContent=record.file+' → '+record.path.join(' / ');dirty=false;form.hidden=false;}
async function request(action:string,body?:object){
 const response=await fetch('/__visual_editor/'+action,body?{method:'POST',headers:{'Content-Type':'application/json','X-Editor-Token':state!.token},body:JSON.stringify(body)}:{cache:'no-store'});
 const data=await response.json();if(!response.ok)throw new Error(data.error??'No se pudo completar la operación.');return data as State;
}
function allowedDiscard(){return !dirty||window.confirm('Hay una vista previa sin guardar. ¿Quieres descartarla?');}
async function refresh(){state=await request('state');images.replaceChildren(...state.media.map(url=>option(url.split('/').at(-1)!,url)));lists();post({type:'bindings',records:state.records});}
window.addEventListener('message',event=>{
 if(event.origin!==location.origin||event.source!==frame.contentWindow||event.data?.editor!=='sistematicando'||!state)return;
 if(event.data.type==='ready'){if(!dirty){form.hidden=true;selected=null;}post({type:'bindings',records:state.records});}
 if(event.data.type==='select'){
  if(dirty){if(!allowedDiscard()){if(selected)post({type:'focus-binding',key:key(selected)});return;}dirty=false;form.hidden=true;frame.contentWindow?.location.reload();return;}
  candidates=state.records.filter(record=>event.data.keys.includes(key(record)));if(!candidates.length)return;
  fields.replaceChildren(...candidates.map((record,index)=>option(record.label??record.value.slice(0,80),String(index))));
  select(candidates[0]);say(candidates.length>1?'Este texto aparece en varios campos. Selecciona el campo correcto antes de guardar.':'Contenido seleccionado. Los cambios de vista previa aún no están guardados.');value.hidden?images.focus():value.focus();
 }
});
fields.addEventListener('change',()=>{if(allowedDiscard())select(candidates[Number(fields.value)]);});
function draft(){if(!selected)return;dirty=true;post({type:'draft',value:selected.kind==='image'?images.value:value.value});say('Vista previa modificada. Aún no guardada en el proyecto ni en GitHub.');}
value.addEventListener('input',draft);images.addEventListener('change',draft);
form.addEventListener('submit',async event=>{event.preventDefault();if(!state||!selected||busy)return;busy=true;document.querySelector<HTMLButtonElement>('#ve-save')!.disabled=true;try{state=await request('save',{file:selected.file,path:selected.path,hash:selected.hash,value:selected.kind==='image'?images.value:value.value});dirty=false;form.hidden=true;lists();frame.contentWindow?.location.reload();say('Guardado y validado en el proyecto. Falta crear el commit y enviarlo a GitHub.');}catch(error){say((error as Error).message);}finally{busy=false;document.querySelector<HTMLButtonElement>('#ve-save')!.disabled=false;}});
document.getElementById('ve-cancel')!.addEventListener('click',()=>{if(selected){post({type:'draft',value:selected.value});select(selected);}say('Vista previa descartada. El archivo no cambió.');});
page.addEventListener('change',()=>{if(!allowedDiscard())return;dirty=false;form.hidden=true;frame.src=page.value+'?editor-preview=1';});
document.querySelector<HTMLSelectElement>('#ve-width')!.addEventListener('change',event=>{frame.style.width=(event.target as HTMLSelectElement).value;});
document.getElementById('ve-reload')!.addEventListener('click',async()=>{if(!allowedDiscard())return;dirty=false;if(root.dataset.local==='true')try{await refresh();}catch(error){say((error as Error).message);return;}form.hidden=true;frame.contentWindow?.location.reload();});
github.addEventListener('click',()=>{if(!allowedDiscard())return;dialog.showModal();});
document.getElementById('ve-confirm-cancel')!.addEventListener('click',()=>dialog.close());
document.getElementById('ve-confirm-save')!.addEventListener('click',async()=>{if(!state||busy)return;busy=true;dialog.close();github.disabled=true;say('Creando commit y enviando a la rama de desarrollo…');try{state=await request('commit',{head:state.head});say('Cambios guardados en GitHub: '+state.head.slice(0,7)+'. No se publicó producción.');}catch(error){say((error as Error).message);try{state=await request('state');}catch{/* Keep the failure message; never report a save. */}}finally{busy=false;lists();}});
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();}});
if(root.dataset.local==='true')refresh().then(()=>say(state?.pending.length?'Cambios guardados en el proyecto. Falta revisar y enviar a GitHub.':'Proyecto conectado. Selecciona un texto o logo de la vista previa.')).catch(error=>say((error as Error).message));
