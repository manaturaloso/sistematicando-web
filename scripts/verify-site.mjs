import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {previewServer,builtRoutes} from './lib/preview-server.mjs';
const server=await previewServer(),routes=await builtRoutes();
const buildVersion=JSON.parse(await fs.readFile('dist/version.json','utf8'));
let browser;
const report={buildVersion,scope:'Local build: all generated routes and internal link/anchor targets; no external services contacted.',routes:[],destinations:0};
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:390,height:1000}}),page=await context.newPage();
 const errors=[];page.on('pageerror',error=>errors.push(String(error)));page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`)});
 const titles=new Set(),descriptions=new Set(),checked=new Set();
 for(const route of routes){
  assert.equal((await page.goto(server.url+route)).status(),200,route);
  await page.evaluate(()=>document.fonts.ready);
  const title=await page.title();assert(title.trim()&&!titles.has(title),`Missing/duplicate title: ${route}`);titles.add(title);
  assert.equal(await page.locator('h1').count(),1,route);
  const description=await page.locator('meta[name=description]').getAttribute('content');
  assert(description?.trim()&&!descriptions.has(description),`Missing/duplicate description: ${route}`);descriptions.add(description);
  const type=/^\/(blog|recursos\/guias)\/[^/]+\/$/.test(route)?'article':'website';
  for(const [property,expected] of [['og:title',title],['og:description',description],['og:type',type],['og:locale','es_PE']])assert.equal(await page.locator(`meta[property="${property}"]`).getAttribute('content'),expected,`${property}: ${route}`);
  assert.equal(await page.locator('html').getAttribute('lang'),'es-PE',route);
  assert.equal(await page.locator('meta[name=viewport]').getAttribute('content'),'width=device-width, initial-scale=1',route);
  assert.equal(await page.locator('link[rel=canonical],meta[property="og:url"]').count(),0,`Domain/indexing still pending: ${route}`);

  assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex, nofollow',route);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow: ${route}`);
  const ids=await page.locator('[id]').evaluateAll(els=>els.map(el=>el.id));assert.equal(ids.length,new Set(ids).size,`Duplicate IDs: ${route}`);
  for(const image of await page.locator('img').all()){await image.evaluate(async el=>{el.loading='eager';await el.decode();});assert(await image.evaluate(el=>el.complete&&el.naturalWidth>0),`Broken image: ${route}`);}
  const links=await page.locator('a[href]').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
  for(const href of links){
   const url=new URL(href,page.url());
   assert(['http:','https:','mailto:'].includes(url.protocol),`Unsupported link: ${href}`);
   if(url.origin!==server.url||checked.has(url.href))continue;
   const response=await page.request.get(url.href);assert(response.ok(),`Broken link from ${route}: ${href}`);
   if(url.hash){const html=await response.text();assert(await page.evaluate(({html,id})=>!!new DOMParser().parseFromString(html,'text/html').getElementById(id),{html,id:decodeURIComponent(url.hash.slice(1))}),`Missing anchor from ${route}: ${href}`);}
   checked.add(url.href);
  }
  report.routes.push({route,status:200,title,description,type,internalLinks:links.filter(href=>new URL(href,page.url()).origin===server.url).length,metadata:true});console.log(`PASS site ${route}`);
 }
 assert.equal(errors.length,0,JSON.stringify(errors));report.destinations=checked.size;
 await fs.mkdir('docs/qa',{recursive:true});await fs.writeFile('docs/qa/site-report.json',JSON.stringify(report,null,2)+'\n');
 console.log(`PASS ${routes.length} routes and ${checked.size} internal destinations.`);
}finally{await browser?.close();await server.close();}
