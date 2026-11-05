import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {previewServer,builtRoutes} from './lib/preview-server.mjs';
const server=await previewServer();
let browser;
const results=[];
function logViolations(analysis) {
 for(const violation of analysis.violations){
  console.error(`AXE ${violation.id} (${violation.impact}): ${violation.helpUrl}`);
  for(const node of violation.nodes)console.error(JSON.stringify({target:node.target,summary:node.failureSummary}));
 }
}
async function expandedFaq(page, freezeAnimation=false) {
 await page.locator('.menu-toggle').click();
 await page.locator('details').evaluateAll((els,freeze)=>{
  els.forEach(el=>el.open=true);
  if(freeze)for(const el of els)for(const animation of el.getAnimations({subtree:true})){
   animation.pause();animation.currentTime=Number(animation.effect.getTiming().duration)*.25;
  }
 },freezeAnimation);
}

try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:1000}});
  for(const route of await builtRoutes()){
   const page=await context.newPage();const response=await page.goto(server.url+route);assert.equal(response.status(),200,`Cannot audit failed route: ${route}`);await page.evaluate(()=>document.fonts.ready);
   const analysis=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
   results.push({route,width,passes:analysis.passes.length,incomplete:analysis.incomplete.map(item=>({id:item.id,nodes:item.nodes.length})),violations:analysis.violations.map(item=>({id:item.id,impact:item.impact,description:item.description,helpUrl:item.helpUrl,nodes:item.nodes.map(node=>({target:node.target,summary:node.failureSummary}))}))});
   logViolations(analysis);
   console.log(`${route} @${width}: ${analysis.violations.length} violations`);
   await page.close();
  }
  await context.close();
 }
 const states=[
  {route:'/',state:'expanded-faq-animation-quarter',prepare:page=>expandedFaq(page,true)},
  {route:'/',state:'expanded-menu-and-faq',prepare:page=>expandedFaq(page)},
  {route:'/solicitar-demo/',state:'generated-guide',prepare:async page=>{for(const id of ['business','locations','priority'])await page.locator('#'+id).selectOption({index:1});await page.locator('#demo-guide button[type=submit]').click();}},
  {route:'/funcionalidades/',state:'empty-search',prepare:async page=>{await page.getByRole('searchbox').fill('zz-no-result');}},
 ];
 const interactive=await browser.newContext({viewport:{width:390,height:1000},reducedMotion:'no-preference'});
 for(const state of states){
  const page=await interactive.newPage();await page.goto(server.url+state.route);await state.prepare(page);
  const analysis=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
  results.push({route:state.route,state:state.state,width:390,passes:analysis.passes.length,incomplete:analysis.incomplete.map(item=>({id:item.id,nodes:item.nodes.length})),violations:analysis.violations.map(item=>({id:item.id,impact:item.impact,nodes:item.nodes.map(node=>({target:node.target,summary:node.failureSummary}))}))});
  logViolations(analysis);
  console.log(`${state.route} ${state.state}: ${analysis.violations.length} violations`);await page.close();
 }
 await interactive.close();
 await fs.mkdir('docs/qa',{recursive:true});
 await fs.writeFile('docs/qa/accessibility-report.json',JSON.stringify({tool:'axe-core via @axe-core/playwright',environment:'Local static build; Chromium; not a full WCAG audit',results},null,2)+'\n');
 const violations=results.reduce((total,item)=>total+item.violations.length,0);
 console.log(`SUMMARY ${results.length} page/viewport checks, ${violations} rule violations.`);
 if(violations)process.exitCode=1;
}finally{await browser?.close();await server.close();}
