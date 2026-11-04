import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
export async function previewServer() {
  const root=path.resolve('dist');
  const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.ttf':'font/ttf','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.txt':'text/plain'};
  const server=http.createServer(async(req,res)=>{
    try {
      let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
      if(pathname.endsWith('/'))pathname+='index.html';
      let file=path.resolve(root,'.'+pathname);
      if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
      let status=200;
      try{if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');}
      catch{file=path.join(root,'404.html');status=404;}
      const body=await fs.readFile(file);
      res.writeHead(status,{'Content-Type':types[path.extname(file)]??'application/octet-stream','Cache-Control':'no-store'});res.end(body);
    }catch{res.writeHead(500);res.end('Preview server error');}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  return {url:`http://127.0.0.1:${server.address().port}`,close:()=>new Promise(resolve=>server.close(resolve))};
}
export async function builtRoutes(directory='dist') {
  const routes=[];
  async function walk(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())await walk(file);else if(entry.name.endsWith('.html')){const relative=path.relative('dist',file).split(path.sep).join('/');routes.push('/'+relative.replace(/index\.html$/,''));}}}
  await walk(directory);return routes.sort();
}
