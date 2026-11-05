import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {previewServer} from './lib/preview-server.mjs';
const {items:articles}=JSON.parse(await fs.readFile('content/articles.json','utf8'));
const pages=JSON.parse(await fs.readFile('content/pages.json','utf8'));
const server=await previewServer();let browser;
const results=[];
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 for(const javaScriptEnabled of [true,false]){
  const context=await browser.newContext({javaScriptEnabled,viewport:{width:390,height:1000}}),page=await context.newPage();
  await page.goto(server.url+'/ayuda/');
  for(const link of pages['pages-ayuda-index'].helpLinks)assert(await page.locator(`.help-grid a[href="${link.href}"]`).first().isVisible());
  for(const id of pages['pages-ayuda-index'].faqIds){
   const details=page.locator(`details[data-faq="${id}"]`);
   await details.locator('summary').focus();await page.keyboard.press('Enter');
   assert(await details.getAttribute('open')!==null);assert(await details.locator('p').isVisible());
  }
  await page.goto(server.url+'/nosotros/');
  assert(await page.locator('main a[href="/contacto/"]').count()>0);
  await page.goto(server.url+'/blog/');
  for(const article of articles){
   const route=`/blog/${article.slug}/`;
   assert(await page.locator(`main a[href="${route}"]`).count()>0);
  }
  for(const article of articles){
   const route=`/blog/${article.slug}/`;assert.equal((await page.goto(server.url+route)).status(),200);
   assert.equal(await page.locator('h1').innerText(),article.title);
   assert(await page.locator(`main a[href="/funcionalidades/${article.moduleId}/"]`).isVisible());
   for(const slug of article.guideSlugs)assert(await page.locator(`main a[href="/recursos/guias/${slug}/"]`).first().isVisible());
   const toc=page.locator('.guide-toc a').last();await toc.focus();await page.keyboard.press('Enter');
   assert.equal(new URL(page.url()).hash,`#lectura-${article.sections.length}`);
   assert(await page.locator(`#lectura-${article.sections.length}`).isVisible());
   assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex, nofollow');
   results.push({route,javaScriptEnabled,tocKeyboard:true,relatedLinks:true});
   if(javaScriptEnabled&&article===articles[0]){await fs.mkdir('/tmp/sistematicando-editorial',{recursive:true});for(const width of [390,1440]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>{document.activeElement?.blur();document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0)});await page.screenshot({path:`/tmp/sistematicando-editorial/article-${width}.png`,fullPage:true});}}
  }
  await context.close();
 }
 await fs.writeFile('docs/qa/resources-report.json',JSON.stringify({scope:'Company/help navigation, native FAQ and blog TOC/related reading with and without JavaScript',results},null,2)+'\n');
 console.log('PASS company/help, keyboard FAQ, blog discovery, article TOC and related guides/modules with and without JavaScript.');
}finally{await browser?.close();await server.close();}
