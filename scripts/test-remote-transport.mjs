import assert from 'node:assert/strict';
import {RemoteEditor} from '../src/lib/remote-editor.ts';
let outcome=200,enabled=true;const posts=[];
const fetcher=async(url,options)=>{
 assert.equal(options.credentials,'same-origin');assert.equal(options.cache,'no-store');
 if(url==='/auth/session')return Response.json({authenticated:true,csrf:'csrf-fixture',repository:'manaturaloso/sistematicando-web',branch:'feat/feature-catalog',contentWritesEnabled:enabled});
 if(url==='/editor-api/state')return Response.json({head:'a'.repeat(40),repository:'manaturaloso/sistematicando-web',branch:'feat/feature-catalog',contentWritesEnabled:enabled,documents:{'content/pages.json':{home:{title:'Inicial'}}},media:['/media/logo.png']});
 assert.equal(url,'/editor-api/commit');posts.push(JSON.parse(options.body));assert.equal(options.headers['X-CSRF-Token'],'csrf-fixture');return outcome===200?Response.json({commit:'b'.repeat(40),repository:'manaturaloso/sistematicando-web',branch:'feat/feature-catalog',published:false}):Response.json({error:'Fallo simulado'},{status:outcome});
};
const transport=new RemoteEditor(fetcher);let state=await transport.connect(),record=state.records[0];
state=transport.stage({...record,value:'Nuevo'});assert.equal(posts.length,0);assert.equal(state.records[0].value,'Nuevo');assert.equal(transport.previewRecords[0].value,'Inicial');assert.deepEqual(transport.edits[0].oldValue,'Inicial');
transport.stage({...record,value:'Inicial'});assert.equal(transport.edits.length,0);
transport.stage({...record,value:'Nuevo'});outcome=409;await assert.rejects(()=>transport.commit(),error=>error.status===409);assert.equal(transport.edits[0].value,'Nuevo');assert.equal(transport.exportDraft().baseHead,'a'.repeat(40));assert(!JSON.stringify(transport.exportDraft()).includes('csrf-fixture'));
outcome=401;await assert.rejects(()=>transport.commit(),error=>error.status===401);assert.equal(transport.writesEnabled,false);assert.equal(transport.edits.length,1);
await transport.connect();transport.stage({...record,value:'Nuevo'});outcome=200;state=await transport.commit();assert.equal(state.head,'b'.repeat(40));assert.equal(state.pending.length,0);assert.equal(transport.needsBuild,true);assert.equal(posts.at(-1).baseHead,'a'.repeat(40));assert.equal(posts.at(-1).edits[0].oldValue,'Inicial');await assert.rejects(async()=>transport.stage({...state.records[0],value:'Más'}),error=>error.status===409);
await transport.connect();transport.stage({...record,value:'Conservar'});const backup=transport.exportDraft();transport.discardDraft();transport.restoreDraft(backup);assert.equal(transport.edits[0].value,'Conservar');assert.throws(()=>transport.restoreDraft({...backup,baseHead:'f'.repeat(40)}));assert.equal(transport.edits[0].value,'Conservar');assert.throws(()=>transport.restoreDraft({...backup,edits:[{...backup.edits[0],path:['__proto__']}]}));assert.equal(transport.edits[0].value,'Conservar');
enabled=false;await transport.connect();record=transport.state().records[0];transport.stage({...record,value:'Revisión'});const count=posts.length;await assert.rejects(()=>transport.commit(),error=>error.status===503);assert.equal(posts.length,count);
console.log('PASS remote transport: stage/revert, original values, explicit commit, preserved draft on conflict/session loss, credential-free export, rebuild lock and disabled writes.');
