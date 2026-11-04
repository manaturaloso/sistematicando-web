"""Exercise catalog search and progressive enhancement on localhost:4322."""
from playwright.sync_api import sync_playwright
from pathlib import Path

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    page = browser.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('response', lambda response: errors.append(f'{response.status} {response.url}') if response.status >= 400 else None)
    for width in [320, 390, 768, 900, 1024, 1440]:
        page.set_viewport_size({'width':width, 'height':1000})
        assert page.goto('http://127.0.0.1:4322/funcionalidades/').status == 200
        page.evaluate('document.fonts.ready')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
        assert page.locator('h1').count() == 1
        ids = page.locator('[id]').evaluate_all('(els) => els.map(el => el.id)')
        assert len(ids) == len(set(ids)), 'Duplicate IDs'
        assert page.locator('.feature-card').count() == 14
        assert page.locator('.feature-status[data-status="unverified"]').count() == 14
        assert page.locator('.feature-group').count() == 5
        assert page.locator('meta[name="robots"]').get_attribute('content') == 'noindex, nofollow'
        field = page.get_by_role('searchbox', name='Buscar en el catálogo')
        field.fill('facturacion')
        assert page.locator('.feature-card:visible').count() == 1
        assert page.locator('.feature-card:visible h3').inner_text() == 'Facturación electrónica'
        assert page.locator('#search-count').inner_text() == '1 módulo encontrado.'
        field.fill('  CONTROL   ACCESOS  ')
        assert page.locator('.feature-card:visible').count() == 1
        field.fill('zzzz-no-existe')
        assert page.locator('.feature-card:visible').count() == 0
        assert page.locator('.search-empty').is_visible()
        page.get_by_role('button',name='Limpiar búsqueda').click()
        assert page.locator('.feature-card:visible').count() == 14
        assert field.evaluate('(el) => el === document.activeElement')
        field.fill('zzzz-no-existe')
        page.locator('.feature-jumps a').first.click()
        assert page.locator('.feature-card:visible').count() == 14
        assert page.evaluate('location.hash') == '#area-operacion'
        summary = page.locator('.feature-card summary').first
        summary.focus()
        page.keyboard.press('Enter')
        assert page.locator('.feature-card details').first.get_attribute('open') is not None
        if width < 900:
            page.get_by_role('button', name='Menú').click()
            assert page.locator('#main-nav').is_visible()
            page.keyboard.press('Escape')
            assert not page.locator('#main-nav').is_visible()
        if width in [390,1440]:
            page.evaluate('document.activeElement.blur(); window.scrollTo(0,0)')
            Path('/tmp/sistematicando-qa').mkdir(exist_ok=True)
            page.screenshot(path=f'/tmp/sistematicando-qa/features-{width}.png',full_page=True)
        print('PASS catalog', width, 'layout, search, normalization, empty/reset, anchors, keyboard')
    page.goto('http://127.0.0.1:4322/funcionalidades/')
    for href in page.locator('a').evaluate_all('(links) => links.map(link=>link.getAttribute("href"))'):
        if href.startswith('#'):
            assert page.locator(href).count() == 1, href
        else:
            response = page.request.get('http://127.0.0.1:4322'+href)
            assert response.ok, href
            if '#' in href:
                assert 'id="'+href.split('#')[1]+'"' in response.text(),href
    assert not errors, errors
    context = browser.new_context(java_script_enabled=False, viewport={'width':390,'height':1000})
    plain = context.new_page()
    plain.goto('http://127.0.0.1:4322/funcionalidades/')
    assert plain.locator('.feature-card:visible').count() == 14
    assert not plain.locator('.feature-search').is_visible()
    plain.locator('.feature-jumps a').first.click()
    assert plain.evaluate('location.hash') == '#area-operacion'
    print('PASS links and no-JS catalog with area navigation')
    browser.close()
