import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from '@playwright/test';
import {previewServer} from './lib/preview-server.mjs';
const site=JSON.parse(await fs.readFile('content/site.json','utf8'));
const server=await previewServer();let browser;
const report={source:'Configured CMS assets and build-generated delivery; local static build',assets:[],viewports:[],deliveries:[]};
try{
 for(const key of ['logoLight','logoDark','favicon']){
  if(!site[key])continue;
  const response=await fetch(server.url+site[key]);assert.equal(response.status,200,site[key]);
  const actual=Buffer.from(await response.arrayBuffer()),original=await fs.readFile('public'+site[key]);
  const hash=bytes=>createHash('sha256').update(bytes).digest('hex');assert.equal(hash(actual),hash(original));
  report.assets.push({key,path:site[key],bytes:original.length,sha256:hash(original)});
 }
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 for(const dpr of [1,2]){
  const context=await browser.newContext({deviceScaleFactor:dpr}),page=await context.newPage();
  for(const width of [320,390,768,900,1024,1440]){
   await page.setViewportSize({width,height:1000});await page.goto(server.url);await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('.brand-link').count(),2);
   assert.equal(await page.locator('link[rel=icon]').getAttribute('href'),site.favicon||'data:,');
   for(const [location,selector,key] of [['header','header .brand-link','logoLight'],['footer','footer .brand-link',site.darkFooter?'logoDark':'logoLight']]){
    const link=page.locator(selector),image=link.locator('img');
    assert.equal(await image.count(),site[key]?1:0,`${location}: image selection differs from CMS`);
    if(!site[key]){assert((await link.innerText()).includes(site.name));continue;}
    await image.evaluate(async el=>{el.loading='eager';await el.decode()});
    const dimensions=await image.evaluate(el=>({naturalWidth:el.naturalWidth,naturalHeight:el.naturalHeight,width:el.width,height:el.height,currentSrc:el.currentSrc,srcset:el.srcset,fit:getComputedStyle(el).objectFit}));
    const intrinsic=await page.evaluate(async src=>{const image=new Image();image.src=src;await image.decode();return {width:image.naturalWidth,height:image.naturalHeight};},site[key]);
    assert(dimensions.naturalWidth>0&&dimensions.naturalWidth<=intrinsic.width);
    assert(Math.abs(dimensions.naturalHeight-dimensions.naturalWidth*intrinsic.height/intrinsic.width)<=1,'Logo aspect ratio changed');
    const delivered=await fetch(dimensions.currentSrc);assert.equal(delivered.status,200);
    const bytes=(await delivered.arrayBuffer()).byteLength,original=report.assets.find(asset=>asset.key===key);
    if(/\.(png|jpe?g|webp)$/.test(site[key])&&intrinsic.width>768){
     assert(dimensions.srcset&&new URL(dimensions.currentSrc).pathname.startsWith('/_astro/'),'Responsive derivative was not selected');
     if(original.bytes>100000)assert(bytes<original.bytes,'Large logo transfer should be reduced');
    }
    report.deliveries.push({width,dpr,location,key,path:new URL(dimensions.currentSrc).pathname,naturalWidth:dimensions.naturalWidth,bytes,originalBytes:original.bytes});
    assert.equal(dimensions.fit,'contain');assert(dimensions.width>0&&dimensions.height>0);
   }
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),width);
   if(dpr===1&&(width===390||width===1440)){await fs.mkdir('/tmp/sistematicando-qa',{recursive:true});await page.screenshot({path:`/tmp/sistematicando-qa/official-brand-${width}.png`});}
   report.viewports.push({width,dpr,headerAndFooterLoaded:true});
  }
  await page.goto(server.url+'/admin/');assert(await page.getByRole('link',{name:'Abrir el CMS con GitHub'}).isVisible());
  await context.close();
 }
 await fs.mkdir('docs/qa',{recursive:true});await fs.writeFile('docs/qa/brand-report.json',JSON.stringify(report,null,2)+'\n');
 console.log('PASS CMS branding: original hashes, configured variants/fallbacks, six widths at DPR 1/2 and image delivery.');
}finally{await browser?.close();await server.close();}
