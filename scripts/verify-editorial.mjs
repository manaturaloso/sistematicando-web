import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {previewServer} from './lib/preview-server.mjs';
const pages=JSON.parse(await fs.readFile('content/pages.json','utf8'));
const search=pages['pages-funcionalidades-index'].search,guide=pages['pages-solicitar-demo-index'].guide;
const server=await previewServer();let browser;
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext(),page=await context.newPage();
 const contact=JSON.parse(await fs.readFile('content/contact.json','utf8'));
 for(const javaScriptEnabled of [true,false]){
  const contactContext=await browser.newContext({javaScriptEnabled,viewport:{width:390,height:1000}}),contactPage=await contactContext.newPage();
  await contactPage.goto(server.url+'/contacto/');
  const sales=new URL(await contactPage.locator('.whatsapp-link').getAttribute('href'));
  assert.equal(sales.hostname,'wa.me');assert.equal(sales.pathname,'/'+contact.whatsapp);assert.equal(sales.searchParams.get('text'),contact.whatsappMessage);
  assert.equal(await contactPage.locator('.privacy-email').getAttribute('href'),'mailto:'+contact.email);
  assert.equal(await contactPage.locator('.privacy-whatsapp').getAttribute('href'),'https://wa.me/'+contact.whatsapp);
  assert.equal(await contactPage.locator('form').count(),0);
  assert((await contactPage.locator('.contact-details').innerText()).includes(contact.responsible));
  if(javaScriptEnabled)for(const width of [320,390,768,900,1440]){
   await contactPage.setViewportSize({width,height:1000});
   assert(await contactPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Contact overflow: ${width}`);
   if(width===390||width===1440){await fs.mkdir('/tmp/sistematicando-qa',{recursive:true});await contactPage.screenshot({path:`/tmp/sistematicando-qa/contact-${width}.png`});}
  }
  await contactContext.close();
 }
 await page.goto(server.url+'/funcionalidades/');
 const field=page.getByRole('searchbox'),cards=page.locator('.feature-card');
 assert.equal(await field.getAttribute('placeholder'),search.placeholder);
 assert.equal(await page.locator('#search-count').innerText(),search.initialCount.replace('{count}',String(await cards.count())));
 assert.equal(await page.locator('.feature-jumps').getAttribute('aria-label'),search.areasLabel);
 const queries=[await cards.first().locator('h3').innerText(),'zz-no-result',''];
 for(const query of queries){
  await field.fill(query);
  const count=await page.locator('.feature-card:not([hidden])').count();
  assert.equal(await page.locator('#search-count').innerText(),(count===1?search.singularCount:search.pluralCount).replace('{count}',String(count)));
  assert.equal(await page.locator('.search-empty').isVisible(),count===0);
 }
 await page.goto(server.url+'/solicitar-demo/');
 assert.equal(await page.locator('#demo-guide').getAttribute('aria-label'),guide.formLabel);
 for(const id of ['business','locations','priority'])await page.locator('#'+id).selectOption({index:1});
 const values=await Promise.all(['business','locations','priority'].map(id=>page.locator('#'+id).inputValue()));
 await page.locator('#demo-guide button[type=submit]').click();
 const expected=[guide.heading,'',`${guide.businessLabel}: ${values[0]}`,`${guide.locationsLabel}: ${values[1]}`,`${guide.priorityLabel}: ${values[2]}`,'',guide.questionsHeading,...guide.questions.map(question=>`- ${question}`),'',guide.disclaimer].join('\n');
 assert.equal(await page.locator('#guide-text').textContent(),expected);
 assert.equal(await page.locator('#guide-status').textContent(),guide.generatedStatus);
 const downloadPromise=page.waitForEvent('download');await page.locator('#download-guide').click();const download=await downloadPromise;
 assert.equal(download.suggestedFilename(),'sistematicando-guia-demo.txt');assert.equal(await fs.readFile(await download.path(),'utf8'),expected);
 assert.equal(await page.locator('#guide-status').textContent(),guide.downloadStatus);
 await page.locator('#priority').selectOption({index:2});assert(!await page.locator('#guide-result').isVisible());assert.equal(await page.locator('#guide-text').textContent(),'');
 console.log('PASS contact channels (JS/no-JS), five contact widths and CMS editorial copy: placeholder, dynamic counts, accessible labels, guide text/download/status and invalidation.');
}finally{await browser?.close();await server.close();}
