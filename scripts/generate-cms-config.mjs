import fs from 'node:fs';
const read=name=>JSON.parse(fs.readFileSync(`content/${name}.json`,'utf8'));
const labels={skipLabel:'Enlace de salto',menuLabel:'Botón de menú',header:'Menú superior',footer:'Menú del pie',href:'Destino del enlace',label:'Texto del enlace',cta:'Botón destacado',name:'Nombre',tagline:'Eslogan',logoLight:'Logo para fondo claro',logoDark:'Logo para fondo oscuro',logoAlt:'Texto alternativo del logo',logoWidth:'Ancho original del logo',logoHeight:'Alto original del logo',coral:'Coral de marca',ink:'Tinta de marca',defaultTitle:'Título SEO por defecto',defaultDescription:'Descripción SEO por defecto',footerNote:'Nota del pie',darkFooter:'Pie con fondo oscuro (usa logo oscuro)',favicon:'Icono de pestaña (favicon)',items:'Elementos',groups:'Grupos',slug:'Ruta (slug)',title:'Título',intro:'Introducción',text:'Texto',description:'Descripción',question:'Pregunta',answer:'Respuesta',home:'Mostrar en home',pricing:'Mostrar en precios',category:'Categoría',sections:'Secciones',paragraphs:'Párrafos',checklist:'Lista de comprobación',related:'Sectores relacionados',feature:'Módulo relacionado',needs:'Prioridades',focus:'Enfoque',areas:'Áreas a evaluar',questions:'Preguntas de diagnóstico',limits:'Límites y afirmaciones no permitidas',id:'Identificador',status:'Estado de verificación',evidence:'Evidencia',dependencies:'Dependencias',sectors:'Sectores',group:'Grupo',icon:'Icono',responsible:'Responsable',ruc:'RUC',address:'Domicilio',email:'Correo de privacidad',whatsappMessage:'Mensaje inicial de WhatsApp (sin adjuntos)',whatsapp:'WhatsApp (solo dígitos internacionales)',phoneLabel:'Teléfono visible',privacyPath:'Ruta de privacidad',policyDate:'Fecha de la política',seo_title:'Título SEO',seo_description:'Descripción SEO',symbol:'Icono',tags:'Temas',n:'Orden visible',factors:'Factores de alcance',detail:'Detalle'};
function field(name,value){
 const f={name,label:labels[name]??name,type:'string'};
 if(name.startsWith('text_'))f.label=value.slice(0,75)+(value.length>75?'…':'');
 if(Array.isArray(value)){
   f.list=true;
   if(typeof value[0]==='object'){f.type='object';f.fields=Object.entries(Object.assign({},...value)).map(([key,val])=>field(key,val));}
 }else if(value && typeof value==='object'){
   f.type='object';f.fields=Object.entries(value).map(([key,val])=>field(key,val));
 }else if(typeof value==='boolean')f.type='boolean';
 else if(typeof value==='number')f.type='number';
 else if(['logoLight','logoDark','favicon'].includes(name))f.type='image';
 else if(typeof value==='string'&&(value.length>85||['description','intro','answer','evidence','limits','text','paragraphs','seo_description'].includes(name)))f.type='text';
 if(['logoLight','logoDark','favicon'].includes(name))f.description='Sube el original a Medios y selecciónalo. Sin deformar ni recrear el logotipo.';
 if(!f.list && !['object','boolean','image'].includes(f.type))f.required=true;
 if(name==='slug'||name==='id')f.description='Cambiar este identificador puede romper rutas y enlaces existentes. Revisa referencias antes de guardar.';
 if(name==='status'){
   f.type='select'; f.options={values:[{value:'unverified',label:'No verificada'},{value:'proposed',label:'Propuesta'},{value:'planned',label:'Planificada'},{value:'in-development',label:'En desarrollo'},{value:'partial',label:'Parcialmente implementada'},{value:'available',label:'Verificada y disponible'}]};
   f.description='No marcar disponible sin evidencia real y revisión comercial.';
 }
 return f;
}
const definitions=[['site','Marca, logos y SEO global'],['navigation','Menús y navegación'],['contact','Contactos y responsable'],['home','Home: sectores'],['pricing','Precios: factores de alcance'],['solutions','Soluciones por sector'],['features','Módulos y estados'],['faqs','Preguntas frecuentes'],['guides','Guías y recursos']];
const content=definitions.map(([name,label])=>({name,label,type:'file',path:`content/${name}.json`,format:'json',fields:Object.entries(read(name)).map(([key,val])=>field(key,val))}));
const pages=read('pages');
for(const [name,values] of Object.entries(pages)){
 content.push({name,label:`Página: ${name.replace(/^pages-/,'').replace(/^components-/,'Componente: ').replace(/-index$/,'')}`,type:'file',path:'content/pages.json',format:'json',fields:[{name,label:'Textos y metadatos',type:'object',fields:Object.entries(values).map(([key,val])=>field(key,val))}]});
}
const config={media:[{name:'images',label:'Logos e imágenes',input:'public/media',output:'/media',extensions:['png','jpg','jpeg','webp','svg'],rename:'safe'}],content,settings:{content:{merge:true}}};
// JSON is valid YAML 1.2. No generator dependencies or credentials required.
fs.writeFileSync('.pages.yml',JSON.stringify(config,null,2)+'\n');
console.log(`CMS configuration generated: ${content.length} editors.`);
