import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {readBuildVersion} from '../src/lib/build-version.ts';
import {previewServer} from './lib/preview-server.mjs';
const fixture=await fs.mkdtemp(path.join(os.tmpdir(),'sistematicando-version-'));
const git=(...args)=>execFileSync('git',['-C',fixture,...args],{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
try{
 assert.deepEqual(readBuildVersion(fixture),{schemaVersion:1,commit:null,commitDate:null,sourceModified:null});
 git('init');await fs.mkdir(path.join(fixture,'src'));await fs.writeFile(path.join(fixture,'src/page.txt'),'original');git('add','src');git('-c','user.name=Joel Alejandro Yañez Caballero','-c','user.email=joel.yc23@gmail.com','commit','-m','version test fixture');
 const clean=readBuildVersion(fixture);assert.equal(clean.commit,git('rev-parse','HEAD'));assert.equal(clean.sourceModified,false);assert(!Number.isNaN(Date.parse(clean.commitDate)));
 await fs.writeFile(path.join(fixture,'review.md'),'documentation');assert.equal(readBuildVersion(fixture).sourceModified,false);
 await fs.writeFile(path.join(fixture,'src/page.txt'),'changed');assert.equal(readBuildVersion(fixture).sourceModified,true);
}finally{await fs.rm(fixture,{recursive:true,force:true});}
const server=await previewServer();
try{
 const response=await fetch(server.url+'/version.json');assert.equal(response.status,200);assert(response.headers.get('content-type').includes('application/json'));
 const actual=await response.json(),expected=readBuildVersion();
 assert.deepEqual(actual,expected,'Stale build version: rebuild after committing source');
 assert.deepEqual(Object.keys(actual).sort(),['schemaVersion','commit','commitDate','sourceModified'].sort());
 const admin=await (await fetch(server.url+'/admin/')).text();assert(admin.includes('href="/version.json"'));
 if(actual.commit)assert(admin.includes(`/commit/${actual.commit}`));
 console.log('PASS build provenance: clean/modified/no-Git cases; JSON and admin match current source checkout.');
}finally{await server.close();}
