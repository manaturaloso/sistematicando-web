"""Smoke test built output at localhost:4322. Requires Playwright and Chromium."""
from pathlib import Path
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    page = browser.new_page()
    errors, failed = [], []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('response', lambda r: failed.append(f'{r.status} {r.url}') if r.status >= 400 else None)
    for width in [320, 390, 768, 1440]:
        page.set_viewport_size({'width': width, 'height': 1000})
        response = page.goto('http://127.0.0.1:4322/')
        page.evaluate('document.fonts.ready')
        assert response.status == 200
        assert page.locator('h1').count() == 1
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
        assert page.locator('html').get_attribute('lang') == 'es-PE'
        assert page.locator('meta[name=robots]').get_attribute('content') == 'noindex, nofollow'
        for family in ['Gluten', 'Manrope']:
            assert page.evaluate('(family) => document.fonts.check(`500 32px "${family}"`)', family)
        for href in page.locator('a').evaluate_all('(links) => links.map(a => a.getAttribute("href"))'):
            if '#' in href:
                assert page.locator('#' + href.split('#')[1]).count() == 1, href
            else:
                assert page.request.get('http://127.0.0.1:4322' + href).ok, href
        if width < 900:
            toggle = page.get_by_role('button', name='Menú')
            assert toggle.get_attribute('aria-expanded') == 'false'
            assert not page.locator('#main-nav').is_visible()
            toggle.click()
            assert page.locator('#main-nav').is_visible()
            page.keyboard.press('Escape')
            assert toggle.get_attribute('aria-expanded') == 'false'
            assert toggle.evaluate('(el) => el === document.activeElement')
            toggle.click()
            page.locator('#main-nav a').first.click()
            assert toggle.get_attribute('aria-expanded') == 'false'
        summary = page.locator('summary').first
        summary.focus()
        page.keyboard.press('Enter')
        assert page.locator('details').first.get_attribute('open') is not None
        page.keyboard.press('Enter')
        assert page.locator('details').first.get_attribute('open') is None
        page.evaluate('window.scrollTo(0,0)')
        Path('/tmp/sistematicando-qa').mkdir(exist_ok=True)
        page.screenshot(path=f'/tmp/sistematicando-qa/home-{width}.png', full_page=True)
        print('PASS', width, 'fonts, links, no overflow, menu, keyboard FAQ')
    page.goto('http://127.0.0.1:4322/')
    page.keyboard.press('Tab')
    assert page.locator('.skip-link').evaluate('(el) => el === document.activeElement')
    page.keyboard.press('Enter')
    assert page.evaluate('location.hash') == '#contenido'
    page.emulate_media(reduced_motion='reduce')
    assert page.evaluate('matchMedia("(prefers-reduced-motion: reduce)").matches')
    assert page.request.get('http://127.0.0.1:4322/robots.txt').text().strip().endswith('Disallow: /')
    assert page.request.get('http://127.0.0.1:4322/docs/PROJECT_BRIEF.md').status == 404
    assert page.request.get('http://127.0.0.1:4322/404.html').ok
    assert not errors, errors
    assert not failed, failed
    print('PASS skip link, reduced motion, robots, private docs excluded, custom 404, no JS/resource errors')
    browser.close()
