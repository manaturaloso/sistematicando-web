export {};
interface Binding {file:string;path:string[];value:string;hash:string;kind:'text'|'image';}
if(new URLSearchParams(location.search).get('editor-preview')==='1' && window.parent!==window){
let bindings:Binding[]=[];let selected:HTMLElement|null=null;
const origin=location.origin;
const key=(binding:Binding)=>JSON.stringify([binding.file,binding.path]);
const parentMessage=(data:object)=>window.parent.postMessage({editor:'sistematicando',...data},origin);
const style=document.createElement('style');style.textContent='[data-visual-field]{cursor:pointer;outline:1px dashed #ad4b3a;outline-offset:3px}[data-visual-field]:hover,[data-visual-field]:focus{outline:3px solid #ad4b3a}[data-visual-selected]{outline:3px solid #ad4b3a!important;background-color:#f9e7e1!important}';document.head.append(style);
function index(){
 const values=new Map<string,Binding[]>();for(const record of bindings){const list=values.get(record.value.trim())??[];list.push(record);values.set(record.value.trim(),list);}
 const nodes:Text[]=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){const node=walker.currentNode as Text;if(node.parentElement&&!node.parentElement.closest('script,style,input,textarea,select,[data-visual-field]')&&values.has(node.textContent?.trim()??''))nodes.push(node);}
 for(const node of nodes){const records=values.get(node.textContent!.trim())!.filter(record=>record.kind==='text');if(!records.length)continue;const span=document.createElement('span');span.textContent=node.textContent;span.dataset.visualField=JSON.stringify(records.map(key));span.tabIndex=node.parentElement!.closest('a,button,summary')?-1:0;if(span.tabIndex===0)span.setAttribute('role','button');span.setAttribute('aria-label','Editar: '+node.textContent!.trim());node.replaceWith(span);}
 document.querySelectorAll<HTMLImageElement>('img').forEach(image=>{const source=image.getAttribute('src');const records=bindings.filter(record=>record.kind==='image'&&record.value===source);if(records.length){image.dataset.visualField=JSON.stringify(records.map(key));image.tabIndex=0;image.setAttribute('role','button');image.setAttribute('aria-label','Editar imagen: '+image.alt);}});
 // Astro generates responsive logo URLs; bind them only when original is identifiable via alt.
 document.querySelectorAll<HTMLImageElement>('img.brand-logo').forEach(image=>{if(image.dataset.visualField)return;const records=bindings.filter(record=>record.file==='content/site.json'&&record.path.at(-1)===(image.closest('footer')&&document.querySelector('footer.dark-footer')?'logoDark':'logoLight'));if(records.length){image.dataset.visualField=JSON.stringify(records.map(key));image.tabIndex=0;image.setAttribute('role','button');image.setAttribute('aria-label','Editar logo');}});
}
function select(target:HTMLElement){selected?.removeAttribute('data-visual-selected');selected=target;selected.setAttribute('data-visual-selected','');parentMessage({type:'select',keys:JSON.parse(target.dataset.visualField!)});}
window.addEventListener('message',event=>{
 if(event.origin!==origin||event.source!==window.parent||event.data?.editor!=='sistematicando')return;
 if(event.data.type==='bindings'){bindings=event.data.records;index();}
 if(event.data.type==='focus-binding'){const target=[...document.querySelectorAll<HTMLElement>('[data-visual-field]')].find(el=>JSON.parse(el.dataset.visualField!).includes(event.data.key));if(target){selected?.removeAttribute('data-visual-selected');selected=target;selected.setAttribute('data-visual-selected','');}}
 if(event.data.type==='draft'&&selected){if(selected instanceof HTMLImageElement){if(!/^\/media\/[\w.-]+\.(png|jpe?g|webp)$/i.test(event.data.value))return;selected.removeAttribute('srcset');selected.removeAttribute('sizes');selected.src=event.data.value;}else selected.textContent=event.data.value;}
});
document.addEventListener('click',event=>{const target=(event.target as Element).closest<HTMLElement>('[data-visual-field]');if(target){event.preventDefault();event.stopImmediatePropagation();select(target);return;}const link=(event.target as Element).closest<HTMLAnchorElement>('a[href]');if(link){event.preventDefault();const url=new URL(link.href);if(url.origin===origin&&!url.pathname.startsWith('/admin')){url.searchParams.set('editor-preview','1');location.href=url.href;}}},true);
document.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&document.activeElement instanceof HTMLElement&&document.activeElement.dataset.visualField){event.preventDefault();select(document.activeElement);}},true);
document.addEventListener('submit',event=>event.preventDefault(),true);
parentMessage({type:'ready',path:location.pathname});

}
