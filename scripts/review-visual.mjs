import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from '@playwright/test';
import {previewServer,builtRoutes} from './lib/preview-server.mjs';
const statesOnly=process.argv.includes('--states-only');
const output=path.resolve(process.argv[2]||'/tmp/sistematicando-visual');
assert(output.startsWith('/tmp/'),'Keep screenshot galleries outside the checkout, under /tmp');
await fs.mkdir(output,{recursive:true});
const server=await previewServer(),routes=await builtRoutes();let browser;
const buildVersion=JSON.parse(await fs.readFile('dist/version.json','utf8'));
const pages=[],states=[];
const slug=route=>route==='/'?'home':route.replace(/^\/|\/$/g,'').replaceAll('/','--');
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:1000}}),page=await context.newPage();
  for(const route of (statesOnly?[]:routes)){
   assert.equal((await page.goto(server.url+route)).status(),200);await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0)});assert.equal(await page.evaluate(()=>scrollY),0);
   const prefix=`${width}-${slug(route)}`;
   await page.screenshot({animations:'disabled',path:path.join(output,prefix+'-top.png')});
   await page.screenshot({animations:'disabled',path:path.join(output,prefix+'-full.png'),fullPage:true});
   const geometry=await page.evaluate(()=>{
    const rect=document.querySelector('footer')?.getBoundingClientRect();
    const links=[...document.querySelectorAll('.footer-top nav a')].map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
    return {scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,height:document.documentElement.scrollHeight,footerHeight:rect?Math.round(rect.height):null,footerLinkCount:links.length,footerTargetsValid:links.every(r=>r.height>=44),footerLinksOverlap:links.some((a,i)=>links.slice(i+1).some(b=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y))};
   });
   assert(geometry.scrollWidth<=width,`Overflow ${route} @${width}`);assert(geometry.footerTargetsValid&&!geometry.footerLinksOverlap,`Footer collision ${route} @${width}`);
   if(geometry.footerHeight){await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));await page.screenshot({animations:'disabled',path:path.join(output,prefix+'-bottom.png')});}
   pages.push({route,width,...geometry,top:prefix+'-top.png',full:prefix+'-full.png',bottom:geometry.footerHeight?prefix+'-bottom.png':null});
  }
  async function capture(name,locator){const file=`${width}-state-${name}.png`;if(locator){const box=await locator.boundingBox();await page.setViewportSize({width,height:Math.max(1000,Math.ceil(box.height)+250)});await locator.evaluate(el=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,Math.max(0,el.getBoundingClientRect().top+scrollY-200))});await locator.screenshot({animations:'disabled',path:path.join(output,file)});await page.setViewportSize({width,height:1000});}else await page.screenshot({animations:'disabled',path:path.join(output,file)});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`State overflow: ${name}`);states.push({name,width,file});}
  if(width===390){await page.goto(server.url+'/');await page.locator('.menu-toggle').click();assert(await page.locator('#main-nav').isVisible());await capture('menu-open');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');}
  await page.goto(server.url+'/funcionalidades/');const search=page.locator('#feature-search');
  await search.fill('zz-no-result');assert.equal(await page.locator('.feature-card:not([hidden])').count(),0);await capture('search-empty',page.locator('.feature-catalog'));
  await search.fill('');assert(await page.locator('.feature-card:not([hidden])').count()>0);await capture('search-restored',page.locator('.feature-search'));
  await page.goto(server.url+'/solicitar-demo/');
  for(const id of ['business','locations','priority'])await page.locator('#'+id).selectOption({index:1});
  await page.locator('#demo-guide button[type=submit]').click();assert(await page.locator('#guide-result').isVisible());await capture('guide-generated',page.locator('.demo-builder'));
  await page.locator('#priority').selectOption({index:2});assert(!await page.locator('#guide-result').isVisible());await capture('guide-invalidated',page.locator('.demo-builder'));
  await page.locator('#demo-guide button[type=reset]').click();assert.equal(await page.locator('#business').inputValue(),'');await capture('guide-reset',page.locator('.demo-builder'));
  await context.close();
 }
 const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 const html=`<!doctype html><html lang="es"><meta charset="utf-8"><title>Revisión visual local</title><style>body{font:16px system-ui;margin:24px;background:#f4f5f6;color:#2a3139}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}article{background:white;padding:16px;border:1px solid #bbb}img{max-width:100%;height:auto}nav{display:flex;gap:20px;flex-wrap:wrap}h2{font-size:18px}</style><h1>Build local · galería de revisión</h1><p>Base ${esc(buildVersion.commit)}; sourceModified ${buildVersion.sourceModified}. Capturas para revisión humana, sin aprobación de lanzamiento.</p><section>${pages.map(item=>`<article><h2>${esc(item.route)} · ${item.width}px</h2><nav><a href="${item.full}">Página completa</a>${item.bottom?`<a href="${item.bottom}">Pie</a>`:''}</nav><img loading="lazy" src="${item.top}" alt="${esc(item.route)}"></article>`).join('')}${states.map(item=>`<article><h2>${item.name} · ${item.width}px</h2><img loading="lazy" src="${item.file}" alt="${item.name}"></article>`).join('')}</section></html>`;
 await fs.writeFile(path.join(output,'index.html'),html);
 await fs.writeFile(path.join(output,'report.json'),JSON.stringify({scope:'Local screenshot capture and geometry checks, not human approval',buildVersion,pages,states},null,2)+'\n');
 // Contact sheets render screenshot files in HTML; original assets/screenshots stay intact.
 const sheet=await browser.newPage({viewport:{width:1400,height:1000}});
 for(const width of [390,1440]){
  const subset=pages.filter(item=>item.width===width),batch=width===390?9:8;
  for(let start=0;start<subset.length;start+=batch){const items=subset.slice(start,start+batch);const cards=await Promise.all(items.map(async item=>`<article><h2>${esc(item.route)}</h2><img src="data:image/png;base64,${(await fs.readFile(path.join(output,item.top))).toString('base64')}"></article>`));
   await sheet.setContent(`<style>body{margin:16px;font:16px system-ui;background:#ddd}section{display:grid;grid-template-columns:repeat(${width===390?3:2},1fr);gap:16px}h2{font-size:14px;overflow-wrap:anywhere}article{background:white;padding:8px}img{width:100%}</style><h1>${width}px · ${start+1}–${start+items.length}</h1><section>${cards.join('')}</section>`);
   await sheet.screenshot({animations:'disabled',path:path.join(output,`sheet-${width}-${Math.floor(start/batch)+1}.png`),fullPage:true});
  }
 }
 await sheet.close();console.log(`PASS visual capture: ${pages.length} page/viewports, ${states.length} interaction states. Gallery ${output}/index.html`);
}finally{await browser?.close();await server.close();}
