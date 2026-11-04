"""Exercise resource pages and shared FAQ on localhost:4322."""
from pathlib import Path
from playwright.sync_api import sync_playwright
routes=['/recursos/','/preguntas-frecuentes/']+['/recursos/guias/'+slug+'/' for slug in ['preparar-cierre-de-caja','ordenar-inventario-inicial','evaluar-software-para-tu-negocio']]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    page=browser.new_page()
    errors=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    titles=set()
    for route in routes:
        for width in [320,390,768,900,1024,1440]:
            page.set_viewport_size({'width':width,'height':1000})
            assert page.goto('http://127.0.0.1:4322'+route).status==200
            page.evaluate('document.fonts.ready')
            assert page.locator('h1').count()==1
            assert page.locator('meta[name=robots]').get_attribute('content')=='noindex, nofollow'
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),(route,width)
            ids=page.locator('[id]').evaluate_all('(els)=>els.map(e=>e.id)')
            assert len(ids)==len(set(ids)),route
            if '/guias/' in route:
                assert page.locator('.guide-body section').count()==5
                page.locator('.guide-toc a').first.click()
                assert page.evaluate('location.hash')=='#paso-1'
            if route=='/preguntas-frecuentes/':
                assert page.locator('details').count()==12
                page.locator('summary').first.focus();page.keyboard.press('Enter')
                assert page.locator('details').first.get_attribute('open') is not None
            if width==1440:
                title=page.title();assert title not in titles;titles.add(title)
                for href in page.locator('a').evaluate_all('(els)=>els.map(e=>e.getAttribute("href"))'):
                    if href.startswith('#'): assert page.locator(href).count()==1,href
                    else:
                        result=page.request.get('http://127.0.0.1:4322'+href)
                        assert result.ok,href
                        if '#' in href:assert 'id="'+href.split('#')[1]+'"' in result.text(),href
            if width in [390,1440] and route in ['/recursos/','/recursos/guias/preparar-cierre-de-caja/']:
                Path('/tmp/sistematicando-qa').mkdir(exist_ok=True)
                page.evaluate('document.activeElement.blur();window.scrollTo(0,0)')
                page.screenshot(path=f'/tmp/sistematicando-qa/{route.strip("/").replace("/","-")}-{width}.png',full_page=True)
        print('PASS resource',route,'6 widths, titles, links, layout, anchors/FAQ')
    page.goto('http://127.0.0.1:4322/preguntas-frecuentes/')
    answers={el.get_attribute('data-faq'):el.locator('p').text_content() for el in page.locator('details').all()}
    for route in ['/','/precios/']:
        page.goto('http://127.0.0.1:4322'+route)
        for el in page.locator('details[data-faq]').all():assert answers[el.get_attribute('data-faq')]==el.locator('p').text_content()
    plain=browser.new_context(java_script_enabled=False).new_page()
    plain.goto('http://127.0.0.1:4322/preguntas-frecuentes/')
    plain.locator('summary').first.click()
    assert plain.locator('details').first.get_attribute('open') is not None
    assert not errors,errors
    print('PASS FAQ consistency across 3 pages and native no-JS interaction')
    browser.close()
