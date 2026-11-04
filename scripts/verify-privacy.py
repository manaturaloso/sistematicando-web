"""Validate local privacy page and WhatsApp handoff without contacting WhatsApp."""
from urllib.parse import urlparse, parse_qs
from pathlib import Path
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    page=browser.new_page()
    errors,external=[],[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('request',lambda r:external.append(r.url) if urlparse(r.url).hostname != '127.0.0.1' else None)
    for width in [320,390,768,900,1024,1440]:
        page.set_viewport_size({'width':width,'height':1000})
        page.goto('http://127.0.0.1:4322/solicitar-demo/')
        page.evaluate('document.fonts.ready')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),width
        link=page.get_by_role('link',name='Abrir WhatsApp')
        href=link.get_attribute('href')
        url=urlparse(href)
        assert url.scheme=='https' and url.hostname=='wa.me' and url.path=='/51956832336'
        message=parse_qs(url.query)['text'][0]
        assert message=='Hola, quisiera conocer Sistematicando y consultar por una demostración.'
        assert link.get_attribute('target')=='_blank'
        assert set(link.get_attribute('rel').split()) >= {'noopener','noreferrer'}
        assert page.get_by_role('link',name='Leer política de privacidad').get_attribute('href')=='/legal/privacidad/'
        for label,value in [('Tipo de negocio','Cafeterías'),('Cantidad de locales','2 a 5 locales'),('Tu prioridad','Inventario y costos')]:
            page.get_by_label(label,exact=True).select_option(label=value)
        page.get_by_role('button',name='Generar mi guía local').click()
        assert link.get_attribute('href')==href, 'Guide must not be transmitted in the link'
        # Verify activation by keyboard without contacting a third-party service.
        link.evaluate('(el)=>el.addEventListener("click",e=>{e.preventDefault();window.testHandoff=el.href;})')
        link.focus();page.keyboard.press('Enter')
        assert page.evaluate('window.testHandoff')==href
        response=page.goto('http://127.0.0.1:4322/legal/privacidad/')
        page.evaluate('document.fonts.ready')
        assert response.status==200
        assert page.locator('h1').count()==1
        assert page.locator('meta[name=robots]').get_attribute('content')=='noindex, nofollow'
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),width
        text=page.locator('main').inner_text()
        for value in ['JOEL ALEJANDRO YAÑEZ CABALLERO','10477365928','Calle Enrique Barrón 586, Barranco','joel.yc23@gmail.com','+51 956 832 336','Versión para revisión']:
            assert value in text,value
        assert '[pendiente' not in text.lower()
        assert page.locator('a[href="mailto:joel.yc23@gmail.com"]').count()==2
        assert page.locator('a[href="https://wa.me/51956832336"]').count()==1
        assert page.locator('footer a[href="/legal/privacidad/"]').count()==1
        for a in page.locator('main a').all():
            href=a.get_attribute('href')
            if href.startswith('https://'):
                assert urlparse(href).hostname in ['wa.me','www.cloudflare.com','www.whatsapp.com']
                assert a.get_attribute('rel')=='noopener noreferrer'
            elif href.startswith('/'):
                assert page.request.get('http://127.0.0.1:4322'+href).ok
            else:
                assert href=='mailto:joel.yc23@gmail.com'
        if width in [390,1440]:
            Path('/tmp/sistematicando-qa').mkdir(exist_ok=True)
            page.screenshot(path=f'/tmp/sistematicando-qa/privacy-{width}.png',full_page=True)
        print('PASS privacy/WhatsApp',width,'correct contact, no guide forwarding, keyboard, layout')
    assert not external,external
    assert not errors,errors
    plain=browser.new_context(java_script_enabled=False).new_page()
    plain.goto('http://127.0.0.1:4322/solicitar-demo/')
    assert plain.get_by_role('link',name='Abrir WhatsApp').is_visible()
    assert plain.get_by_role('link',name='Leer política de privacidad').is_visible()
    print('PASS no automatic external requests/messages; links work without JavaScript')
    browser.close()
