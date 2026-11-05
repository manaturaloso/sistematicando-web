import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {previewServer} from './lib/preview-server.mjs';
const contact=JSON.parse(await fs.readFile('content/contact.json','utf8'));
const terms=JSON.parse(await fs.readFile('content/terms.json','utf8'));
const pages=JSON.parse(await fs.readFile('content/pages.json','utf8'));
const server=await previewServer();let browser;
const results=[];
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 for(const javaScriptEnabled of [true,false]){
  const context=await browser.newContext({javaScriptEnabled,viewport:{width:390,height:1000}}),page=await context.newPage(),requests=[];
  page.on('request',request=>requests.push({origin:new URL(request.url()).origin,method:request.method()}));
  for(const route of ['/legal/privacidad/','/legal/terminos/']){
   assert.equal((await page.goto(server.url+route)).status(),200);
   const main=await page.locator('main').innerText();
   for(const value of [contact.responsible,contact.ruc,contact.address,contact.email])assert(main.includes(value),`Missing confirmed identity on ${route}`);
   assert(!/\{(?:responsible|ruc|address)\}/.test(main),'Unresolved identity template');
   assert.equal(await page.locator('form').count(),0);
   assert(await page.locator(`main a[href="mailto:${contact.email}"]`).count()>0);
   assert(await page.locator(`main a[href="https://wa.me/${contact.whatsapp}"]`).count()>0);
   const other=route.includes('privacidad')?'/legal/terminos/':'/legal/privacidad/';
   assert(await page.locator(`main a[href="${other}"]`).isVisible());
   assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex, nofollow');
   if(route.includes('terminos')){
    assert.equal(await page.locator('.scope-note').innerText(),pages['pages-legal-terminos'].text_005);
    for(const section of terms.sections)assert(await page.locator(`.legal-toc a[href="#${section.id}"]`).isVisible());
    const last=terms.sections.at(-1);await page.locator(`.legal-toc a[href="#${last.id}"]`).focus();await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash,'#'+last.id);assert(await page.locator('#'+last.id).isVisible());
    const sales=new URL(await page.locator(`main a[href^="https://wa.me/${contact.whatsapp}?"]`).getAttribute('href'));
    assert.equal(sales.searchParams.get('text'),contact.whatsappMessage);
   }
   results.push({route,javaScriptEnabled,confirmedIdentity:true,legalNavigation:true});
   if(javaScriptEnabled){await fs.mkdir('/tmp/sistematicando-legal',{recursive:true});await page.evaluate(()=>{document.activeElement?.blur();document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0)});await page.screenshot({path:`/tmp/sistematicando-legal/${route.includes('terminos')?'terms':'privacy'}-390.png`,fullPage:true});}
  }
  await page.goto(server.url+'/solicitar-demo/');
  if(javaScriptEnabled){
   for(const id of ['business','locations','priority'])await page.locator('#'+id).selectOption({index:1});
   await page.locator('#demo-guide button[type=submit]').click();assert(await page.locator('#guide-result').isVisible());
   assert.deepEqual(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length})),{local:0,session:0});
  }
  assert.equal((await context.cookies()).length,0,'Local pages should not set cookies');
  assert(requests.every(request=>request.origin===server.url&&request.method==='GET'),'Local navigation/guide must not transmit to external services');
  results.push({javaScriptEnabled,scope:'Local build only; hosting and external services not exercised',requests:requests.length,externalRequests:0,cookies:0});
  await context.close();
 }
 await fs.writeFile('docs/qa/legal-report.json',JSON.stringify({scope:'Draft website terms and privacy; not legal adoption or a SaaS contract',results},null,2)+'\n');
 console.log('PASS draft legal navigation/identity with and without JS, keyboard TOC, local guide without external requests, cookies or persistent storage.');
}finally{await browser?.close();await server.close();}
