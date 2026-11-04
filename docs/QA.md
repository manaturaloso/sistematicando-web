# Validación · 2026-11-03

## Ejecutado y aprobado

- fontTools.TTFont: lectura de tablas name y fvar de ambos TTF; ejes y licencias registrados en BRAND.md.
- `python3 -m http.server 4321 --bind 127.0.0.1` desde la raíz; requirió permiso fuera del sandbox para abrir socket local.
- `python3 scripts/verify-brand.py` con Chromium y Playwright disponibles en el entorno; requirió permiso para iniciar Chromium.
- Anchos 320, 390, 768 y 1440 px: respuesta HTTP 200, fuentes cargadas, un H1, destinos internos existentes y ausencia de desbordamiento horizontal. Capturas temporales en /tmp/sistematicando-qa (no necesarias para continuar).
- Teclado: Tab al enlace de salto y Enter a #contenido. Sin errores JavaScript.
- Revisión visual de captura de escritorio: fuentes, jerarquía y tarjetas renderizadas.
- Contraste WCAG calculado con luminancia sRGB: tinta/coral 4.52:1; tinta/blanco 13.15:1. Blanco/coral 2.91:1, por eso no se utiliza como texto en botones coral.
- Revisión de whitespace del primer commit: el chequeo completo detecta espacios finales existentes en el brief original y en las licencias oficiales, conservados intencionalmente. `git diff-tree --root --no-commit-id --check HEAD -- . ':!docs/PROJECT_BRIEF.md' ':!public/fonts/*-OFL.txt'` pasó para los archivos creados.
- `git ls-remote origin HEAD refs/heads/main` fuera del sandbox: éxito y salida vacía, sin referencias remotas en esa consulta.
- Licencias OFL obtenidas por HTTPS con verificación TLS activa.

## Límites

No se ejecutaron Lighthouse, axe, build Astro ni typecheck; no existe aplicación Astro en esta entrega. No se afirma conformidad WCAG completa. Las capturas móviles se generaron y las dimensiones se comprobaron automáticamente; no se hizo revisión manual exhaustiva en dispositivos físicos.

## GitHub

`gh pr list --repo manaturaloso/sistematicando-web --state open`: Forbidden en API GraphQL. No se pudo confirmar PR pendientes. Push de feat/brand-foundation completado correctamente; primer commit d72c452. Se verifica el SHA final contra el remoto después del commit de continuidad.

## Repetir

Instalar Playwright en un entorno de QA si no está disponible, disponer de Chromium en /usr/bin/chromium, iniciar el servidor desde la raíz y ejecutar scripts/verify-brand.py. No hay paquetes de aplicación instalados ni lockfile que reproducir aún.

# Segunda entrega · Home Astro

- Entorno: Node 24.22.1, npm 11.9.0, Astro 7.4.5, TypeScript 6.0.3.
- Primer check/build falló por intento de telemetría de crear /home/agent/.config/astro. Repetidos con ASTRO_TELEMETRY_DISABLED=1: check sin errores/advertencias/hints y build correcto (home + 404).
- Primera prueba a 320px detectó overflow en visual-orbit. Se anuló la rotación móvil; se recompiló y pasó el smoke a 320/390/768/1440.
- `python3 scripts/verify-home.py` contra dist servido en 4322: fuentes reales, H1, idioma, noindex, enlaces, menú móvil abierto/cerrado, Escape con retorno de foco, selección de navegación, FAQ por Enter, salto al contenido, robots, 404.html y ausencia de errores JS/recursos. Documentación privada excluida de dist.
- Se generaron capturas y revisaron manualmente escritorio y móvil. Se reemplazaron símbolos decorativos por SVG para evitar iconos ausentes y emojis de color variable.
- Reducción de movimiento: se verificó el modo emulado y los estilos limitan animaciones a no-preference. No equivale a una auditoría completa de accesibilidad.
- No ejecutados: axe, Lighthouse, dispositivos físicos, envío comercial y pruebas del SaaS. No hay receptor de datos ni despliegue.

Para repetir: npm ci, ASTRO_TELEMETRY_DISABLED=1 npm run check y build; servidor de dist y scripts/verify-home.py según README. La prueba anterior scripts/verify-brand.py sigue siendo solo para la referencia HTML independiente en puerto 4321.

- Instalación reproducible: `npm ci --ignore-scripts` completado desde el lockfile; check y build repetidos después para validar las dependencias reinstaladas. Se omitieron scripts de instalación en esta comprobación; el npm install inicial sí se ejecutó con su comportamiento predeterminado.
- `git diff --check` sin errores para esta entrega.
