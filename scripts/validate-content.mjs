import fs from 'node:fs';
import path from 'node:path';
const read=name=>JSON.parse(fs.readFileSync(`content/${name}.json`,'utf8'));
const fail=message=>{throw new Error(`Contenido: ${message}`)};
const ensure=(condition,message)=>{if(!condition)fail(message)};
const navigation=read('navigation');
for(const link of [...navigation.header,...navigation.footer]){ensure(link.label?.trim(),'Enlace sin texto');ensure(/^\/(?!\/)[a-zA-Z0-9/_#-]*$/.test(link.href),'Solo rutas internas válidas en navegación');}
const articles=read('articles').items;
const site=read('site'),contact=read('contact'),solutions=read('solutions').items,features=read('features'),guides=read('guides').items,faqs=read('faqs').items;
for(const name of ['name','tagline','logoAlt','defaultTitle','defaultDescription'])ensure(typeof site[name]==='string'&&site[name].trim(),`Marca: falta ${name}`);
ensure(typeof site.launchDraft==='boolean','Vista previa de lanzamiento inválida');
for(const key of ['launchDraftLabel','launchDraftNotice'])ensure(typeof site[key]==='string'&&site[key].trim(),`Vista previa: falta ${key}`);
for(const color of ['coral','ink'])ensure(/^#[\da-f]{6}$/i.test(site[color]),`Color inválido: ${color}`);
for(const key of ['logoLight','logoDark','favicon']){
 if(!site[key])continue;
 ensure(typeof site[key]==='string'&&/^\/media\/[\w./-]+\.(png|jpe?g|webp|svg)$/i.test(site[key]),`Ruta de logo inválida: ${key}`);
 const file=path.resolve('public','.'+site[key]);
 ensure(file.startsWith(path.resolve('public/media')+path.sep)&&fs.existsSync(file),`Logo no encontrado dentro de public/media: ${key}`);
 ensure(fs.realpathSync(file).startsWith(fs.realpathSync('public/media')+path.sep),`Logo fuera de medios: ${key}`);
}
ensure(site.logoWidth>0&&site.logoHeight>0&&site.logoWidth<=10000&&site.logoHeight<=10000,'Dimensiones de logo inválidas');
ensure(/^\d{10,15}$/.test(contact.whatsapp),'WhatsApp requiere dígitos internacionales');
ensure(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email),'Correo inválido');
ensure(/^\d{11}$/.test(contact.ruc),'RUC requiere 11 dígitos');
for(const key of ['responsible','address','phoneLabel','policyDate'])ensure(contact[key]?.trim(),`Contacto vacío: ${key}`);
ensure(contact.privacyPath==='/legal/privacidad/','La ruta de privacidad debe conservar el destino existente');
const unique=(items,key,label)=>{
 ensure(items.length>0,`${label} está vacío`); const ids=new Set();
 for(const item of items){ensure(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item[key]),`Identificador inválido en ${label}`);ensure(!ids.has(item[key]),`Duplicado en ${label}: ${item[key]}`);ids.add(item[key]);}return ids;
};
const sectors=unique(solutions,'slug','soluciones');
const modules=unique(features.items,'id','módulos');
const groups=unique(features.groups,'id','grupos');
const guideIds=unique(guides,'slug','guías'),faqIds=unique(faqs,'id','FAQ');
unique(articles,'slug','artículos');
for(const item of features.items){
 ensure(item.launch&&typeof item.launch==='object',`Contenido de lanzamiento ausente: ${item.id}`);
 for(const key of ['headline','summary','scope'])ensure(typeof item.launch[key]==='string'&&item.launch[key].trim(),`Lanzamiento ${item.id}: falta ${key}`);
 for(const key of ['benefits','workflow'])ensure(Array.isArray(item.launch[key])&&item.launch[key].length>0&&item.launch[key].every(entry=>typeof entry.title==='string'&&entry.title.trim()&&typeof entry.text==='string'&&entry.text.trim()),`Lanzamiento ${item.id}: ${key} vacío o inválido`);

 ensure(groups.has(item.group),`Grupo de módulo desconocido: ${item.group}`);
 ensure(['unverified','proposed','planned','in-development','partial','available'].includes(item.status),`Estado inválido: ${item.id}`);
 ensure(item.evidence?.trim(),`Evidencia vacía: ${item.id}`);
 if(item.status!=='unverified')ensure(!/sin evidencia operativa/i.test(item.evidence),`Verificar evidencia antes de cambiar estado: ${item.id}`);
 for(const slug of item.sectors)ensure(sectors.has(slug),`Sector desconocido en ${item.id}: ${slug}`);
}
for(const guide of guides){ensure(guide.sections.length>0,`Guía sin secciones: ${guide.slug}`);ensure(modules.has(guide.feature),`Módulo desconocido en guía: ${guide.feature}`);for(const slug of guide.related)ensure(sectors.has(slug),`Sector desconocido en guía: ${slug}`);}
for(const article of articles){
 for(const key of ['title','category','intro','takeaway'])ensure(typeof article[key]==='string'&&article[key].trim(),`Artículo ${article.slug}: falta ${key}`);
 ensure(modules.has(article.moduleId),`Módulo desconocido en artículo: ${article.slug}`);
 ensure(Array.isArray(article.guideSlugs)&&article.guideSlugs.length>0&&article.guideSlugs.every(slug=>guideIds.has(slug)),`Guía desconocida en artículo: ${article.slug}`);
 ensure(Array.isArray(article.sections)&&article.sections.length>0,`Artículo sin secciones: ${article.slug}`);
 for(const section of article.sections){ensure(section.title?.trim()&&Array.isArray(section.paragraphs)&&section.paragraphs.length>0&&section.paragraphs.every(text=>typeof text==='string'&&text.trim()),`Sección inválida en artículo: ${article.slug}`);ensure(Array.isArray(section.points)&&section.points.every(text=>typeof text==='string'&&text.trim()),`Puntos inválidos en artículo: ${article.slug}`);}
}
for(const item of faqs)ensure(['producto','comercial','privacidad'].includes(item.category),`Categoría FAQ inválida: ${item.category}`);
const implementation=read('implementation');
for(const key of ['stages','preparation','responsibilities'])ensure(Array.isArray(implementation[key])&&implementation[key].length>0,`Implementación sin ${key}`);
for(const stage of implementation.stages)for(const key of ['title','summary','text','outcome'])ensure(typeof stage[key]==='string'&&stage[key].trim(),`Etapa de implementación sin ${key}`);
for(const item of implementation.preparation)for(const key of ['title','text'])ensure(typeof item[key]==='string'&&item[key].trim(),`Preparación sin ${key}`);
for(const group of implementation.responsibilities)ensure(group.title?.trim()&&Array.isArray(group.items)&&group.items.length>0&&group.items.every(item=>typeof item==='string'&&item.trim()),'Responsabilidades de implementación inválidas');
const terms=read('terms');
unique(terms.sections,'id','secciones legales');
for(const section of terms.sections){ensure(!['contenido','responsable','contacto-legal','contacto-title'].includes(section.id)&&!section.id.endsWith('-title'),'Identificador legal reservado');ensure(section.title?.trim()&&Array.isArray(section.paragraphs)&&section.paragraphs.length>0&&section.paragraphs.every(text=>typeof text==='string'&&text.trim()),'Sección legal inválida');}
for(const [page,key] of [['pages-legal-privacidad','text_039'],['pages-legal-terminos','text_007']]){
 let template=read('pages')[page][key];ensure(typeof template==='string','Texto de responsable inválido');
 for(const token of ['responsible','ruc','address']){ensure(template.split('{'+token+'}').length===2,`Responsable necesita un {${token}}`);template=template.replace('{'+token+'}','');}
 ensure(!/[{}]/.test(template),'Marcador de responsable desconocido');
}
const phoneCopy=read('pages')['components-WhatsAppContact'].text_007;
ensure(typeof phoneCopy==='string'&&phoneCopy.split('{phone}').length===2&&!/[{}]/.test(phoneCopy.replace('{phone}','')),'Texto de contacto necesita exactamente un {phone}');
const pages=read('pages'),search=pages['pages-funcionalidades-index'].search,guide=pages['pages-solicitar-demo-index'].guide;
const help=pages['pages-ayuda-index'];
ensure(Array.isArray(help.helpLinks)&&help.helpLinks.length>0,'Ayuda sin recorridos');
for(const link of help.helpLinks)ensure(link.title?.trim()&&link.text?.trim()&&/^\/(?!\/)[a-zA-Z0-9/_#-]*$/.test(link.href),'Recorrido de ayuda inválido');
ensure(Array.isArray(help.faqIds)&&help.faqIds.length>0&&help.faqIds.every(id=>faqIds.has(id)),'FAQ desconocida en ayuda');
for(const key of ['initialCount','singularCount','pluralCount']){
 ensure(typeof search[key]==='string'&&search[key].split('{count}').length===2,`Buscador: ${key} necesita exactamente un {count}`);
 ensure(!/[{}]/.test(search[key].replace('{count}','')),`Buscador: marcador no reconocido en ${key}`);
}
for(const key of ['placeholder','areasLabel'])ensure(typeof search[key]==='string'&&search[key].trim(),`Buscador: falta ${key}`);
for(const key of ['formLabel','heading','businessLabel','locationsLabel','priorityLabel','questionsHeading','questions','disclaimer','generatedStatus','downloadStatus']){
 const value=guide[key];
 if(key==='questions')ensure(Array.isArray(value)&&value.length>0&&value.every(item=>typeof item==='string'&&item.trim()),'Guía: preguntas vacías o inválidas');
 else ensure(typeof value==='string'&&value.trim(),`Guía: falta ${key}`);
}
// The editor schemas must preserve every existing field in list objects (e.g. home/pricing flags).
const config=JSON.parse(fs.readFileSync('.pages.yml','utf8'));
function walk(value,fields,location){
 for(const [key,item] of Object.entries(value)){
  const field=fields.find(f=>f.name===key);ensure(field,`Campo sin editor: ${location}.${key}`);
  if(field.type==='object'){
   if(Array.isArray(item))item.forEach((child,i)=>walk(child,field.fields,`${location}.${key}[${i}]`));
   else if(item)walk(item,field.fields,`${location}.${key}`);
  }
 }
}
const fileGroups=new Map();for(const entry of config.content){const list=fileGroups.get(entry.path)??[];list.push(...entry.fields);fileGroups.set(entry.path,list);}
for(const [file,fields]of fileGroups)walk(JSON.parse(fs.readFileSync(file,'utf8')),fields,file);
console.log(`Content valid: ${features.items.length} modules, ${guides.length} guides, ${config.content.length} CMS editors.`);
