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

# Tercera entrega · Soluciones

- `ASTRO_TELEMETRY_DISABLED=1 npm run check`: 13 archivos, cero errores, advertencias o hints.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build`: nueve páginas estáticas (home, 404, índice de soluciones y seis sectores).
- `python3 scripts/verify-solutions.py` contra dist servido en puerto 4322: 7 rutas a 320, 390, 768 y 1440 px (28 combinaciones), HTTP 200, H1 único, noindex, ausencia de overflow, breadcrumbs, menú móvil/Escape y foco, títulos únicos, enlaces entre páginas y anclas con destino válido. Sin errores JS ni recursos fallidos.
- Regresión `python3 scripts/verify-home.py`: aprobada a los cuatro anchos tras cambiar navegación y tarjetas de sectores.
- Revisión visual de capturas del índice a 1440 y restaurantes a 390: jerarquía, tarjetas, contenidos y disposición responsive. Los focos visibles en las capturas proceden de las pruebas de teclado.
- Capturas temporales en /tmp/sistematicando-qa; los scripts quedan versionados para repetirlas.
- No ejecutados axe, Lighthouse ni dispositivos físicos; no se afirma accesibilidad completa o resultados de rendimiento. No hay pruebas de recepción de datos porque no se implementó recepción.

# 2026-11-04 · Paquete Cloudflare de revisión

- Check repetido: 13 archivos, cero errores/advertencias/hints. Build repetido: nueve páginas.
- `python3 scripts/package-preview.py`: ZIP de 315086 bytes, nueve páginas, noindex/robots e integridad comprobados; sin docs/src/Git. SHA256 e81bcbd1e0a7e4fff2306986b197d63a746fee1ace6d4a77953e6b903322eaba para el archivo generado en esta sesión (puede variar al reconstruir).
- `git diff --check`: aprobado.
- Sin despliegue ni URL pública. Validación remota pendiente tras la carga en Cloudflare; no se repitió el smoke de navegador porque las páginas no cambiaron.

# 2026-11-04 · Catálogo de funcionalidades

- Check (15 archivos) sin errores, advertencias ni hints; build de diez páginas.
- scripts/verify-features.py aprobado a 320/390/768/900/1024/1440: overflow, IDs únicos, 14 módulos no verificados, cinco grupos, búsqueda sin tildes, varias palabras/espacios, resultados vacíos, limpiar/foco, enlaces de área después de búsqueda vacía, detalles por Enter, menú/Escape y noindex. Enlaces a soluciones y catálogo sin JS comprobados. Sin errores JS o recursos fallidos.
- Regresión scripts/verify-home.py: cuatro anchos; scripts/verify-solutions.py: 28 combinaciones aprobadas.
- Revisión visual de capturas del catálogo a 1440/390. Capturas temporales en /tmp/sistematicando-qa.
- npm run docs:features genera matriz de 14 módulos y comprueba IDs/grupos y consistencia mínima estado/evidencia.
- Empaquetado scripts/package-preview.py adaptado a diez páginas; ZIP íntegro fuera del checkout, con noindex/robots y sin documentación interna.
- No se hicieron nuevas pruebas remotas del Worker ni auditoría axe/Lighthouse. Ver PROGRESS para el bloqueo de acceso remoto.

# 2026-11-04 · Precios y guía local

- `ASTRO_TELEMETRY_DISABLED=1 npm run check`: 18 archivos, sin errores, warnings ni hints. Build: doce páginas estáticas.
- `python3 scripts/verify-commercial.py`: ambas rutas a 320/390/768/900/1024/1440; HTTP, H1/noindex, enlaces/anclas, ausencia de overflow y FAQ por teclado.
- Demo: envío de formulario incompleto bloqueado por validación; selección de negocio/locales/prioridad, foco al resultado, descarga TXT real comprobada con contenido esperado, invalidación al cambiar selección, regeneración, reset/foco y recarga sin selección. localStorage/sessionStorage vacíos y sin solicitudes HTTP no GET durante el recorrido. Esto valida el flujo probado, no afirma ausencia de logs normales del hosting.
- Alternativa sin JS visible y herramienta interactiva oculta. No hay backend ni recepción a probar.
- Regresión home (4 anchos), catálogo (6) y soluciones (28 combinaciones) aprobadas. Capturas precios a 1440 y demo a 390 revisadas.
- Prueba de home ajustada para navegar a precios desde menú y regresar antes de revisar las FAQ de home.
- Empaquetado adaptado a doce páginas; comprobación de noindex/robots y ZIP. No se invocó despliegue ni se verificó Worker remoto. Axe/Lighthouse siguen pendientes.

## Borrador de privacidad

Se revisaron los campos tratados por la guía y el código de almacenamiento/envío antes de redactar PRIVACY_DRAFT.md. Se conserva la distinción con registros técnicos de Cloudflare y el tratamiento de WhatsApp. Sin cambios de aplicación después del smoke; no hay enlace activo ni mensajes a probar. No se ha realizado validación legal externa ni se afirma cumplimiento normativo integral.
