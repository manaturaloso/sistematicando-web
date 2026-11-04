"""Check pricing content and local-only demo guide on the static build."""
from pathlib import Path
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    page = browser.new_page(accept_downloads=True)
    errors, submissions = [], []
    page.on('pageerror',lambda error: errors.append(str(error)))
    page.on('response',lambda r: errors.append(f'{r.status} {r.url}') if r.status >= 400 else None)
    page.on('request',lambda r: submissions.append(r.url) if r.method != 'GET' else None)
    for width in [320,390,768,900,1024,1440]:
        page.set_viewport_size({'width':width,'height':1000})
        for route in ['/precios/','/solicitar-demo/']:
            assert page.goto('http://127.0.0.1:4322'+route).status == 200
            page.evaluate('document.fonts.ready')
            assert page.locator('h1').count() == 1
            assert page.locator('meta[name=robots]').get_attribute('content') == 'noindex, nofollow'
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),(route,width)
            if route == '/precios/':
                assert page.locator('.commercial-factors article').count() == 4
                page.locator('summary').first.focus()
                page.keyboard.press('Enter')
                assert page.locator('details').first.get_attribute('open') is not None
            else:
                generate=page.get_by_role('button',name='Generar mi guía local')
                generate.click()
                assert not page.locator('#guide-result').is_visible()
                assert page.locator('#business').evaluate('(el)=>!el.validity.valid')
                page.get_by_label('Tipo de negocio',exact=True).select_option(label='Cafeterías')
                page.get_by_label('Cantidad de locales').select_option(label='2 a 5 locales')
                page.get_by_label('Tu prioridad').select_option(label='Inventario y costos')
                generate.click()
                assert page.locator('#guide-result').is_visible()
                assert 'Cafeterías' in page.locator('#guide-text').inner_text()
                assert page.locator('#result-title').evaluate('(el)=>el===document.activeElement')
                with page.expect_download() as download:
                    page.get_by_role('button',name='Descargar guía (.txt)').click()
                file = download.value
                content=Path(file.path()).read_text()
                assert file.suggested_filename == 'sistematicando-guia-demo.txt'
                assert 'Cafeterías' in content and '2 a 5 locales' in content
                assert 'No es cotización, solicitud enviada ni reserva de demo.' in content
                page.get_by_label('Tu prioridad').select_option(label='Equipo y reportes')
                assert not page.locator('#guide-result').is_visible()
                generate.click()
                assert 'Equipo y reportes' in page.locator('#guide-text').inner_text()
                page.get_by_role('button',name='Empezar de nuevo').click()
                assert not page.locator('#guide-result').is_visible()
                assert page.locator('#business').input_value() == ''
                assert page.locator('#business').evaluate('(el)=>el===document.activeElement')
                assert page.evaluate('localStorage.length===0 && sessionStorage.length===0')
                page.reload()
                assert page.locator('#business').input_value() == ''
            for href in page.locator('a').evaluate_all('(links)=>links.map(a=>a.getAttribute("href"))'):
                target='http://127.0.0.1:4322'+(route+href if href.startswith('#') else href)
                response=page.request.get(target)
                assert response.ok,href
                if '#' in href: assert 'id="'+href.split('#')[1]+'"' in response.text(),href
            if width in [390,1440]:
                Path('/tmp/sistematicando-qa').mkdir(exist_ok=True)
                page.evaluate('document.activeElement.blur(); window.scrollTo(0,0)')
                page.screenshot(path=f'/tmp/sistematicando-qa/{route.strip("/")}-{width}.png',full_page=True)
        print('PASS commercial',width,'routes, layout, validation, guide, download, reset, no storage')
    assert not submissions,submissions
    assert not errors,errors
    context=browser.new_context(java_script_enabled=False)
    plain=context.new_page()
    plain.goto('http://127.0.0.1:4322/solicitar-demo/')
    assert not plain.locator('.demo-builder').is_visible()
    assert plain.locator('.demo-steps').is_visible()
    assert plain.locator('noscript').is_visible()
    print('PASS no data submission, no JS errors, no-JS preparation content')
    browser.close()
