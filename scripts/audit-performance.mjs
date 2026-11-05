import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {previewServer} from './lib/preview-server.mjs';
const read=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const [features,articles,buildVersion]=await Promise.all([read('content/features.json'),read('content/articles.json'),read('dist/version.json')]);
assert(features.items.length&&articles.items.length,'Module and article samples require existing content');
const routes=['/','/funcionalidades/','/solicitar-demo/',`/funcionalidades/${features.items[0].id}/`,`/blog/${articles.items[0].slug}/`];
const option=name=>process.argv.find(arg=>arg.startsWith(name+'='))?.slice(name.length+1);
const requestedRoute=option('--route'),runs=Number(option('--runs')||1),requestedOutput=option('--output');
assert(Number.isInteger(runs)&&runs>=1&&runs<=3,'Use --runs=1, 2 or 3');
if(requestedRoute)assert(routes.includes(requestedRoute),'Select a route from the five configured samples');
if(requestedOutput)assert(path.resolve(requestedOutput).startsWith('/tmp/')&&requestedOutput.endsWith('.json'),'Custom output must be a JSON file under /tmp');
const selectedRoutes=requestedRoute?[requestedRoute]:routes;
const run=promisify(execFile);
const rawDirectory=await fs.mkdtemp(path.join(os.tmpdir(),'sistematicando-lighthouse-'));
const output=requestedOutput?path.resolve(requestedOutput):'docs/qa/performance-report.json';
const results=[];
await fs.rm(output,{force:true});
const server=await previewServer();
try{
 for(const route of selectedRoutes)for(let sample=1;sample<=runs;sample++){
  const response=await fetch(server.url+route);assert.equal(response.status,200,route);
  const report=path.join(rawDirectory,`${route.replaceAll('/','-')||'home'}-${sample}.json`);
  console.log(`Measuring ${route} (${sample}/${runs})`);
  await run(process.execPath,['node_modules/lighthouse/cli/index.js',server.url+route,'--quiet','--output=json',`--output-path=${report}`,'--form-factor=mobile','--only-categories=performance,accessibility,best-practices,seo','--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage'],{env:{...process.env,CHROME_PATH:process.env.CHROMIUM_PATH||process.env.CHROME_PATH||'/usr/bin/chromium'},maxBuffer:5*1024*1024,timeout:120000});
  const lhr=await read(report);
  if(lhr.runtimeError)throw new Error(JSON.stringify(lhr.runtimeError));
  const metrics=Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index','total-byte-weight'].map(key=>{
   const audit=lhr.audits[key];assert(Number.isFinite(audit.numericValue),`Missing metric ${key}: ${route}`);return [key,{value:audit.numericValue,unit:audit.numericUnit}];
  }));
  const scores=Object.fromEntries(Object.entries(lhr.categories).map(([key,value])=>{assert(Number.isFinite(value.score),`Missing score ${key}: ${route}`);return [key,Math.round(value.score*100)];}));
  const findings=Object.values(lhr.audits).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,score:a.score,displayValue:a.displayValue}));
  const labReview=[];
  if(metrics['largest-contentful-paint'].value>2500)labReview.push('LCP > 2500 ms');
  if(metrics['total-blocking-time'].value>200)labReview.push('TBT > 200 ms');
  if(metrics['cumulative-layout-shift'].value>.1)labReview.push('CLS > 0.1');
  results.push({route,sample,scores,metrics,findings,labReview,warnings:lhr.runWarnings,lighthouseVersion:lhr.lighthouseVersion,fetchTime:lhr.fetchTime,formFactor:lhr.configSettings.formFactor,throttlingMethod:lhr.configSettings.throttlingMethod,throttling:lhr.configSettings.throttling});
  console.log(route,JSON.stringify(scores),`LCP ${Math.round(metrics['largest-contentful-paint'].value)}ms; TBT ${metrics['total-blocking-time'].value}ms; CLS ${metrics['cumulative-layout-shift'].value}`);
 }
 await fs.mkdir(path.dirname(output),{recursive:true});
 await fs.writeFile(output,JSON.stringify({schemaVersion:1,buildVersion,runsPerRoute:runs,environment:'Local static server; Lighthouse simulated mobile; sequential runs, no concurrent browser work. Not field/Core Web Vitals data or full WCAG certification. noindex is deliberate.',sampleSelection:'Home, catalog, demo, first existing module and first existing editorial article; not an audit of every generated page.',rawDirectory,rawFilesTemporary:true,labReferenceBudgets:{lcpMs:2500,tbtMs:200,cls:.1,scope:'Review references for this local sample, not production acceptance or launch authorization'},results},null,2)+'\n');
 console.log(`Saved ${results.length} route measurements. Full Lighthouse JSON: ${rawDirectory}`);
}finally{await server.close();}
