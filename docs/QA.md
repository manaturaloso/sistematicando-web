# Validación · 2026-11-03

## Ejecutado y aprobado

- fontTools.TTFont: lectura de tablas name y fvar de ambos TTF; ejes y licencias registrados en BRAND.md.
- `python3 -m http.server 4321 --bind 127.0.0.1` desde la raíz; requirió permiso fuera del sandbox para abrir socket local.
- `python3 scripts/verify-brand.py` con Chromium y Playwright disponibles en el entorno; requirió permiso para iniciar Chromium.
- Anchos 320, 390, 768 y 1440 px: respuesta HTTP 200, fuentes cargadas, un H1, destinos internos existentes y ausencia de desbordamiento horizontal. Capturas temporales en /tmp/sistematicando-qa (no necesarias para continuar).
- Teclado: Tab al enlace de salto y Enter a #contenido. Sin errores JavaScript.
- Revisión visual de captura de escritorio: fuentes, jerarquía y tarjetas renderizadas.
- Contraste WCAG calculado con luminancia sRGB: tinta/coral 4.52:1; tinta/blanco 13.15:1. Blanco/coral 2.91:1, por eso no se utiliza como texto en botones coral.
- `git diff --check`: sin errores antes del commit.
- `git ls-remote origin HEAD refs/heads/main` fuera del sandbox: éxito y salida vacía, sin referencias remotas en esa consulta.
- Licencias OFL obtenidas por HTTPS con verificación TLS activa.

## Límites

No se ejecutaron Lighthouse, axe, build Astro ni typecheck; no existe aplicación Astro en esta entrega. No se afirma conformidad WCAG completa. Las capturas móviles se generaron y las dimensiones se comprobaron automáticamente; no se hizo revisión manual exhaustiva en dispositivos físicos.

## GitHub

`gh pr list --repo manaturaloso/sistematicando-web --state open`: Forbidden en API GraphQL. No se pudo confirmar PR pendientes. El resultado del push y la verificación SHA se registra en PROGRESS después del intento.

## Repetir

Instalar Playwright en un entorno de QA si no está disponible, disponer de Chromium en /usr/bin/chromium, iniciar el servidor desde la raíz y ejecutar scripts/verify-brand.py. No hay paquetes de aplicación instalados ni lockfile que reproducir aún.
