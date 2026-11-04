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

# 2026-11-04 · Privacidad y WhatsApp

- Check: 21 archivos sin errores, warnings ni hints. Build: trece páginas.
- scripts/verify-privacy.py: seis anchos, datos confirmados y enlaces, número wa.me 51956832336, codificación de mensaje genérico, rel noopener/noreferrer, no adjuntar selecciones, privacidad accesible y correo exacto. Activación por Enter interceptada en el navegador: sin contactar a WhatsApp ni enviar mensajes. Sin requests externos automáticos. Enlaces disponibles sin JavaScript.
- scripts/verify-commercial.py adaptado a comprobar forma del enlace externo sin solicitarlo. Guía/descarga/reset y ausencia de envíos siguen aprobados a seis anchos.
- Regresiones home (4), catálogo (6) y soluciones (28) aprobadas. Revisión visual de privacidad a 390px.
- Empaquetador actualizado para trece páginas, conserva noindex y exclusión de archivos internos.
- No se comprobaron bandejas de correo, identidad/titularidad externa, entrega de mensajes o cumplimiento legal. Revisión operativa antes de adoptar política vigente documentada en PRIVACY_REVIEW.md.

# 2026-11-04 · Recursos, contenido editable y /admin

- Check: 31 archivos, cero errores/advertencias/hints. Build: 19 páginas.
- .pages.yml validado contra lib/config-schema.ts del repositorio público de Pages CMS consultado por HTTPS (el esquema oficial se ejecutó temporalmente con Zod v3 y lista de tipos del registro oficial; no se copió al proyecto). Config de merge y rutas de file/media revisadas en fuente del proveedor.
- content:check comprueba referencias/IDs, estados con evidencia, contactos, rutas internas, colores, logos dentro de public/media y cobertura de campos por editores. Forma parte de prebuild.
- scripts/verify-cms.py aprobado: edición de copia en home y FAQ compartida, imagen de prueba en cabecera/pie, pie oscuro/favicon. Administrador a 320/390/768/900/1024/1440 con links de rama correctos y sin credenciales locales. Restaura originales y reconstruye al terminar.
- Primer ensayo de FAQ falló por usar innerText sobre respuesta cerrada; corregido a textContent para verificar contenido oculto. Segundo ensayo y ensayo final completo aprobados. Los tests de consistencia ya no comparan textos vacíos.
- verify-resources.py: índice, tres guías y FAQ a seis anchos, enlaces, anclas, títulos únicos, IDs únicos, respuestas compartidas y FAQ sin JS. Capturas de índice/guía y admin generadas.
- Regresiones verify-privacy, commercial, home, features y solutions: aprobadas tras migrar contenido y menús.
- Pendiente: login en Pages CMS, permiso GitHub del propietario, subida real de logo y commit alojado. No se accedió a cuentas ni se publicaron cambios. No hay prueba de edición completa alojada aún.

# 2026-11-04 · Auditoría de calidad

Resultados finales y reproducción en QUALITY.md, evidencia en docs/qa.

- Primera prueba sin JS falló: menú oculto. Corregido y test final aprobado.
- Texto al 200% detectó overflow en navegación/adorno de home. Se identificaron elementos por geometría, se corrigieron y pasó la prueba en cinco rutas.
- Lighthouse inicial detectó nombre accesible de marca que no incluía leyenda visible y 404 de favicon. Corregidos; última ejecución sin esos fallos.
- Axe final: 41 comprobaciones, cero infracciones automáticas, con color-contrast incompleto en home preservado. Diagnóstico dirigido de contraste requirió crear contexto explícito de Playwright (primer intento sin él fue rechazado por axe); diagnóstico corregido completado, evidencia y evaluación de colores separadas.
- Lighthouse final home/catálogo/demo: rendimiento/accesibilidad automática/buenas prácticas 100 en cada ruta, SEO 63 por noindex. Datos de laboratorio, no certificación o CWV de producción.
- npm run test:navigation: navegación móvil sin JS, salto con foco a main, menú por teclado/Escape, foco y ampliación de texto al 200% aprobados.
- Regresión de scripts/verify-home.py y verify-resources.py aprobada tras cambios. Check/build y content:check aprobados.
- No se repitió la prueba mutante del CMS: no se modificaron datos/esquema. Tampoco autenticación real, mensajes, Worker remoto, lector de pantalla o dispositivos físicos.

# 2026-11-04 · Configuración y runtime Worker

- Node 24.22.1, Wrangler 4.157.0 fijado; opciones de assets contrastadas con su config-schema.json instalado.
- Check, build y content:check aprobados. worker:check con --dry-run ejecutó el build previo, preparó 49 archivos de assets y terminó sin subir ni publicar.
- Wrangler --local inició correctamente. Request.cf usó valores de desarrollo tras consulta no disponible; no se utiliza en esta web puramente estática.
- npm run test:worker: 30 comprobaciones de rutas, fuentes comparadas por SHA256, query de redirección conservada, robots/noindex, POST 405 y cuatro páginas en navegador móvil sin errores/overflow. Resultado versionado en docs/qa/worker-report.json.
- No se accedió a la cuenta de Cloudflare ni se validó Worker remoto, autenticación, DNS o caché de producción. No se repitió Lighthouse/axe porque no se modificaron páginas/estilos.

# 2026-11-04 · Control automático de CMS

- Revisión remota por fetch con refspec explícito: branch de trabajo igual al HEAD local. El primer fetch solo escribió FETCH_HEAD porque no existían refs de seguimiento; se crearon refs explícitas y se comparó el SHA completo. Sin resets ni merges.
- npm ci --include=dev aprobado desde lockfile. Check (39 archivos) sin errores/advertencias; Worker dry-run aprobado después de reinstalar, con build de 19 páginas.
- CHROMIUM_PATH=/usr/bin/chromium npm run test:ci aprobado: 19 rutas, 66 destinos/anclas internas, títulos/semántica/overflow, navegación sin JS/teclado/200% y 41 comprobaciones axe sin infracciones automáticas. Incomplete de contraste siguen registrados.
- Workflow YAML parseado con loader que conserva la clave on; comprobados eventos, permisos read-only, referencias a acciones oficiales v7 y uso exclusivo de dry-run. No equivale a validación de ejecución en GitHub.
- Se mejoró el chequeo de imágenes para cargar también logos con loading=lazy antes de juzgar sus bytes renderizables. No se hizo una nueva carga de logo oficial.
- Pipeline alojado, instalación de browser en runner y estado de Actions pendientes de verificar con el SHA remoto. No se ejecutó login del CMS, deploy o Lighthouse nuevo; no cambió la web.

## 2026-11-04 · Guardado real de CMS y marca oficial

El propietario guardó tres imágenes originales y su selección de marca en cuatro commits (1206881, a3803b7, 222f48b, 55f79ee). Se incorporaron con fast-forward, sin sobrescribir trabajo. Dimensiones horizontales corregidas a 7958 × 2005; bytes originales preservados. Cabecera/pie/fav probados en seis anchos con test:brand; hashes versionados. /admin deja de afirmar conexión pendiente. Adorno del hero desplazado 1.5rem para corregir overflow a 900 px.

Check 40 archivos y build 19 páginas aprobados; test:ci local 19 rutas/66 destinos, navegación y axe 41 comprobaciones sin infracciones automáticas. Lighthouse local 100/96/100 rendimiento y SEO 66 por noindex; CLS catálogo 0.119 y peso de PNG quedan pendientes. No certificación WCAG ni métricas de producción. Guardado CMS comprobado mediante Git, sin login del agente. Solo Codex principal.

Rama seguida feat/brand-foundation observada en ed7227d con .pages.yml vacío agregado por el propietario. Simulación de integración sin conflictos conserva el esquema completo; no se hizo integración, push a esa rama, deploy ni cambio DNS. Siguiente paso: autorización explícita para integrar versión validada; antes fetch/revisar cambios concurrentes. Actions alojado y PR existentes sin verificar por API Forbidden.

Worker local con originales: test:worker aprobado, 30 comprobaciones de rutas, hashes de fuentes/logos/favicón, 404 privados, normalización, query, POST 405 y navegador móvil. Servidor detenido después de validar. Request.cf usa fallback local; no es fallo de assets ni validación pública. Check requiere ASTRO_TELEMETRY_DISABLED=1 y Wrangler XDG_CONFIG_HOME=/tmp/sistematicando-config en este entorno de permisos.

## 2026-11-04 · Integración autorizada para Worker

El usuario respondió «Sí. autorizo.» a integrar ec19bb7 en feat/brand-foundation para actualizar el Worker público. Fetch confirmó ambas puntas sin cambios nuevos; merge sin conflictos sobre ed7227d conserva el .pages.yml completo, originales y commits del propietario. Integración directa mediante push normal; sin force-push, DNS, secretos nuevos ni retirada de noindex. No se crea PR. Solo Codex principal.

Pruebas funcionales de ec19bb7 siguen vigentes porque no cambia el árbol de aplicación integrado; se repite worker:check del merge como comprobación de paquete. Comprobación remota: curl al Worker bloqueado por proxy (CONNECT 403), consulta Actions por gh bloqueada (Forbidden). No afirmar publicación exitosa ni CI remoto verde. Siguiente paso exacto: comprobar build de este commit en Cloudflare Deployments y recorrer rutas/logo/admin en el hostname; después continuar desarrollo en feat/feature-catalog sincronizada, sin más publicaciones implícitas.

## 2026-11-04 · Estabilidad de cabecera y carga de fuentes

Implementado: menú móvil inicializado durante el parsing con script inline encapsulado tras la cabecera; evita que el nav expandido aparezca y desplace todo main antes de cargar el módulo externo. Conserva enlaces sin JS y eventos de teclado/Escape. Precarga explícita de Manrope y Gluten originales locales, sin cambiar fuentes ni logos. Prueba de navegación extendida para bloquear scripts externos y verificar que el menú siga operativo. Una futura CSP debe autorizar el script mediante hash/nonce.

Pruebas: check 40 archivos sin errores/advertencias, build 19 páginas y content:check aprobados. Suite test:ci después de adelantar menú: 19 rutas/66 destinos, navegación y 41 comprobaciones axe sin infracciones automáticas; incomplete de contraste separado, no certificación completa. Después de precargar fuentes: check/build y Lighthouse final tres rutas aprobados; rendimiento/accesibilidad/buenas prácticas 100, SEO 66 por noindex. CLS home/catálogo/demo 0 en laboratorio; catálogo previo 0.119. LCP final aproximadamente 0.90 s; sin afirmar métricas de producción. test:navigation final incluye scripts externos bloqueados.

Persistencia solo en feat/feature-catalog, con identidad Joel Alejandro Yañez Caballero. Sin push a rama del Worker ni despliegue nuevo; publicado sigue 9a017af. Agente: Codex principal. Quedan peso de PNG, revisión manual/dispositivos y pendientes comerciales/legales. Siguiente paso: revisión de esta corrección y optimización de entrega de imágenes preservando originales; publicación posterior requiere autorización explícita. Sin PR creada; las existentes no se pueden verificar con la API disponible.

## 2026-11-04 · Fallo de Actions en FAQ abiertas: contraste transitorio

Evidencia remota aportada por el propietario: workflow Site and CMS quality #9, commit dd113be, falló en Check pages, navigation and accessibility. Resumen 41 comprobaciones y una infracción en expanded-menu-and-faq; no se recibió el detalle de regla del artefacto. La captura confirma fallo alojado, no fallo del despliegue Cloudflare.

Reproducción local: la animación appear aplicaba opacity 0→1 a los párrafos de details. Detenida al 25% mediante Web Animations, axe detecta color-contrast en cinco respuestas FAQ (1.9:1 frente al mínimo 4.5:1); al terminar la animación el mismo estado pasa. Es una causa reproducida compatible con el fallo dependiente del momento de medición; no se atribuye una regla al log remoto que no la muestra.

Corrección: retirar solo la interpolación de opacidad y conservar el desplazamiento suave de 3px y prefers-reduced-motion. Texto siempre opaco; sin desactivar color-contrast, exclusiones ni esperas para esconder el problema. Control negativo: reintroducir CSS anterior solo en página de prueba vuelve a detectar la infracción; CSS corregido pasa con las mismas cinco animaciones pausadas.

Auditoría ampliada a 42 estados/rutas con expanded-faq-animation-quarter en no-preference; conserva estado abierto normal y resto de pruebas. Logs ahora imprimen regla, selector, ayuda y causa, además del informe JSON del artefacto. Build 19 páginas/content:check y prueba de reproducción aprobados; resultado final de test:ci registrado al completar esta entrega. No repetir Lighthouse: no se cambia geometría ni carga de recursos.

Agente: Codex principal, sin subagentes. Identidad Git: Joel Alejandro Yañez Caballero. Solo rama feat/feature-catalog; sin despliegue ni push a feat/brand-foundation (publicado 9a017af). Siguiente paso exacto: revisar nueva ejecución de Actions del commit de esta entrega; debe mostrar 42 comprobaciones y cero infracciones. Si falla, abrir validate y copiar AXE + selector + causa o descargar accessibility-report.json del artefacto. API GitHub del entorno sigue sin acceso; no afirmar CI alojado verde hasta observarlo. Sin PR creada; PR existentes sin verificar.

Resultado final local: test:ci aprobado (19 páginas, 66 destinos, navegación sin JS/teclado/200% y menú con scripts externos bloqueados); axe 42 comprobaciones, cero infracciones. Informe accessibility-report.json regenerado. Incomplete conservados, no equivalen a aprobación WCAG completa.
