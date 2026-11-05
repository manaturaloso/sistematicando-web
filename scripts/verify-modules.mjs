import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {previewServer} from './lib/preview-server.mjs';
const {items}=JSON.parse(await fs.readFile('content/features.json','utf8'));
const site=JSON.parse(await fs.readFile('content/site.json','utf8'));
const server=await previewServer();let browser;
const results=[];
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:390,height:1000}}),page=await context.newPage();
 for(const item of items){
  const route=`/funcionalidades/${item.id}/`;
  assert.equal((await page.goto(server.url+route)).status(),200);
  assert.equal(await page.locator('h1').innerText(),item.name);
  assert.equal(await page.locator('.module-promise').innerText(),item.launch.headline);
  assert.deepEqual(await page.locator('.module-benefits h3').allTextContents(),item.launch.benefits.map(x=>x.title));
  assert.deepEqual(await page.locator('.module-steps h3').allTextContents(),item.launch.workflow.map(x=>x.title));
  assert.equal(await page.locator('.module-scope>p').first().innerText(),item.launch.scope);
  assert.equal(await page.locator('.launch-draft-notice').count(),site.launchDraft?1:0);
  if(site.launchDraft)assert((await page.locator('.launch-draft-notice').innerText()).includes(site.launchDraftNotice));
  assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex, nofollow');
  assert(await page.locator('a[href="/funcionalidades/"]').count()>0);
  assert(await page.locator('a[href="/solicitar-demo/"]').count()>0);
  for(const sector of item.sectors)assert(await page.locator(`.module-scope a[href="/soluciones/${sector}/"]`).count()>0);
  results.push({route,benefits:item.launch.benefits.length,workflowSteps:item.launch.workflow.length,internalStatus:item.status,launchDraft:site.launchDraft});
 }
 await page.goto(server.url+'/funcionalidades/');
 for(const item of items)assert(await page.locator(`a[href="/funcionalidades/${item.id}/"]`).count()>0);
 await fs.writeFile('docs/qa/modules-report.json',JSON.stringify({scope:'Launch-target web copy; not validation of operational SaaS capability',results},null,2)+'\n');
 console.log(`PASS ${items.length} CMS-driven module pages, launch preview, benefits/workflows/scopes and sector/catalog links.`);
}finally{await browser?.close();await server.close();}
