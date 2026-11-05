"""Create an internal review bundle with a separate site ZIP and hashed evidence."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from tempfile import TemporaryDirectory
import hashlib
import json
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
output = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path('/tmp/sistematicando-review.zip')
if output == root or root in output.parents or not output.name.endswith('.zip'):
    raise SystemExit('Save the internal review ZIP outside the checkout, with .zip extension.')
if not (root / 'dist/version.json').is_file():
    raise SystemExit('Run npm run build before packaging the review.')
version = json.loads((root / 'dist/version.json').read_text())
required = ['docs/REVIEW_PACKAGE.md', 'docs/LAUNCH_DECISIONS.md', 'docs/PROGRESS.md', 'docs/DECISIONS.md', 'docs/RELEASE_CHECKLIST.md', 'docs/qa/remote-ci-status.json']
for name in required:
    if not (root / name).is_file():
        raise SystemExit(f'Missing review input: {name}')
files = [root / 'README.md', root / 'AGENTS.md'] + sorted((root / 'docs').rglob('*.md')) + sorted((root / 'docs/qa').glob('*.json')) + sorted((root / 'docs/qa').glob('*.png'))
files = sorted(set(files))
for file in files:
    if file.is_symlink() or not file.resolve().is_relative_to(root):
        raise SystemExit(f'Unexpected linked input: {file.name}')
manifest = {'schemaVersion': 1, 'kind': 'internal-review-only', 'publishAuthorized': False, 'siteBuildVersion': version, 'evidencePolicy': 'Each report retains its own build identity; inclusion does not reassign it to siteBuildVersion or approve release.', 'files': [], 'evidenceBuilds': {}}
readme = '''# Revisión interna de Sistematicando

Este paquete no es un despliegue ni una aprobación. No desplegar el ZIP externo.

- site-preview.zip: únicamente la web estática, con noindex/robots conservados.
- review/docs/REVIEW_PACKAGE.md: recorrido y alcance de revisión.
- review/docs/LAUNCH_DECISIONS.md: decisiones pendientes del propietario.
- review/: documentos e informes internos, fuera del ZIP de la web.
- manifest.json: identidad del sitio, hashes y versiones propias de la evidencia.

Para ver la web, extraer este paquete y ejecutar desde su carpeta:

    python3 -m zipfile -e site-preview.zip site
    python3 -m http.server 4321 --bind 127.0.0.1 --directory site

Abrir http://127.0.0.1:4321. La apertura directa de index.html como archivo no resuelve las rutas absolutas de assets. No hace falta publicar para revisar.

Los informes no necesariamente corresponden al SHA del sitio empaquetado. Consultar su buildVersion y manifest.json; no inferir CI remoto o disponibilidad del SaaS. No enviar mensajes reales durante los recorridos. Consultar HANDOFF.md para continuar el desarrollo desde el repositorio GitHub.
'''
with TemporaryDirectory(prefix='sistematicando-review-') as temp:
    site = Path(temp) / 'site-preview.zip'
    subprocess.run([sys.executable, str(root / 'scripts/package-preview.py'), str(site)], cwd=root, check=True)
    with ZipFile(site) as inner:
        assert inner.testzip() is None
        assert json.loads(inner.read('version.json')) == version
        assert not any(name.startswith(('docs/', 'review/', 'src/', '.git/')) for name in inner.namelist())
        pages = sum(name.endswith('.html') for name in inner.namelist())
    manifest['sitePages'] = pages
    with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
        def add_bytes(name, data):
            archive.writestr(name, data)
            manifest['files'].append({'path': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
        add_bytes('LEEME.md', readme.encode())
        add_bytes('site-preview.zip', site.read_bytes())
        for file in files:
            name = file.relative_to(root).as_posix()
            data = file.read_bytes()
            add_bytes('review/' + name, data)
            if file.suffix == '.json':
                report = json.loads(data)
                if isinstance(report, dict) and 'buildVersion' in report:
                    manifest['evidenceBuilds'][name] = report['buildVersion']
        archive.writestr('manifest.json', json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
with ZipFile(output) as archive:
    assert archive.testzip() is None
    assert len(archive.namelist()) == len(set(archive.namelist()))
    saved = json.loads(archive.read('manifest.json'))
    for entry in saved['files']:
        assert hashlib.sha256(archive.read(entry['path'])).hexdigest() == entry['sha256'], entry['path']
    assert set(archive.namelist()) == {entry['path'] for entry in saved['files']} | {'manifest.json'}
    assert saved['publishAuthorized'] is False
print(f'Internal review bundle: {output}')
print(f'Site pages: {pages}; review files: {len(files)}; bytes: {output.stat().st_size}')
print(f'Site build: {version["commit"]}; sourceModified: {version["sourceModified"]}')
print(f'SHA256: {hashlib.sha256(output.read_bytes()).hexdigest()}')
