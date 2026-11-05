import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {previewServer} from './lib/preview-server.mjs';
const read=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const [pricing,features,contact,pages,buildVersion]=await Promise.all(['content/pricing.json','content/features.json','content/contact.json','content/pages.json','dist/version.json'].map(read));
const money=value=>new Intl.NumberFormat('es-PE',{style:'currency',currency:pricing.currency,minimumFractionDigits:0,maximumFractionDigits:2}).format(value).replace(/\s+/g,' ');
const text=async locator=>(await locator.innerText()).replace(/\s+/g,' ');
const server=await previewServer();let browser;const results=[];
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 for(const javaScriptEnabled of [true,false]){
  const context=await browser.newContext({javaScriptEnabled,viewport:{width:390,height:1000}}),page=await context.newPage();
  assert.equal((await page.goto(server.url+'/precios/')).status(),200);
  assert.equal(await page.locator('[data-plan]').count(),pricing.plans.length);
  for(const plan of pricing.plans){
   const card=page.locator(`[data-plan="${plan.id}"]`);
   assert.equal(await card.locator('h3').innerText(),plan.name);
   assert.equal(await text(card.locator('.plan-price strong')),money(plan.monthlyPrice));
   assert.equal(await text(card.locator('.plan-setup>p strong').first()),money(plan.setupPrice));
   assert.equal(await text(card.locator('.plan-first-month strong')),money(plan.monthlyPrice+plan.setupPrice));
   assert.deepEqual(await card.locator('.plan-limits dd').allTextContents(),[String(plan.locations),String(plan.users)]);
   const link=card.locator('.plan-cta'),url=new URL(await link.getAttribute('href'));
   assert.equal(url.origin,'https://wa.me');assert.equal(url.pathname,'/'+contact.whatsapp);
   assert.equal(url.searchParams.get('text'),contact.whatsappMessage+' Me interesa el plan '+plan.name+'.');
   assert((await link.getAttribute('aria-label')).includes(plan.name));assert.equal(await link.getAttribute('aria-describedby'),'plan-action-note');
  }
  const rows=page.locator('.pricing-table tbody tr');assert.equal(await rows.count(),features.items.length);
  for(let index=0;index<features.items.length;index++){
   const feature=features.items[index],cells=rows.nth(index).locator('td');
   for(let col=0;col<pricing.plans.length;col++){
    const plan=pricing.plans[col],addon=pricing.addons.find(item=>item.moduleIds.includes(feature.id)&&item.planIds.includes(plan.id));
    const key=plan.moduleIds.includes(feature.id)?'text_047':addon?'text_048':'text_049';
    assert.equal(await cells.nth(col).innerText(),pages['pages-precios-index'][key]);
   }
  }
  for(const addon of pricing.addons)assert((await text(page.locator(`[data-addon="${addon.id}"] .addon-price`))).includes(money(addon.monthlyPrice)));
  assert.equal(await page.locator('form').count(),0,'No checkout or submitted price request');
  assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex, nofollow');
  if(javaScriptEnabled){
   for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:1000});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Pricing overflow @${width}`);
   }
   await page.setViewportSize({width:390,height:1000});const region=page.locator('.pricing-table-wrap');await region.focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('.pricing-table-wrap').scrollLeft>0);
  }
  results.push({javaScriptEnabled,plans:pricing.plans.length,comparisonRows:features.items.length,totalsAndLimits:true,whatsappLinksInspectedWithoutSending:true,noCheckout:true});
  await context.close();
 }
 await fs.writeFile('docs/qa/pricing-report.json',JSON.stringify({buildVersion,scope:'Proposed commercial configuration and UI arithmetic, not operational SaaS validation or financial/tax approval',results},null,2)+'\n');
 console.log('PASS plans, first-month totals, module matrix, addon prices, WhatsApp links (not sent), no-JS and keyboard table scrolling.');
}finally{await browser?.close();await server.close();}
