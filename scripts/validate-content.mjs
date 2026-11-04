import fs from 'node:fs';
import path from 'node:path';
const read=name=>JSON.parse(fs.readFileSync(`content/${name}.json`,'utf8'));
const fail=message=>{throw new Error(`Contenido: ${message}`)};
const ensure=(condition,message)=>{if(!condition)fail(message)};
const navigation=read('navigation');
for(const link of [...navigation.header,...navigation.footer]){ensure(link.label?.trim(),'Enlace sin texto');ensure(/^\/(?!\/)[a-zA-Z0-9/_#-]*$/.test(link.href),'Solo rutas internas válidas en navegación');}
const site=read('site'),contact=read('contact'),solutions=read('solutions').items,features=read('features'),guides=read('guides').items,faqs=read('faqs').items;
for(const name of ['name','tagline','logoAlt','defaultTitle','defaultDescription'])ensure(typeof site[name]==='string'&&site[name].trim(),`Marca: falta ${name}`);
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
unique(guides,'slug','guías');unique(faqs,'id','FAQ');
for(const item of features.items){
 ensure(groups.has(item.group),`Grupo de módulo desconocido: ${item.group}`);
 ensure(['unverified','proposed','planned','in-development','partial','available'].includes(item.status),`Estado inválido: ${item.id}`);
 ensure(item.evidence?.trim(),`Evidencia vacía: ${item.id}`);
 if(item.status!=='unverified')ensure(!/sin evidencia operativa/i.test(item.evidence),`Verificar evidencia antes de cambiar estado: ${item.id}`);
 for(const slug of item.sectors)ensure(sectors.has(slug),`Sector desconocido en ${item.id}: ${slug}`);
}
for(const guide of guides){ensure(guide.sections.length>0,`Guía sin secciones: ${guide.slug}`);ensure(modules.has(guide.feature),`Módulo desconocido en guía: ${guide.feature}`);for(const slug of guide.related)ensure(sectors.has(slug),`Sector desconocido en guía: ${slug}`);}
for(const item of faqs)ensure(['producto','comercial','privacidad'].includes(item.category),`Categoría FAQ inválida: ${item.category}`);
const pages=read('pages'),search=pages['pages-funcionalidades-index'].search,guide=pages['pages-solicitar-demo-index'].guide;
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
