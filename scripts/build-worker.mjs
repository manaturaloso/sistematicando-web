import {spawnSync} from 'node:child_process';
// Wrangler invokes this before serving or packaging assets. Never deploys.
const result=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['run','build'],{
  stdio:'inherit',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'},
});
if(result.error)throw result.error;
process.exit(result.status??1);
