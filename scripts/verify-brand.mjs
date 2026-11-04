import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from '@playwright/test';
import {previewServer} from './lib/preview-server.mjs';
const site=JSON.parse(await fs.readFile('content/site.json','utf8'));
assert(site.logoLight&&site.logoDark&&site.favicon,'Select the official assets in the CMS first');
const server=await previewServer();let browser;
const report={source:'CMS-selected original assets; local static build',assets:[],viewports:[]};
try{
 for(const key of ['logoLight','logoDark','favicon']){
  const response=await fetch(server.url+site[key]);assert.equal(response.status,200,site[key]);
  const actual=Buffer.from(await response.arrayBuffer()),original=await fs.readFile('public'+site[key]);
  const hash=bytes=>createHash('sha256').update(bytes).digest('hex');assert.equal(hash(actual),hash(original));
  report.assets.push({key,path:site[key],bytes:original.length,sha256:hash(original)});
 }
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext(),page=await context.newPage();
 for(const width of [320,390,768,900,1024,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(server.url);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.brand-logo').count(),2);
  assert.equal(await page.locator('link[rel=icon]').getAttribute('href'),site.favicon);
  for(const image of await page.locator('.brand-logo').all()){
   await image.evaluate(async el=>{el.loading='eager';await el.decode()});
   const dimensions=await image.evaluate(el=>({naturalWidth:el.naturalWidth,naturalHeight:el.naturalHeight,width:el.width,height:el.height,fit:getComputedStyle(el).objectFit}));
   assert.equal(dimensions.naturalWidth,site.logoWidth);assert.equal(dimensions.naturalHeight,site.logoHeight);
   assert.equal(dimensions.fit,'contain');assert(dimensions.width>0&&dimensions.height>0);
  }
  assert.equal(await page.locator('.project-caption').count(),0,'Placeholder still visible');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),width);
  if(width===390||width===1440){await fs.mkdir('/tmp/sistematicando-qa',{recursive:true});await page.screenshot({path:`/tmp/sistematicando-qa/official-brand-${width}.png`});}
  report.viewports.push({width,headerAndFooterLoaded:true,placeholderRemoved:true});
 }
 await page.goto(server.url+'/admin/');assert(await page.getByRole('link',{name:'Abrir el CMS con GitHub'}).isVisible());
 await fs.mkdir('docs/qa',{recursive:true});await fs.writeFile('docs/qa/brand-report.json',JSON.stringify(report,null,2)+'\n');
 console.log('PASS official CMS assets: identical bytes, six widths, header/footer, favicon and no placeholder.');
}finally{await browser?.close();await server.close();}
