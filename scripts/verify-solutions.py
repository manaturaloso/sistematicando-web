"""Smoke test solutions on built output served at localhost:4322."""
from pathlib import Path
from playwright.sync_api import sync_playwright

routes = ['/soluciones/'] + ['/soluciones/' + slug + '/' for slug in ['restaurantes', 'bares', 'cafeterias', 'hoteles', 'eventos', 'multisede']]
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    page = browser.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('response', lambda response: errors.append(f'{response.status} {response.url}') if response.status >= 400 else None)
    titles = set()
    checked_links = set()
    for route in routes:
        for width in [320, 390, 768, 1440]:
            page.set_viewport_size({'width': width, 'height': 1000})
            response = page.goto('http://127.0.0.1:4322' + route)
            page.evaluate('document.fonts.ready')
            assert response.status == 200, route
            assert page.locator('h1').count() == 1
            assert page.locator('meta[name=robots]').get_attribute('content') == 'noindex, nofollow'
            assert page.locator('main#contenido').count() == 1
            assert page.locator('.breadcrumbs [aria-current=page]').count() == 1
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (route, width)
            if width < 900:
                toggle = page.get_by_role('button', name='Menú')
                toggle.click()
                assert page.locator('#main-nav').is_visible()
                page.keyboard.press('Escape')
                assert toggle.get_attribute('aria-expanded') == 'false'
                assert toggle.evaluate('(el) => el === document.activeElement')
            if width == 1440:
                title = page.title()
                assert title not in titles
                titles.add(title)
                for href in page.locator('a').evaluate_all('(links) => links.map(a => a.getAttribute("href"))'):
                    target = 'http://127.0.0.1:4322' + (route + href if href.startswith('#') else href)
                    if target in checked_links:
                        continue
                    result = page.request.get(target)
                    assert result.ok, target
                    if '#' in target:
                        assert 'id="' + target.split('#')[1] + '"' in result.text(), target
                    checked_links.add(target)
                page.keyboard.press('Tab')
                assert page.locator('.skip-link').evaluate('(el) => el === document.activeElement')
            Path('/tmp/sistematicando-qa').mkdir(exist_ok=True)
            if route.endswith('restaurantes/') or route == '/soluciones/':
                page.screenshot(path=f'/tmp/sistematicando-qa/{route.strip("/").replace("/", "-")}-{width}.png', full_page=True)
        print('PASS', route, '4 widths, links, metadata, breadcrumbs, menu, keyboard')
    assert not errors, errors
    browser.close()
    print('PASS 28 route/width combinations, unique titles, no resource or JS errors')
