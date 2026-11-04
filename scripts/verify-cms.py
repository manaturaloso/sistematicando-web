"""Exercise structured edits and logo rendering, restoring all original content."""
from pathlib import Path
from urllib.parse import unquote, urlparse
import json, os, subprocess
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
files=[root/'content/site.json',root/'content/pages.json',root/'content/faqs.json']
backups={file:file.read_bytes() for file in files}
fixture=root/'public/media/cms-test-only.svg'
fixture.parent.mkdir(parents=True,exist_ok=True)
assert not fixture.exists(), 'Do not overwrite a pre-existing asset'
def build():
 result=subprocess.run(['npm','run','build'],cwd=root,env={**os.environ,'ASTRO_TELEMETRY_DISABLED':'1'},capture_output=True,text=True)
 assert result.returncode==0,result.stdout+result.stderr
try:
 site=json.loads(files[0].read_text());site['logoLight']='/media/cms-test-only.svg';site['logoDark']='/media/cms-test-only.svg';site['darkFooter']=True;site['favicon']='/media/cms-test-only.svg';site['logoAlt']='CMS test asset (not official logo)'
 files[0].write_text(json.dumps(site,ensure_ascii=False,indent=2)+'\n')
 pages=json.loads(files[1].read_text());pages['pages-index']['text_002']='Prueba editorial CMS'
 files[1].write_text(json.dumps(pages,ensure_ascii=False,indent=2)+'\n')
 faqs=json.loads(files[2].read_text());faqs['items'][0]['answer']='Respuesta de prueba del CMS compartida.'
 files[2].write_text(json.dumps(faqs,ensure_ascii=False,indent=2)+'\n')
 fixture.write_text('<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="516"><rect width="2048" height="516" fill="#2a3139"/><text x="100" y="300" font-size="100" fill="white">CMS TEST ONLY</text></svg>')
 build()
 with sync_playwright() as p:
  browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  page=browser.new_page()
  page.goto('http://127.0.0.1:4322/')
  assert 'Prueba editorial CMS' in page.locator('h1').inner_text()
  assert page.locator('.brand-logo').count()==2
  assert page.locator('.dark-footer').count()==1
  assert page.locator('link[rel=icon]').get_attribute('href')=='/media/cms-test-only.svg'
  page.wait_for_function('document.querySelector(".brand-logo").naturalWidth > 0')
  assert page.locator('.brand-logo').first.get_attribute('alt')=='CMS test asset (not official logo)'
  assert page.locator('details[data-faq="que-es"] p').text_content()=='Respuesta de prueba del CMS compartida.'
  page.goto('http://127.0.0.1:4322/preguntas-frecuentes/')
  assert page.locator('details[data-faq="que-es"] p').text_content()=='Respuesta de prueba del CMS compartida.'
  for width in [320,390,768,900,1024,1440]:
   page.set_viewport_size({'width':width,'height':1000})
   page.goto('http://127.0.0.1:4322/admin/')
   assert page.locator('h1').count()==1
   assert page.locator('meta[name=robots]').get_attribute('content')=='noindex, nofollow'
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
   for href in page.locator('a[href^="https://"]').evaluate_all('(els)=>els.map(e=>e.href)'):
    url=urlparse(href);assert url.hostname=='app.pagescms.org'
    assert '/manaturaloso/sistematicando-web/feat/feature-catalog' in unquote(url.path)
   assert page.locator('input[type=password]').count()==0
   print('PASS admin',width,'layout, external CMS links, no local credentials')
  browser.close()
 print('PASS edited copy and shared FAQ rendered; uploaded test asset rendered in header/footer')
finally:
 for file,data in backups.items():file.write_bytes(data)
 fixture.unlink(missing_ok=True)
 build()
 print('RESTORED original content and rebuilt; no test logo retained')
