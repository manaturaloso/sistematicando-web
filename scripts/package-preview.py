"""Package the verified static build only. Output stays outside the checkout."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib
import sys
import json

root = Path(__file__).resolve().parents[1]
build = root / 'dist'
output = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else root.parent / 'sistematicando-preview.zip'
if build == output or build in output.parents or root == output or root in output.parents:
    raise SystemExit('Save the archive outside the checkout and dist.')
required = ['index.html', '404.html', 'robots.txt', 'soluciones/index.html', 'funcionalidades/index.html', 'precios/index.html', 'solicitar-demo/index.html', 'legal/privacidad/index.html', 'recursos/index.html', 'preguntas-frecuentes/index.html', 'admin/index.html', 'contacto/index.html']
for name in required:
    if not (build / name).is_file():
        raise SystemExit(f'Missing build output: {name}; run npm run build first.')
html = list(build.rglob('*.html'))
expected = {name for name in required if name.endswith('.html')}
for item in json.loads((root / 'content/solutions.json').read_text())['items']:
    expected.add(f"soluciones/{item['slug']}/index.html")
for item in json.loads((root / 'content/guides.json').read_text())['items']:
    expected.add(f"recursos/guias/{item['slug']}/index.html")
actual = {file.relative_to(build).as_posix() for file in html}
if actual != expected:
    raise SystemExit(f'Unexpected page set: missing={expected-actual}, extra={actual-expected}')
for file in html:
    text = file.read_text()
    if 'name="robots" content="noindex, nofollow"' not in text:
        raise SystemExit(f'Missing noindex: {file.relative_to(build)}')
if 'Disallow: /' not in (build / 'robots.txt').read_text():
    raise SystemExit('Missing crawler block in robots.txt')
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for file in sorted(build.rglob('*')):
        if file.is_symlink():
            raise SystemExit(f'Symlink is not allowed in the build: {file}')
        if file.is_file():
            if file.name == '.gitkeep':
                continue
            relative = file.relative_to(build)
            if any(part.startswith('.') for part in relative.parts):
                raise SystemExit(f'Hidden file in build: {relative}')
            archive.write(file, relative.as_posix())
with ZipFile(output) as archive:
    assert archive.testzip() is None
    assert 'index.html' in archive.namelist()
    assert not any(name.startswith(('docs/', 'src/', '.git/')) for name in archive.namelist())
print(f'Archive: {output}')
print(f'Pages: {len(html)}; bytes: {output.stat().st_size}')
print(f'SHA256: {hashlib.sha256(output.read_bytes()).hexdigest()}')
