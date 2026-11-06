import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium,expect} from '@playwright/test';
const base=process.env.VISUAL_EDITOR_URL||'http://127.0.0.1:4321';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname),'Only a local development editor may be tested');
const file='content/pages.json',original=await fs.readFile(file,'utf8'),value=JSON.parse(original)['pages-index'].text_002;
let browser;let sourceRestored=false;
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||chromium.executablePath(),args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(base+'/admin/editor/');const frame=page.frameLocator('#ve-preview');
 await frame.locator('[data-visual-field]').first().waitFor();
 const text=frame.getByRole('button',{name:'Editar: '+value,exact:true});await text.click();
 const draft='Una portada editada visualmente';await page.locator('#ve-value').fill(draft);
 await expect(text).toHaveText(draft);assert.equal(await fs.readFile(file,'utf8'),original,'Draft must not write source');
 await page.locator('#ve-cancel').click();await expect(text).toHaveText(value);
 await page.locator('#ve-value').fill(draft);await page.locator('#ve-save').click();
 await expect.poll(async()=>JSON.parse(await fs.readFile(file,'utf8'))['pages-index'].text_002).toBe(draft);
 assert.equal(JSON.parse(await fs.readFile(file,'utf8'))['pages-index'].text_002,draft);
 await frame.getByRole('button',{name:'Editar: '+draft,exact:true}).waitFor();
 await page.locator('#ve-github').click();assert(await page.locator('#ve-confirm').isVisible());assert((await page.locator('#ve-confirm-files').innerText()).includes(file));await page.locator('#ve-confirm-cancel').click();
 // Restore through the real editor API, never commit or push live test changes.
 await frame.getByRole('button',{name:'Editar: '+draft,exact:true}).click();await page.locator('#ve-value').fill(value);await page.locator('#ve-save').click();await expect.poll(async()=>await fs.readFile(file,'utf8')).toBe(original);
 assert.equal(await fs.readFile(file,'utf8'),original);sourceRestored=true;
 await frame.locator('[data-visual-field]').first().waitFor();
 await frame.locator('img.brand-logo').first().click();await page.locator('#ve-image').waitFor();assert(await page.locator('#ve-image option').count()>1);
 const originalImage=await page.locator('#ve-image').inputValue();const replacement=await page.locator('#ve-image option').evaluateAll((items,original)=>items.map(item=>item.value).find(value=>value!==original),originalImage);
 await page.locator('#ve-image').selectOption(replacement);await expect(frame.locator('img.brand-logo').first()).toHaveAttribute('src',replacement);await page.locator('#ve-cancel').click();await expect(frame.locator('img.brand-logo').first()).toHaveAttribute('src',originalImage);
 await page.locator('#ve-width').selectOption('390px');assert.equal(await page.locator('#ve-preview').evaluate(el=>Math.round(el.getBoundingClientRect().width)),390);
 for(const width of [320,390,1440]){await page.setViewportSize({width,height:1000});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Active visual inspector overflow @${width}`);}await frame.locator('img.brand-logo').first().evaluate(async el=>{await el.decode();});await page.screenshot({path:'/tmp/sistematicando-visual-editor.png',fullPage:true});
 assert.deepEqual(errors,[]);await fs.writeFile('docs/qa/visual-editor-report.json',JSON.stringify({scope:'Local Astro development server, real iframe and files, original source restored; no GitHub push',textSelection:true,livePreview:true,cancel:true,validatedSave:true,gitReviewDialog:true,imagePreview:true,mobilePreview:true,sourceRestored:true},null,2)+'\n');
 console.log('PASS real visual editor: click, live text/image preview, cancel, validated file save, Git review, mobile width; source restored, no live commits or pushes.');
}finally{await browser?.close();if(!sourceRestored)await fs.writeFile(file,original);}
