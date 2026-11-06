import fs from 'node:fs';
import path from 'node:path';
import {validateContent} from '../src/lib/content-validation.mjs';
const config=JSON.parse(fs.readFileSync('.pages.yml','utf8'));
const documents=Object.fromEntries([...new Set(config.content.map(entry=>entry.path))].map(file=>[file,JSON.parse(fs.readFileSync(file,'utf8'))]));
const media=new Set(),site=documents['content/site.json'];
for(const key of ['logoLight','logoDark','favicon']){
 if(!site[key])continue;
 const file=path.resolve('public','.'+site[key]),root=fs.realpathSync('public/media')+path.sep;
 if(file.startsWith(path.resolve('public/media')+path.sep)&&fs.existsSync(file)&&fs.lstatSync(file).isFile()&&fs.realpathSync(file).startsWith(root))media.add(site[key]);
}
const result=validateContent({documents,config,media});
console.log(`Content valid: ${result.modules} modules, ${result.guides} guides, ${result.editors} CMS editors.`);
