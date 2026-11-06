export {};
interface Binding {file:string;path:string[];value:string;hash:string;kind:'text'|'image';}
if(document.documentElement.dataset.visualPreview==='enabled' && new URLSearchParams(location.search).get('editor-preview')==='1' && window.parent!==window){
let bindings:Binding[]=[];let selected:HTMLElement|null=null;
const origin=location.origin;
const key=(binding:Binding)=>JSON.stringify([binding.file,binding.path]);
const parentMessage=(data:object)=>window.parent.postMessage({editor:'sistematicando',...data},origin);
const style=document.createElement('style');style.textContent='[data-visual-field]{cursor:pointer;outline:1px dashed #ad4b3a;outline-offset:3px}[data-visual-field]:hover,[data-visual-field]:focus{outline:3px solid #ad4b3a}[data-visual-selected]{outline:3px solid #ad4b3a!important;background-color:#f9e7e1!important}';document.head.append(style);
function activate(target:HTMLElement){const anchor=target instanceof HTMLImageElement?target.closest('a'):null;if(anchor){target.removeAttribute('tabindex');target.removeAttribute('role');anchor.dataset.visualTrigger='image';anchor.setAttribute('aria-label','Editar logo');}else{target.tabIndex=0;target.setAttribute('role','button');}}
function index(){
 document.querySelectorAll<HTMLElement>('[data-content-file][data-content-path]').forEach(target=>{try{const pointer=JSON.parse(target.dataset.contentPath!);const record=bindings.find(item=>item.file===target.dataset.contentFile&&JSON.stringify(item.path)===JSON.stringify(pointer));if(record){target.dataset.visualField=JSON.stringify([key(record)]);activate(target);target.setAttribute('aria-label',record.kind==='image'?'Editar logo':'Editar: '+record.value.trim());}}catch{/* An invalid pointer is never guessed. */}});

 const values=new Map<string,Binding[]>();for(const record of bindings){const list=values.get(record.value.trim())??[];list.push(record);values.set(record.value.trim(),list);}
 const nodes:Text[]=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){const node=walker.currentNode as Text;if(node.parentElement&&!node.parentElement.closest('script,style,input,textarea,select,[data-visual-field]')&&values.has(node.textContent?.trim()??''))nodes.push(node);}
 for(const node of nodes){const records=values.get(node.textContent!.trim())!.filter(record=>record.kind==='text');if(!records.length)continue;const span=document.createElement('span');span.textContent=node.textContent;span.dataset.visualField=JSON.stringify(records.map(key));if(!node.parentElement!.closest('a,button,summary')){span.tabIndex=0;span.setAttribute('role','button');}span.setAttribute('aria-label','Editar: '+node.textContent!.trim());node.replaceWith(span);}
 document.querySelectorAll<HTMLImageElement>('img').forEach(image=>{if(image.dataset.visualField)return;const source=image.getAttribute('src');const records=bindings.filter(record=>record.kind==='image'&&record.value===source);if(records.length){image.dataset.visualField=JSON.stringify(records.map(key));activate(image);image.setAttribute('aria-label','Editar imagen: '+image.alt);}});
 // Astro generates responsive logo URLs; bind them only when original is identifiable via alt.
 document.querySelectorAll<HTMLImageElement>('img.brand-logo').forEach(image=>{if(image.dataset.visualField)return;const records=bindings.filter(record=>record.file==='content/site.json'&&record.path.at(-1)===(image.closest('footer')&&document.querySelector('footer.dark-footer')?'logoDark':'logoLight'));if(records.length){image.dataset.visualField=JSON.stringify(records.map(key));activate(image);image.setAttribute('aria-label','Editar logo');}});
}
function paint(target:HTMLElement,value:string){if(target instanceof HTMLImageElement){if(!/^\/media\/[\w./-]+\.(png|jpe?g|webp|svg)$/i.test(value))return;target.removeAttribute('srcset');target.removeAttribute('sizes');target.src=value;}else target.textContent=value;}
function select(target:HTMLElement){selected?.removeAttribute('data-visual-selected');selected=target;selected.setAttribute('data-visual-selected','');parentMessage({type:'select',keys:JSON.parse(target.dataset.visualField!)});}
window.addEventListener('message',event=>{
 if(event.origin!==origin||event.source!==window.parent||event.data?.editor!=='sistematicando')return;
 if(event.data.type==='handshake'){parentMessage({type:'ready',path:location.pathname,commit:document.documentElement.dataset.previewCommit,modified:document.documentElement.dataset.previewModified});}
 if(event.data.type==='bindings'){bindings=event.data.records;index();}
 if(event.data.type==='overlay'){for(const edit of event.data.edits){for(const target of document.querySelectorAll<HTMLElement>('[data-visual-field]')){const keys=JSON.parse(target.dataset.visualField!);if(keys.length===1&&keys[0]===JSON.stringify([edit.file,edit.path]))paint(target,edit.value);}}}
 if(event.data.type==='focus-binding'){const target=[...document.querySelectorAll<HTMLElement>('[data-visual-field]')].find(el=>JSON.parse(el.dataset.visualField!).includes(event.data.key));if(target){selected?.removeAttribute('data-visual-selected');selected=target;selected.setAttribute('data-visual-selected','');}}
 if(event.data.type==='draft'&&selected){const keys=JSON.parse(selected.dataset.visualField!);if(keys.length===1){for(const target of document.querySelectorAll<HTMLElement>('[data-visual-field]'))if(target.dataset.visualField===selected.dataset.visualField)paint(target,event.data.value);}else paint(selected,event.data.value);}

});
document.addEventListener('click',event=>{if(event.altKey)return;const element=event.target as Element;const target=element.closest<HTMLElement>('[data-visual-field]')??element.closest('a,button,summary')?.querySelector<HTMLElement>('[data-visual-field]');if(target){event.preventDefault();event.stopImmediatePropagation();select(target);return;}const link=(event.target as Element).closest<HTMLAnchorElement>('a[href]');if(link){event.preventDefault();const url=new URL(link.href);if(url.origin===origin&&!url.pathname.startsWith('/admin')){url.searchParams.set('editor-preview','1');location.href=url.href;}}},true);
document.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&document.activeElement instanceof HTMLElement){const active=document.activeElement,target=active.dataset.visualField?active:active.querySelector<HTMLElement>('[data-visual-field]');if(target){event.preventDefault();select(target);}}},true);

document.addEventListener('submit',event=>event.preventDefault(),true);
parentMessage({type:'ready',path:location.pathname,commit:document.documentElement.dataset.previewCommit,modified:document.documentElement.dataset.previewModified});

}
