import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import {chromium} from '@playwright/test';
// CI installs Playwright's browser; local runs may select the system browser.
const env={...process.env,CHROMIUM_PATH:process.env.CHROMIUM_PATH||chromium.executablePath()};
for(const file of ['docs/qa/site-report.json','docs/qa/accessibility-report.json','docs/qa/brand-report.json','docs/qa/modules-report.json','docs/qa/resources-report.json','docs/qa/legal-report.json','docs/qa/release-report.json','docs/RELEASE_CHECKLIST.md','docs/qa/release-guards-report.json','docs/qa/compatibility-report.json','docs/qa/pricing-report.json'])fs.rmSync(file,{force:true});
for(const script of ['scripts/verify-site.mjs','scripts/verify-navigation.mjs','scripts/verify-brand.mjs','scripts/verify-editorial.mjs','scripts/verify-modules.mjs','scripts/verify-resources.mjs','scripts/verify-version.mjs','scripts/verify-legal.mjs','scripts/verify-pricing.mjs','scripts/verify-compatibility.mjs','scripts/audit-accessibility.mjs','scripts/audit-release.mjs','scripts/verify-release-evidence.mjs']){
 const result=spawnSync(process.execPath,[script],{stdio:'inherit',env});
 if(result.error)throw result.error;
 if(result.status!==0)process.exit(result.status??1);
}
