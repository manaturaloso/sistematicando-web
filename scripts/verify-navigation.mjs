import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {previewServer} from './lib/preview-server.mjs';
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
 const toggle=page.getByRole('button',{name:'Menú'});await toggle.focus();await page.keyboard.press('Enter');
 assert.equal(await toggle.getAttribute('aria-expanded'),'true');await page.keyboard.press('Tab');
 assert(await page.locator('#main-nav a').first().evaluate(el=>el===document.activeElement));
 await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');
 assert(await toggle.evaluate(el=>el===document.activeElement));
 for(const route of ['/','/funcionalidades/','/solicitar-demo/','/admin/','/recursos/']){
  await page.setViewportSize({width:1280,height:1000});await page.goto(server.url+route);await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Text resize overflow: ${route}`);
 }
 console.log('PASS mobile navigation without JS, skip focus, keyboard menu/Escape and 200% text resize on five routes.');
}finally{await browser?.close();await server.close();}
