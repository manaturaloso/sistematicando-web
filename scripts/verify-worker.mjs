import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from '@playwright/test';
import {builtRoutes} from './lib/preview-server.mjs';
const base='http://127.0.0.1:8787';
const results=[];
async function check(route,status=200){
 const response=await fetch(base+route);assert.equal(response.status,status,route);
 const html=await response.text();assert(html.includes('name="robots" content="noindex, nofollow"'),route);
 assert.equal((html.match(/<h1(?:\s|>)/g)??[]).length,1,route);
 results.push({route,status:response.status,finalPath:new URL(response.url).pathname});return html;
}
for(const route of await builtRoutes())await check(route);
for(const route of ['/ruta-inexistente/','/admin/no-existe/','/docs/PROGRESS.md','/content/contact.json','/.git/config','/.pages.yml','/wrangler.jsonc']){
 const html=await check(route,404);assert(html.includes('Volvamos al inicio.'),`Missing custom 404: ${route}`);
}
for(const [from,to] of [['/soluciones','/soluciones/'],['/admin','/admin/'],['/precios/index.html','/precios/'],['/soluciones/restaurantes/index.html','/soluciones/restaurantes/']]){
 const r=await fetch(base+from,{redirect:'manual'});assert.equal(r.status,307,from);assert.equal(new URL(r.headers.get('location'),base).pathname,to);results.push({route:from,status:r.status,location:r.headers.get('location')});
}
const query=await fetch(base+'/soluciones?origen=prueba',{redirect:'manual'});assert.equal(query.headers.get('location'),'/soluciones/?origen=prueba');
for(const file of ['fonts/Manrope-Variable.ttf','fonts/Gluten-Variable.ttf']){
 const r=await fetch(base+'/'+file);assert.equal(r.status,200,file);
 const expected=await fs.readFile('dist/'+file),actual=Buffer.from(await r.arrayBuffer());
 assert.equal(createHash('sha256').update(actual).digest('hex'),createHash('sha256').update(expected).digest('hex'),file);
}
const robots=await fetch(base+'/robots.txt');assert((await robots.text()).includes('Disallow: /'));
const post=await fetch(base+'/solicitar-demo/',{method:'POST',body:'local-routing-test'});assert.equal(post.status,405,'Static assets must not pretend to accept a request');
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{
 const context=await browser.newContext({viewport:{width:390,height:1000}}),page=await context.newPage();
 const failures=[];page.on('pageerror',e=>failures.push(String(e)));page.on('response',r=>{if(r.status()>=400)failures.push(`${r.status()} ${r.url()}`)});
 for(const route of ['/','/funcionalidades/','/admin/','/solicitar-demo/']){
  await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route);
  assert(await page.evaluate(()=>document.fonts.check('500 32px "Manrope"')),route);
 }
 await page.goto(base+'/');await page.getByRole('button',{name:'Menú'}).click();assert(await page.locator('#main-nav').isVisible());await page.keyboard.press('Escape');assert(!await page.locator('#main-nav').isVisible());
 assert.equal(failures.length,0,JSON.stringify(failures));
}finally{await browser.close();}
await fs.mkdir('docs/qa',{recursive:true});
await fs.writeFile('docs/qa/worker-report.json',JSON.stringify({environment:'Wrangler 4.157.0 --local; no Cloudflare deployment or remote validation',pages:results,checks:['all built pages','custom missing/private-path 404s','307 trailing slash/index normalization','query preservation','font integrity','robots/noindex','POST 405','four mobile browser routes and menu']},null,2)+'\n');
console.log(`PASS Worker local: ${results.length} route checks, fonts, query, POST 405 and mobile browser.`);
