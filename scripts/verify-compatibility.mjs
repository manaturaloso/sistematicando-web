import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {chromium,firefox,webkit} from '@playwright/test';
import {previewServer} from './lib/preview-server.mjs';
const read=async path=>JSON.parse(await fs.readFile(path,'utf8'));
const [features,pages,buildVersion]=await Promise.all([read('content/features.json'),read('content/pages.json'),read('dist/version.json')]);
const required=new Set((process.env.COMPAT_REQUIRED_ENGINES||'chromium').split(',').map(value=>value.trim()));
const engines=[chromium,firefox,webkit];
assert([...required].every(name=>engines.some(engine=>engine.name()===name)),'Unknown required engine');
const server=await previewServer(),results=[];let failed=false;
try{
 for(const engine of engines){
  const name=engine.name(),configured=process.env[`${name.toUpperCase()}_PATH`];
  const executablePath=configured||(name==='chromium'&&existsSync('/usr/bin/chromium')?'/usr/bin/chromium':engine.executablePath());
  const entry={engine:name,required:required.has(name),status:'unavailable',version:null,cases:[]};results.push(entry);
  if(!existsSync(executablePath)){entry.reason='Browser executable is not installed; no compatibility claim';if(entry.required)failed=true;console.log(`UNAVAILABLE ${name}${entry.required?' (required)':''}`);continue;}
  let browser;
  try{browser=await engine.launch({executablePath,args:name==='chromium'?['--no-sandbox']:[]});entry.version=browser.version();entry.status='passed';}
  catch(error){entry.status='launch-failed';entry.reason=String(error.message);if(entry.required)failed=true;console.log(`LAUNCH FAILED ${name}`);continue;}
  try{
   for(const reducedMotion of ['no-preference','reduce'])for(const width of [390,1440]){
    const result={width,reducedMotion,javaScriptEnabled:true,status:'failed'};entry.cases.push(result);
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion,acceptDownloads:true});
    const external=[];
    await context.route('**/*',route=>{if(new URL(route.request().url()).origin!==server.url){external.push(route.request().url());return route.abort();}return route.continue();});
    const page=await context.newPage();page.setDefaultTimeout(10000);const errors=[];page.on('pageerror',error=>errors.push(String(error)));
    try{
     const goto=async route=>{assert.equal((await page.goto(server.url+route)).status(),200);await page.evaluate(()=>document.fonts.ready);};
     await goto('/');assert.equal(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),reducedMotion==='reduce');
     await page.keyboard.press('Tab');assert(await page.locator('.skip-link').evaluate(el=>el===document.activeElement));await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'contenido');
     if(width===390){const toggle=page.locator('.menu-toggle');await toggle.focus();await page.keyboard.press('Enter');assert.equal(await toggle.getAttribute('aria-expanded'),'true');await page.keyboard.press('Tab');assert(await page.locator('#main-nav a').first().evaluate(el=>el===document.activeElement));await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert(await toggle.evaluate(el=>el===document.activeElement));}
     else assert(await page.locator('#main-nav').isVisible());
     const faq=page.locator('details').first();await faq.locator('summary').focus();await page.keyboard.press('Enter');assert(await faq.getAttribute('open')!==null);assert(await faq.locator('p').isVisible());
     if(reducedMotion==='reduce'){
      assert.equal(await faq.locator('p').evaluate(el=>getComputedStyle(el).animationName),'none');
      assert(await page.locator('main .button').first().evaluate(el=>getComputedStyle(el).transitionDuration.split(',').every(value=>parseFloat(value)===0)));
     }
     await goto('/funcionalidades/');const input=page.locator('#feature-search');
     await input.fill(features.items[0].name);assert(await page.locator('.feature-card:not([hidden])').count()>0);
     await input.fill('zz-no-result');assert.equal(await page.locator('.feature-card:not([hidden])').count(),0);assert(await page.locator('.search-empty').isVisible());
     const jump=page.locator('.feature-jumps a').first(),hash=await jump.getAttribute('href');await jump.focus();await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,hash);assert.equal(await page.locator('.feature-card:not([hidden])').count(),features.items.length);
     await goto('/solicitar-demo/');const form=page.locator('#demo-guide'),submit=form.locator('button[type=submit]');
     await submit.focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'business');assert(!await page.locator('#guide-result').isVisible());
     for(const id of ['business','locations','priority'])await page.locator('#'+id).selectOption({index:1});
     const sales=await page.locator('.whatsapp-link').getAttribute('href');await submit.click();assert(await page.locator('#guide-result').isVisible());assert.equal(await page.evaluate(()=>document.activeElement.id),'result-title');
     const expected=await page.locator('#guide-text').textContent();assert(expected.includes(pages['pages-solicitar-demo-index'].guide.disclaimer));
     const downloadPromise=page.waitForEvent('download');await page.locator('#download-guide').click();const download=await downloadPromise;assert.equal(download.suggestedFilename(),'sistematicando-guia-demo.txt');assert.equal(await fs.readFile(await download.path(),'utf8'),expected);
     assert.equal(await page.locator('.whatsapp-link').getAttribute('href'),sales);
     await page.locator('#priority').selectOption({index:2});assert(!await page.locator('#guide-result').isVisible());assert.equal(await page.locator('#guide-text').textContent(),'');
     await form.locator('button[type=reset]').click();assert.equal(await page.locator('#business').inputValue(),'');assert.equal(await page.evaluate(()=>document.activeElement.id),'business');
     assert.deepEqual(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length})),{local:0,session:0});assert.equal(external.length,0);assert.equal(errors.length,0,JSON.stringify(errors));
     assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
     result.status='passed';result.checks=['skip/menu keyboard and Escape','native FAQ','reduced-motion animation/transition when selected','search result/empty/area recovery','guide validation/focus/TXT/invalidation/reset','no external messages or persistent storage'];
     console.log(`PASS ${name} ${width}px ${reducedMotion}`);
    }catch(error){result.error=String(error.message);entry.status='failed';failed=true;console.error(`FAIL ${name} ${width}px ${reducedMotion}: ${result.error}`);}
    finally{await context.close();}
   }
   const context=await browser.newContext({viewport:{width:390,height:1000},javaScriptEnabled:false,reducedMotion:'reduce'}),page=await context.newPage();
   const result={width:390,reducedMotion:'reduce',javaScriptEnabled:false,status:'failed'};entry.cases.push(result);
   try{
    await page.goto(server.url+'/');assert(await page.locator('#main-nav').isVisible());assert(!await page.locator('.menu-toggle').isVisible());
    await page.goto(server.url+'/funcionalidades/');assert(!await page.locator('.feature-search').isVisible());assert.equal(await page.locator('.feature-card:not([hidden])').count(),features.items.length);
    await page.goto(server.url+'/solicitar-demo/');assert(!await page.locator('.demo-builder').isVisible());assert(await page.locator('.whatsapp-link').isVisible());result.status='passed';result.checks=['visible navigation without JavaScript','all catalog cards available','interactive guide hidden; voluntary contact available'];console.log(`PASS ${name} no-JS fallback`);
   }catch(error){result.error=String(error.message);entry.status='failed';failed=true;console.error(`FAIL ${name} no-JS: ${result.error}`);}
   finally{await context.close();}
  }finally{await browser.close();}
 }
 const report={schemaVersion:1,buildVersion,scope:'Local automation of three flows; desktop engines and resized viewports, not physical devices, Safari/Chrome/Firefox release certification or screen-reader review',requiredEngines:[...required],allRequiredPassed:[...required].every(name=>results.find(entry=>entry.engine===name)?.status==='passed'),allEnginesTested:results.every(entry=>entry.status==='passed'),results};
 await fs.writeFile('docs/qa/compatibility-report.json',JSON.stringify(report,null,2)+'\n');
 if(failed)process.exitCode=1;
}finally{await server.close();}
