import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {builtRoutes} from './lib/preview-server.mjs';
const read=async path=>JSON.parse(await fs.readFile(path,'utf8'));
const [version,site,a11y,brand,features]=await Promise.all([
 read('dist/version.json'),read('docs/qa/site-report.json'),read('docs/qa/accessibility-report.json'),read('content/site.json'),read('content/features.json')
]);
assert.deepEqual(site.buildVersion,version,'Site evidence differs from current build; run test:ci again');
assert.deepEqual(a11y.buildVersion,version,'Accessibility evidence differs from current build; run test:ci again');
const routes=await builtRoutes();
assert.deepEqual(site.routes.map(item=>item.route),routes,'Site evidence does not cover current routes');
assert.equal(new Set(site.routes.map(item=>item.route)).size,routes.length);
assert(a11y.results.every(item=>item.violations.length===0),'Accessibility failures remain');
const pages=routes.map(route=>{
 const item=site.routes.find(item=>item.route===route);
 assert(item.metadata&&item.status===200&&item.internalLinks>0,`Incomplete page checks: ${route}`);
 const viewportChecks=[390,1440].map(width=>{const checks=a11y.results.filter(result=>result.route===route&&result.width===width&&!result.state);assert.equal(checks.length,1,`Missing/duplicate axe evidence: ${route} @${width}`);return {width,incomplete:checks[0].incomplete};});
 return {...item,viewportChecks};
});
assert(brand.launchDraft===true,'Preparation must remain a launch draft');
assert((await fs.readFile('dist/robots.txt','utf8')).includes('Disallow: /'),'Crawler block must remain');
assert(!(await fs.readdir('dist')).some(file=>/^sitemap.*\.xml$/i.test(file)),'Public sitemap must not be introduced without launch approval');
const gates=[
 {id:'visual-cms',status:'pending',detail:'Editor visual local implementado; integrar y probar autenticación/autorización GitHub en alojamiento seguro antes de habilitar edición pública. No exponer la API local.'},
 {id:'product',status:'pending',detail:`Confirmar disponibilidad y evidencia real del SaaS; ${features.items.filter(item=>item.status!=='available').length} módulos sin estado available en la matriz interna.`},
 {id:'commercial',status:'pending',detail:'Propuesta de planes implementada por encargo; validar viabilidad económica/tributaria, alcance operativo y condiciones finales de contratación.'},
 {id:'legal',status:'pending',detail:'Revisar/adoptar privacidad y términos; contrato SaaS y operación de datos pendientes. Ver LEGAL_REVIEW.md.'},
 {id:'manual',status:'pending',detail:'Revisión humana del contenido y recorridos con dispositivos físicos/lector de pantalla; resolver incomplete de axe.'},
 {id:'remote-ci',status:'unverified',detail:'Comprobar Actions del SHA que se vaya a revisar; resultados locales no acreditan CI remoto.'},
 {id:'domain',status:'pending',detail:'Confirmar dominio y preparar canonicals/sitemap/indexación solo con autorización.'},
 {id:'launch',status:'blocked',detail:'No publicar hasta confirmación de producto/web completos y autorización final del propietario.'}
];
const report={schemaVersion:1,scope:'Validated local build snapshot; automated checks are not approval to launch',buildVersion:version,pages,interactiveChecks:a11y.results.filter(item=>item.state).length,destinations:site.destinations,launchDraft:true,robotsBlocked:true,readyToPublish:false,gates};
await fs.writeFile('docs/qa/release-report.json',JSON.stringify(report,null,2)+'\n');
const cell=value=>String(value).replaceAll('|','\\|').replaceAll('\n',' ');
const rows=pages.map(page=>`| ${page.route} | ${cell(page.title)} | ${page.type} | Sí | ${page.internalLinks} | 0 / 0 |`).join('\n');
const markdown=`# Checklist de cierre de lanzamiento\n\nGenerado con npm run audit:release tras test:ci. Fuente: qa/release-report.json. Este informe describe un build local, no el Worker público ni una aprobación del producto.\n\nBase Git del build verificado: ${version.commit??'sin Git'}; cambios locales de fuente: ${version.sourceModified}. Un commit posterior cambia la identidad del build: recompilar; la evidencia guardada sigue identificando esta instantánea, no se reasigna a otro SHA. La CI vuelve a generar evidencias para su propio build.\n\n${pages.length} páginas, ${site.destinations} destinos internos y ${a11y.results.length} comprobaciones axe sin infracciones detectadas. Metadata incluye título/descripción únicos, Open Graph coherente, idioma, viewport y noindex; enlaces/fragmentos e imágenes verificados. Los incomplete de axe permanecen en el JSON y requieren revisión humana. Las cifras no expresan porcentaje de preparación comercial ni certificación WCAG.\n\n| Ruta | Título | Tipo OG | Metadatos | Enlaces internos | Axe 390 / 1440 |\n| --- | --- | --- | --- | --- | --- |\n${rows}\n\n## Pendientes para autorizar lanzamiento\n\n| Área | Estado | Acción |\n| --- | --- | --- |\n${gates.map(gate=>`| ${gate.id} | ${gate.status} | ${cell(gate.detail)} |`).join('\n')}\n\n${pages.length} es el inventario actual, no una lista fija: el script descubre rutas generadas y exige evidencia coincidente. La página /404.html se revisa como archivo HTML; el estado HTTP 404 para rutas inexistentes se comprueba aparte con test:worker. No hay receptor propio de leads ni cambio de publicación por ejecutar estas pruebas.\n\nSiguiente paso exacto: revisar visualmente las páginas y los estados interactivos pendientes, registrar resultados reales y continuar QA sin retirar noindex. Confirmar decisiones comerciales/legales con el propietario cuando corresponda; no solicitar ni ejecutar publicación durante preparación.\n`;
await fs.writeFile('docs/RELEASE_CHECKLIST.md',markdown);
console.log(`PASS release inventory: ${pages.length} pages, matching build evidence; ${gates.length} unresolved launch gates preserved. No publication.`);
