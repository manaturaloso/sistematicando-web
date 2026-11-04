import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {previewServer,builtRoutes} from './lib/preview-server.mjs';
const server=await previewServer(),routes=await builtRoutes();
let browser;
const report={scope:'Local build: all generated routes and internal link/anchor targets; no external services contacted.',routes:[],destinations:0};
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:390,height:1000}}),page=await context.newPage();
 const errors=[];page.on('pageerror',error=>errors.push(String(error)));page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`)});
 const titles=new Set(),checked=new Set();
 for(const route of routes){
  assert.equal((await page.goto(server.url+route)).status(),200,route);
  await page.evaluate(()=>document.fonts.ready);
  const title=await page.title();assert(title.trim()&&!titles.has(title),`Missing/duplicate title: ${route}`);titles.add(title);
  assert.equal(await page.locator('h1').count(),1,route);
  assert(await page.locator('meta[name=description]').getAttribute('content'),route);
  assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex, nofollow',route);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow: ${route}`);
  const ids=await page.locator('[id]').evaluateAll(els=>els.map(el=>el.id));assert.equal(ids.length,new Set(ids).size,`Duplicate IDs: ${route}`);
  for(const image of await page.locator('img').all()){await image.evaluate(async el=>{el.loading='eager';await el.decode();});assert(await image.evaluate(el=>el.complete&&el.naturalWidth>0),`Broken image: ${route}`);}
  for(const href of await page.locator('a[href]').evaluateAll(els=>els.map(el=>el.getAttribute('href')))){
   const url=new URL(href,page.url());
   assert(['http:','https:','mailto:'].includes(url.protocol),`Unsupported link: ${href}`);
   if(url.origin!==server.url||checked.has(url.href))continue;
   const response=await page.request.get(url.href);assert(response.ok(),`Broken link from ${route}: ${href}`);
   if(url.hash){const html=await response.text();assert(await page.evaluate(({html,id})=>!!new DOMParser().parseFromString(html,'text/html').getElementById(id),{html,id:decodeURIComponent(url.hash.slice(1))}),`Missing anchor from ${route}: ${href}`);}
   checked.add(url.href);
  }
  report.routes.push({route,status:200,title});console.log(`PASS site ${route}`);
 }
 assert.equal(errors.length,0,JSON.stringify(errors));report.destinations=checked.size;
 await fs.mkdir('docs/qa',{recursive:true});await fs.writeFile('docs/qa/site-report.json',JSON.stringify(report,null,2)+'\n');
 console.log(`PASS ${routes.length} routes and ${checked.size} internal destinations.`);
}finally{await browser?.close();await server.close();}
