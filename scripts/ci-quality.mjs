import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import {chromium} from '@playwright/test';
// CI installs Playwright's browser; local runs may select the system browser.
const env={...process.env,CHROMIUM_PATH:process.env.CHROMIUM_PATH||chromium.executablePath()};
for(const file of ['docs/qa/site-report.json','docs/qa/accessibility-report.json','docs/qa/brand-report.json'])fs.rmSync(file,{force:true});
for(const script of ['scripts/verify-site.mjs','scripts/verify-navigation.mjs','scripts/verify-brand.mjs','scripts/verify-editorial.mjs','scripts/audit-accessibility.mjs']){
 const result=spawnSync(process.execPath,[script],{stdio:'inherit',env});
 if(result.error)throw result.error;
 if(result.status!==0)process.exit(result.status??1);
}
