import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {previewServer} from './lib/preview-server.mjs';
const run=promisify(execFile),server=await previewServer();
const results=[];
try{
 for(const route of ['/','/funcionalidades/','/solicitar-demo/']){
  const report=path.join(os.tmpdir(),`sistematicando-lighthouse-${route.replaceAll('/','')||'home'}.json`);
  await run(process.execPath,['node_modules/lighthouse/cli/index.js',server.url+route,'--quiet','--output=json',`--output-path=${report}`,'--only-categories=performance,accessibility,best-practices,seo','--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage'],{env:{...process.env,CHROME_PATH:process.env.CHROMIUM_PATH||process.env.CHROME_PATH||'/usr/bin/chromium'},maxBuffer:5*1024*1024,timeout:120000});
  const lhr=JSON.parse(await fs.readFile(report,'utf8'));
  if(lhr.runtimeError)throw new Error(JSON.stringify(lhr.runtimeError));
  const metrics=Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(key=>[key,{value:lhr.audits[key].numericValue,unit:lhr.audits[key].numericUnit}]));
  const scores=Object.fromEntries(Object.entries(lhr.categories).map(([key,value])=>[key,Math.round(value.score*100)]));
  const findings=Object.values(lhr.audits).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,score:a.score,displayValue:a.displayValue}));
  results.push({route,scores,metrics,findings,warnings:lhr.runWarnings,lighthouseVersion:lhr.lighthouseVersion,formFactor:lhr.configSettings.formFactor,throttlingMethod:lhr.configSettings.throttlingMethod});
  console.log(route,JSON.stringify(scores));
 }
 await fs.mkdir('docs/qa',{recursive:true});
 await fs.writeFile('docs/qa/performance-report.json',JSON.stringify({environment:'Local static server; Lighthouse simulated mobile; no field/Core Web Vitals claim. noindex is deliberate.',results},null,2)+'\n');
}finally{await server.close();}
