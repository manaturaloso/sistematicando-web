import {spawnSync} from 'node:child_process';
// Isolated output: never overwrite the public site's dist or enable hosted mode there.
const checked=spawnSync(process.execPath,['scripts/validate-content.mjs'],{stdio:'inherit'});if(checked.status!==0)process.exit(checked.status??1);
const result=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build','--outDir','.editor-dist'],{stdio:'inherit',env:{...process.env,PUBLIC_VISUAL_EDITOR_MODE:'hosted',ASTRO_TELEMETRY_DISABLED:'1'}});
if(result.error)throw result.error;process.exitCode=result.status??1;
