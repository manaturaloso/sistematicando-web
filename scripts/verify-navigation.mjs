import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {previewServer} from './lib/preview-server.mjs';
const navigation=JSON.parse(await fs.readFile('content/navigation.json','utf8'));
const moduleRoutes=JSON.parse(await fs.readFile('content/features.json','utf8')).items.map(item=>`/funcionalidades/${item.id}/`);
const articleRoutes=JSON.parse(await fs.readFile('content/articles.json','utf8')).items.map(item=>`/blog/${item.slug}/`);
const resizedRoutes=['/404.html','/','/funcionalidades/','/solicitar-demo/','/admin/','/admin/editor/','/recursos/','/contacto/',...moduleRoutes,'/legal/privacidad/','/legal/terminos/','/precios/','/implementacion/','/nosotros/','/ayuda/','/blog/',...articleRoutes];
const server=await previewServer();
let browser;
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:1000}});
 for(const route of ['/','/solicitar-demo/','/recursos/guias/preparar-cierre-de-caja/']){
  const page=await plain.newPage();await page.goto(server.url+route);
  assert(await page.locator('#main-nav').isVisible(),`Mobile navigation hidden without JavaScript: ${route}`);
  assert(!await page.locator('.menu-toggle').isVisible(),'Nonfunctional toggle should be hidden without JavaScript');
  await page.close();
 }
 await plain.close();
 const context=await browser.newContext({viewport:{width:390,height:1000}}),page=await context.newPage();
 await page.goto(server.url+'/');await page.keyboard.press('Tab');
 assert(await page.locator('.skip-link').evaluate(el=>el===document.activeElement));
 await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'contenido');
 const toggle=page.locator('.menu-toggle');assert.equal(await page.getByRole('button',{name:navigation.menuLabel,exact:true}).count(),1);await toggle.focus();await page.keyboard.press('Enter');
 assert.equal(await toggle.getAttribute('aria-expanded'),'true');await page.keyboard.press('Tab');
 assert(await page.locator('#main-nav a').first().evaluate(el=>el===document.activeElement));
 await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');
 assert(await toggle.evaluate(el=>el===document.activeElement));
 for(const width of [390,1280])for(const route of resizedRoutes){
  await page.setViewportSize({width,height:1000});await page.goto(server.url+route);await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Text resize overflow: ${route} @${width}`);
 }
 for(const width of [320,390,768,900,1440])for(const size of ['100%','200%']){
  await page.setViewportSize({width,height:1000});await page.goto(server.url+'/');await page.evaluate(size=>document.documentElement.style.fontSize=size,size);
  const footer=await page.locator('.footer-top nav a').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}}));
  assert(footer.every(rect=>rect.height>=44),`Footer targets: ${width} ${size}`);
  assert(!footer.some((a,i)=>footer.slice(i+1).some(b=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y)),`Footer overlap: ${width} ${size}`);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Home and footer reflow: ${width} ${size}`);
 }
 // A slow or failed application bundle must not change the header's mobile state.
 const isolated=await browser.newContext({viewport:{width:390,height:1000}});
 await isolated.route('**/*',route=>route.request().resourceType()==='script'?route.abort():route.continue());
 const isolatedPage=await isolated.newPage();await isolatedPage.goto(server.url+'/funcionalidades/');
 const isolatedToggle=isolatedPage.locator('.menu-toggle');
 assert.equal(await isolatedToggle.getAttribute('data-ready'),'true','Header depends on downloaded JavaScript');
 assert(!await isolatedPage.locator('#main-nav').isVisible());
 await isolatedToggle.click();assert(await isolatedPage.locator('#main-nav').isVisible());
 await isolatedPage.keyboard.press('Escape');assert(!await isolatedPage.locator('#main-nav').isVisible());
 await isolated.close();
 console.log(`PASS mobile navigation without JS, skip focus, keyboard menu/Escape 200% text resize on ${resizedRoutes.length} routes at mobile/desktop and menu with external scripts blocked.`);
}finally{await browser?.close();await server.close();}
