"""Run with a local HTTP server on port 4321; requires Playwright and Chromium."""
from pathlib import Path
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    page = browser.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    for width in [320, 390, 768, 1440]:
        page.set_viewport_size({'width': width, 'height': 1000})
        response = page.goto('http://127.0.0.1:4321/docs/brand-preview.html')
        page.evaluate('document.fonts.ready')
        assert response.status == 200
        assert page.locator('h1').count() == 1
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
        for family in ['Gluten', 'Manrope']:
            assert page.evaluate('(family) => document.fonts.check(`500 32px "${family}"`)', family)
        for href in page.locator('a').evaluate_all('(links) => links.map(a => a.getAttribute("href"))'):
            assert href.startswith('#') and page.locator(href).count() == 1, href
        Path('/tmp/sistematicando-qa').mkdir(exist_ok=True)
        page.screenshot(path=f'/tmp/sistematicando-qa/brand-{width}.png', full_page=True)
        print('PASS', width, 'HTTP, fonts, heading, anchors, overflow')
    page.goto('http://127.0.0.1:4321/docs/brand-preview.html')
    page.keyboard.press('Tab')
    assert page.locator('.skip-link').evaluate('(el) => el === document.activeElement')
    page.keyboard.press('Enter')
    assert page.evaluate('location.hash') == '#contenido'
    assert not errors, errors
    print('PASS keyboard skip link; no JS errors')
    browser.close()
