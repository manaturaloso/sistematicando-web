import {readFileSync} from 'node:fs';
// Use the CMS configuration as the inventory; no editor may disappear from /admin.
const config=JSON.parse(readFileSync('.pages.yml','utf8')) as {content:{name:string;label:string}[]};
export const adminGroups=[
 {id:'paginas',title:'Páginas de la web',icon:'grid',description:'Titulares, textos y llamadas a la acción de cada página.'},
 {id:'editorial',title:'Contenido y oferta',icon:'bars',description:'Planes, funcionalidades, sectores y publicaciones.'},
 {id:'marca',title:'Marca y navegación',icon:'sparkle',description:'Identidad visual, menús y componentes compartidos.'},
 {id:'legal',title:'Contacto y legal',icon:'circle',description:'Canales de atención y borradores para revisión.'},
];
const legal=new Set(['contact','terms','pages-legal-privacidad','pages-legal-terminos','pages-contacto-index']);
const brand=new Set(['site','navigation']);
const collections=new Set(['home','pricing','solutions','features','faqs','guides','articles','implementation']);
const routes:Record<string,string>={site:'/',navigation:'/',home:'/',pricing:'/precios/',solutions:'/soluciones/',features:'/funcionalidades/',faqs:'/preguntas-frecuentes/',guides:'/recursos/',articles:'/blog/',implementation:'/implementacion/',terms:'/legal/terminos/',contact:'/contacto/','pages-legal-privacidad':'/legal/privacidad/','pages-legal-terminos':'/legal/terminos/','pages-index':'/','pages-404':'/404.html','pages-soluciones-sector':'/soluciones/restaurantes/','pages-feature-detail':'/funcionalidades/punto-de-venta/','pages-recursos-guias-slug':'/recursos/guias/preparar-cierre-de-caja/','pages-blog-article':'/blog/elegir-que-ordenar-primero/','components-Footer':'/','components-ProductConcept':'/','components-WhatsAppContact':'/contacto/'};
const names:Record<string,string>={'pages-index':'Portada','pages-soluciones-sector':'Plantilla de sectores','pages-feature-detail':'Plantilla de funcionalidades','pages-recursos-guias-slug':'Plantilla de guías','pages-blog-article':'Plantilla de artículos','pages-404':'Página no encontrada','components-Footer':'Pie de página','components-ProductConcept':'Vista conceptual del producto','components-WhatsAppContact':'Contacto por WhatsApp'};
export const adminEditors=config.content.map(editor=>{
 const group=legal.has(editor.name)?'legal':brand.has(editor.name)||editor.name.startsWith('components-')?'marca':collections.has(editor.name)?'editorial':'paginas';
 const route=routes[editor.name]??'/'+editor.name.replace(/^pages-/,'').replace(/-index$/,'')+'/';
 return {...editor,title:names[editor.name]??editor.label.replace(/^Página: /,'').replaceAll('-',' '),group,route};
});
