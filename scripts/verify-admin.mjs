import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {previewServer} from './lib/preview-server.mjs';
const config=JSON.parse(await fs.readFile('.pages.yml','utf8'));
const pricing=JSON.parse(await fs.readFile('content/pricing.json','utf8'));
const buildVersion=JSON.parse(await fs.readFile('dist/version.json','utf8'));
const server=await previewServer();let browser;const results=[];
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 for(const javaScriptEnabled of [true,false]){
  const context=await browser.newContext({javaScriptEnabled,viewport:{width:390,height:1000}});
  const page=await context.newPage();const requests=[];
  await context.route('**/*',route=>{if(new URL(route.request().url()).origin!==server.url){requests.push(route.request().url());return route.abort();}return route.continue();});
  assert.equal((await page.goto(server.url+'/admin/')).status(),200);
  assert.equal(await page.locator('[data-editor]').count(),config.content.length);
  for(const editor of config.content){
   const card=page.locator(`[data-editor="${editor.name}"]`),link=card.locator('a[target="_blank"]');
   const url=new URL(await link.getAttribute('href'));
   assert.equal(url.origin,'https://app.pagescms.org');
   assert.equal(decodeURIComponent(url.pathname),`/manaturaloso/sistematicando-web/feat/feature-catalog/file/${editor.name}`);
   assert.equal(await link.getAttribute('rel'),'noopener noreferrer');
  }
  assert.equal(await page.locator('.admin-pricing-preview>div').count(),pricing.plans.length);
  for(const plan of pricing.plans)assert((await page.locator('.admin-pricing-preview').innerText()).includes(plan.name));
  assert.equal(await page.locator('.admin-brand-preview img').count(),1);
  for(const width of [320,390,768,1024,1440]){await page.setViewportSize({width,height:1000});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Admin overflow @${width}`);}
  await page.setViewportSize({width:390,height:1000});
  if(javaScriptEnabled){
   const search=page.locator('#editor-search');assert(await search.isVisible());
   await search.fill('no-existe-editor-xyz');assert.equal(await page.locator('[data-editor]:visible').count(),0);assert(await page.locator('.admin-search-empty').isVisible());
   await page.locator('.admin-sidebar a[href="#marca"]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('[data-editor]:visible').count(),config.content.length);
   await search.fill('términos');assert(await page.locator('[data-editor]:visible').count()>0);assert(await page.locator('[data-editor]:visible').count()<config.content.length);
   await page.getByRole('button',{name:'Limpiar',exact:true}).click();assert.equal(await page.locator('[data-editor]:visible').count(),config.content.length);assert(await search.evaluate(el=>el===document.activeElement));
   await search.fill('privacidad');await page.keyboard.press('Enter');assert.equal(new URL(page.url()).pathname,'/admin/');
  }else{assert(!(await page.locator('.admin-search').isVisible()));assert.equal(await page.locator('[data-editor]:visible').count(),config.content.length);}
  assert.deepEqual(requests,[],'Dashboard must not contact CMS or GitHub before explicit navigation');
  results.push({javaScriptEnabled,editors:config.content.length,correctCmsBranch:true,externalServicesContacted:false});
  await context.close();
 }
 await fs.writeFile('docs/qa/admin-report.json',JSON.stringify({buildVersion,scope:'Local dashboard, editor inventory and external links inspected; no authenticated CMS editing or saving performed',results},null,2)+'\n');
 console.log('PASS visual admin: complete CMS inventory, correct branch links, current previews, search/empty/reset/keyboard, five widths and no-JS; no external services contacted.');
}finally{await browser?.close();await server.close();}
