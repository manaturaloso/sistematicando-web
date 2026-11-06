import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium,expect} from '@playwright/test';
import {previewServer} from './lib/preview-server.mjs';
const server=await previewServer('.editor-dist'),version=JSON.parse(await fs.readFile('.editor-dist/version.json','utf8'));
const config=JSON.parse(await fs.readFile('.pages.yml','utf8'));const documents=Object.fromEntries(await Promise.all([...new Set(config.content.map(item=>item.path))].map(async file=>[file,JSON.parse(await fs.readFile(file,'utf8'))])));
const media=(await fs.readdir('public/media')).filter(file=>/\.(png|jpe?g|webp)$/i.test(file)).map(file=>'/media/'+file);
const original=documents['content/pages.json']['pages-index'].text_002;let browser;const results=[];
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||chromium.executablePath(),args:['--no-sandbox']});
 for(const scenario of ['success','conflict','expired','read-only','stale-preview','dirty-preview','not-signed-in','logout']){
  const context=await browser.newContext({viewport:{width:1440,height:1100},acceptDownloads:true});const page=await context.newPage();let commits=0,lastBody,loggedOut=false,logouts=0;const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await context.route('**/*',async route=>{
   const request=route.request(),url=new URL(request.url());assert.equal(url.origin,server.url,'Never contact external services in hosted UI fixtures');
   if(url.pathname==='/auth/session')return route.fulfill({status:scenario==='not-signed-in'||loggedOut?401:200,json:scenario==='not-signed-in'||loggedOut?{error:'Inicia sesión con GitHub.'}:{authenticated:true,csrf:'csrf-browser-fixture',repository:'manaturaloso/sistematicando-web',branch:'feat/feature-catalog',contentWritesEnabled:scenario!=='read-only'}});
   if(url.pathname==='/auth/logout'){assert.equal(request.method(),'POST');assert.equal(request.headers()['x-csrf-token'],'csrf-browser-fixture');loggedOut=true;logouts++;return route.fulfill({json:{signedOut:true}});}
   if(url.pathname==='/editor-api/state')return route.fulfill({json:{head:version.commit,repository:'manaturaloso/sistematicando-web',branch:'feat/feature-catalog',documents,media,contentWritesEnabled:scenario!=='read-only'}});
   if(url.pathname==='/editor-api/commit'){commits++;lastBody=request.postDataJSON();assert.equal(request.headers()['x-csrf-token'],'csrf-browser-fixture');return route.fulfill({status:scenario==='conflict'?409:scenario==='expired'?401:200,json:scenario==='conflict'?{error:'La rama cambió; recarga.'}:scenario==='expired'?{error:'Sesión caducada.'}:{commit:'d'.repeat(40),repository:'manaturaloso/sistematicando-web',branch:'feat/feature-catalog',published:false}});}
   if(url.searchParams.has('editor-preview')){const response=await route.fetch();let body=await response.text();body=body.replace(/data-preview-modified="[^"]*"/,'data-preview-modified="'+(scenario==='dirty-preview'?'true':'false')+'"');if(scenario==='stale-preview')body=body.replace(/data-preview-commit="[^"]*"/,'data-preview-commit="'+ 'f'.repeat(40)+'"');return route.fulfill({response,body});}
   return route.continue();
  });
  await page.goto(server.url+'/admin/editor/');assert.equal(await page.locator('.visual-editor').getAttribute('data-mode'),'hosted');assert.equal(await page.locator('#ve-page option').count(),41);
  if(scenario==='not-signed-in'){await expect(page.locator('#ve-status')).toContainText('Inicia sesión');assert(await page.locator('#ve-login').isVisible());assert(await page.locator('#ve-github').isDisabled());}
  else if(['stale-preview','dirty-preview'].includes(scenario)){await expect(page.locator('#ve-status')).toContainText('no corresponde');assert(await page.locator('#ve-github').isDisabled());assert.equal(await page.frameLocator('#ve-preview').locator('[data-visual-field]').count(),0);}
  else{
   const frame=page.frameLocator('#ve-preview');try{await frame.getByRole('button',{name:'Editar: '+original,exact:true}).click({timeout:5000});}catch(error){console.error('Scenario',scenario,'status',await page.locator('#ve-status').innerText(),'errors',errors,'frame',await page.frames()[1].evaluate(()=>({meta:document.documentElement.dataset,fields:document.querySelectorAll('[data-visual-field]').length})));throw error;}await page.locator('#ve-value').fill('Borrador remoto en la vista');await page.locator('#ve-save').click();
   await expect(page.locator('#ve-pending')).toContainText('Borrador remoto en la vista');assert.equal(commits,0,'Staging never commits');
   if(scenario==='logout'){page.once('dialog',dialog=>dialog.accept());await page.locator('#ve-logout').click();await expect(page.locator('#ve-login')).toBeVisible();await expect(page.locator('#ve-status')).toContainText('Inicia sesión');assert.equal(logouts,1);assert.equal(commits,0);}
   else if(scenario==='read-only'){assert(await page.locator('#ve-github').isDisabled());await expect(page.locator('#ve-remote-access')).toContainText('desactivado');}
   else{
    await expect(page.locator('#ve-github')).toBeEnabled();await page.locator('#ve-github').click();await expect(page.locator('#ve-confirm-files')).toContainText(original);await expect(page.locator('#ve-confirm-files')).toContainText('Borrador remoto en la vista');await page.locator('#ve-confirm-cancel').click();assert.equal(commits,0);
    await page.locator('#ve-github').click();await page.locator('#ve-confirm-save').click();await expect.poll(()=>commits).toBe(1);
    if(scenario==='success'){await expect(page.locator('#ve-status')).toContainText('Cambios guardados en GitHub');assert(await page.locator('#ve-github').isDisabled());await expect(page.locator('#ve-pending')).toBeEmpty();assert.equal(lastBody.baseHead,version.commit);assert.equal(lastBody.edits[0].oldValue,original);}
    else{await expect(page.locator('#ve-pending')).toContainText('Borrador remoto en la vista');await expect(page.locator('#ve-status')).toContainText(scenario==='conflict'?'rama cambió':'caducada');if(scenario==='expired')assert(await page.locator('#ve-login').isVisible());const download=page.waitForEvent('download');await page.locator('#ve-export').click();const file=await(await download).path();const draft=JSON.parse(await fs.readFile(file,'utf8'));assert.equal(draft.edits[0].value,'Borrador remoto en la vista');assert(!JSON.stringify(draft).includes('csrf-browser-fixture'));page.once('dialog',dialog=>dialog.accept());await page.locator('#ve-import').setInputFiles(file);await expect(page.locator('#ve-status')).toContainText('Borrador recuperado');await expect(page.locator('#ve-pending')).toContainText('Borrador remoto en la vista');assert.equal(commits,1);}
   }
   for(const width of [320,390,1440]){await page.setViewportSize({width,height:1100});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Hosted inspector overflow @${width}`);}
  }
  if(scenario==='conflict')await page.screenshot({path:'/tmp/sistematicando-hosted-inspector.png',fullPage:true});
  assert.deepEqual(errors,[]);results.push({scenario,commits,sourcesChanged:false,externalServicesContacted:false});await context.close();
 }
 await fs.writeFile('docs/qa/hosted-inspector-report.json',JSON.stringify({scope:'Hosted-mode isolated build, synthetic auth/GitHub API, clean-preview metadata fixture; no real login, deployment or repository writes',buildVersion:version,results},null,2)+'\n');console.log('PASS hosted inspector:',results.length,'browser scenarios; explicit review, errors preserve drafts, no external calls.');
}finally{await browser?.close();await server.close();}
