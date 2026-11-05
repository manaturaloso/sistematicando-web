import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const paths=['docs/qa/site-report.json','docs/qa/accessibility-report.json'];
const originals=await Promise.all(paths.map(path=>fs.readFile(path,'utf8')));
const output=await fs.readFile('docs/qa/release-report.json','utf8');
const cases=[
 {name:'stale-build',file:0,edit:report=>{report.buildVersion.commit='0'.repeat(40);},message:'Site evidence differs'},
 {name:'missing-route',file:0,edit:report=>{report.routes.pop();},message:'does not cover current routes'},
 {name:'accessibility-failure',file:1,edit:report=>{report.results[0].violations.push({id:'simulated-test-failure'});},message:'Accessibility failures remain'}
];
try{
 for(const test of cases){
  const report=JSON.parse(originals[test.file]);test.edit(report);await fs.writeFile(paths[test.file],JSON.stringify(report));
  const result=spawnSync(process.execPath,['scripts/audit-release.mjs'],{encoding:'utf8'});
  assert.equal(result.status,1,test.name);assert((result.stderr??'').includes(test.message),test.name);
  assert.equal(await fs.readFile('docs/qa/release-report.json','utf8'),output,'A failed audit must not replace passing evidence');
  await fs.writeFile(paths[test.file],originals[test.file]);
 }
}finally{await Promise.all(paths.map((path,index)=>fs.writeFile(path,originals[index])));}
await fs.writeFile('docs/qa/release-guards-report.json',JSON.stringify({scope:'Negative evidence controls; temporary report edits restored',cases:cases.map(test=>({name:test.name,rejected:true,previousOutputPreserved:true}))},null,2)+'\n');
console.log('PASS release guards: stale build, missing route and accessibility failure rejected; original reports restored.');
