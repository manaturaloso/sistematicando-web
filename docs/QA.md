# Validación · 2026-11-03

> Estado vigente consolidado en [PROGRESS.md](PROGRESS.md) y [HANDOFF.md](HANDOFF.md). Versión servida af35674 confirmada por el JSON aportado por el propietario; revisión funcional y CI actual pendientes. Este documento conserva también registros anteriores.

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

## 2026-11-04 · Entrega responsive del logo, originales preservados

Brand.astro usa Image de Astro para generar PNGs de presentación a 256/512/768 px durante el build, con srcset y sizes acordes al clamp del CSS. Selección de logo y variante oscura siguen en content/site.json/Pages CMS; el raster activo se detecta con import.meta.glob de public/media. No se sobrescriben, recortan, reconstruyen ni cambian los originales; favicon y SVG conservan entrega directa. Metadatos reales del raster determinan proporción y reserva de espacio; dimensiones CMS siguen para fallback directo. Derivados estáticos bajo /_astro, sin endpoint de transformación en producción ni nueva dependencia.

Test:brand comprueba hashes de los tres originales, render/proporción/object-fit y selección de derivados con menor transferencia en seis anchos (320–1440), DPR 1 y 2, cabecera/pie y favicon. Datos en qa/brand-report.json: original claro 301321 bytes; navegador usa 13651 bytes en DPR1 y 31241 en DPR2, reducción 95.5%/89.6% en los casos medidos. Candidato 768 también generado para densidades mayores, no se afirma prueba de DPR3. Captura móvil revisada: marca sin recorte ni distorsión visible.

Check (40 archivos) y build (19 páginas) aprobados. Suite de sitio/accesibilidad y Lighthouse se registran al terminar esta entrega. La consulta de Actions de 8f6f44a sigue bloqueada por Forbidden; no afirmar CI remoto aprobado. Solo Codex principal, sin subagentes. Autor Joel Alejandro Yañez Caballero. Sin publicación ni push a rama seguida; Worker permanece en 9a017af. Sin PR creada; PR existentes no verificadas por API.

Siguiente paso exacto: comprobar Actions del commit de esta entrega; si falla revisar líneas AXE y artefacto, sin desactivar reglas. Después revisión manual de catálogo/demo/privacidad/admin en móvil y lector de pantalla y definición comercial/legal. Para reflejar correcciones en el Worker debe autorizarse una integración concreta; mantener DNS/noindex.

Validación final de entrega responsive: test:brand aprobado (12 combinaciones ancho/DPR, cabecera y pie); test:ci aprobado (19 rutas/66 destinos, navegación y 42 comprobaciones axe sin infracciones). Lighthouse final tres rutas: rendimiento/accesibilidad/buenas prácticas 100 y SEO 66 por noindex. Informes regenerados; originales sin cambios. Próxima revisión de CI remoto corresponde al SHA final de esta entrega, no solo a 8f6f44a.

## 2026-11-04 · Validación de marca incorporada a CI

El flujo test:ci ahora ejecuta verify-brand junto a sitio, navegación y axe. Workflow adjunta brand-report.json al artefacto y elimina los tres informes anteriores antes de comenzar para no reutilizar evidencia vieja si falla el build. Sin deploy, cambios de permisos ni secretos.

La prueba de marca sigue las selecciones actuales del CMS: verifica hashes de cada original configurado, el logo claro u oscuro correspondiente a cabecera/pie, o el nombre textual si el campo queda vacío, y favicon opcional. Proporción contrastada con dimensiones reales del original, no con el raster claro compartido; permite SVG/directos y archivos pequeños sin imponer una reducción artificial. En raster grande compatible exige srcset y derivados; para originales >100 KB verifica menor transferencia. Recorre seis anchos a DPR1/2. No cambian componentes, contenido ni originales de marca.

Reproducción: CHROMIUM_PATH=/usr/bin/chromium npm run test:ci. Sitio 19 páginas/66 destinos, navegación y marca configurada aprobados; axe final registrado al completar. No repetir build/Lighthouse porque esta entrega cambia solo pruebas/workflow y usa el mismo build verificado de 296dc05. Comportamientos de fallback se codifican en la prueba; la ejecución de esta entrega usa los PNG oficiales seleccionados, no se afirma prueba alojada ni una edición CMS nueva.

Agente Codex principal, sin subagentes; autor Joel Alejandro Yañez Caballero. Rama feat/feature-catalog; no se crea PR ni despliega Worker. Publicado sigue 9a017af. PR existentes y Actions remoto sin verificar por API Forbidden; se solicitó al propietario el resultado observado de 296dc05. Siguiente paso exacto: revisar Actions del nuevo SHA de entrega y descargar brand-report.json si falla marca, accessibility-report.json/líneas AXE si falla accesibilidad; tras verde revisar manualmente y autorizar cualquier integración concreta al Worker. Quedan verificación comercial, tarifas, privacidad y revisión con dispositivos/lector de pantalla.

Resultado final: test:ci ampliado aprobado (sitio 19 rutas/66 destinos, navegación, marca 12 combinaciones y axe 42 comprobaciones sin infracciones). node --check de ambos scripts y parseo YAML/triggers/permisos/artefacto aprobados; informe de marca regenerado. Resultado alojado del nuevo SHA pendiente de observar.

## 2026-11-04 · Textos dinámicos editables desde el CMS

Implementado: en Página: funcionalidades → Buscador y resultados se editan ejemplo de búsqueda, recuento inicial/singular/plural y etiqueta accesible de áreas. En Página: solicitar-demo → Documento y mensajes de la guía local se editan encabezado, etiquetas del documento, lista de preguntas, aviso de alcance, nombre accesible y mensajes de generación/descarga. Fuente content/pages.json; .pages.yml regenerado, conserva 23 editores y los contenidos existentes. Opción «Otra operación» usa ahora el texto editorial como valor en el documento.

Los recuentos exigen exactamente un {count}; content:check rechaza marcador ausente/duplicado/desconocido y guía con campos/preguntas vacíos. Texto compartido con el navegador en atributos escapados por Astro y mostrado con textContent, sin ejecutar HTML ni enviar solicitudes. La guía continúa siendo local, descargable como TXT y se invalida al cambiar opciones. Los avisos editoriales deben conservar esa realidad; las descripciones del CMS lo explican.

Pruebas: check/build aprobados (19 páginas, 14 módulos, 3 guías y 23 editores). test:ci ampliado incluye verify-editorial.mjs: ejemplo/recuentos/etiquetas, documento generado, descarga real con bytes coincidentes y mensajes/invalidación; también sitio 19 rutas/66 destinos, navegación, marca y axe 42 comprobaciones sin infracciones. Prueba negativa rechazó marcadores ausentes, duplicados y ajenos, restaurando contenido. Prueba con copia editorial temporal se documenta al completar y restaura contenido/build. Sin nuevas páginas ni capacidades SaaS.

Estado remoto conocido: el propietario confirmó Actions verde para 296dc05; ese dato no confirma 7537903 ni este nuevo SHA. API del entorno no permite consultar Actions/PR. Publicado sigue 9a017af; esta entrega solo feat/feature-catalog. Autor Joel Alejandro Yañez Caballero. Agente Codex principal, sin subagentes. Sin PR creada; existentes sin verificar. No se publica ni cambia DNS/indexación.

Siguiente paso exacto: revisar Actions del commit de esta entrega; después abrir los dos editores citados en Pages CMS de feat/feature-catalog y revisar sus campos nuevos. La configuración del CMS llega con el commit, no requiere crear otra cuenta. Para ver estas mejoras en el Worker se necesita una integración autorizada de la versión concreta. Quedan revisión manual con dispositivos/lector y definición comercial/legal; no inventar tarifas ni marcar módulos disponibles sin evidencia.

Prueba editorial personalizada aprobada: ejemplo con comillas/< /&, recuentos alternativos y guía con encabezado/preguntas/avisos propios llegan al render y al TXT. Texto parecido a HTML conservado literalmente. Contenido original de entrega y build restaurados al terminar. No quedan fixtures ni mensajes temporales.

## 2026-11-04 · Página de contacto y acceso editorial

Implementado /contacto/: WhatsApp comercial confirmado reutilizando el componente existente; bloque distinto de privacidad con mailto y WhatsApp sin mensaje comercial, responsable/RUC/domicilio/canales leídos de content/contact.json. No se añade formulario, backend ni promesa de atención inmediata/presencial. Se explica que abrir un canal no envía solicitud ni reserva y que correo/WhatsApp son externos; política sigue en revisión. Enlaces a guía local y FAQ. No se enviaron mensajes reales.

Textos de la nueva página en content/pages.json, editor Página: contacto, .pages.yml regenerado (24 editores). Footer incluye Contacto; /admin tiene accesos directos a contacto, textos del catálogo y guía de demo. CSS propio reutiliza la identidad existente y mantiene proporción de logos. Empaquetador exige contacto/index.html y deriva resto de rutas.

Pruebas: check 42 archivos, cero errores/advertencias; content:check 14 módulos/3 guías/24 editores; build 20 páginas. Test editorial comprueba destinos exactos de WhatsApp comercial/privacidad y correo, sin navegar a terceros, tanto con JS como sin JS; cero formularios y responsable correcto. Comprueba overflow en cinco anchos y genera capturas móvil/escritorio. Suite completa y paquete registrados al finalizar. No se repite Lighthouse histórico de tres páginas ni se atribuyen sus métricas a esta página nueva.

Agente Codex principal, sin subagentes. Autor Joel Alejandro Yañez Caballero. Rama feat/feature-catalog; publicado sigue 9a017af, sin deploy/DNS/indexación nuevos ni PR creada. PR existentes y Actions nuevo sin verificar por API Forbidden; propietario confirmó verde 296dc05, no los SHA posteriores. Siguiente paso exacto: comprobar Actions del commit de esta entrega y revisar contacto/privacidad/canales; luego revisión manual con dispositivos/lector y definición comercial/legal. Cualquier integración al Worker requiere autorización de una versión concreta.

Validación final contacto: test:ci aprobado (20 rutas/68 destinos internos, navegación, marca y prueba editorial/canales con JS/no-JS); axe 44 comprobaciones, cero infracciones automáticas. Se conservan incomplete aparte. Captura móvil revisada. Paquete estático /tmp/sistematicando-contact-review.zip verificado: 20 páginas, sin fuentes internas ni docs; no desplegado.

## 2026-11-04 · Identificación de versión servida

Implementado endpoint estático /version.json y sección de solo lectura en /admin: commit base, fecha del commit y sourceModified. Metadatos obtenidos de Git durante build; no hay consulta dinámica ni datos de entorno/autor/correo/credenciales. sourceModified comprueba código/contenido/configuración relevantes y distingue una compilación local con cambios sin commit; documentación e informes de QA no alteran ese indicador. Sin Git se devuelven null y el panel declara desconocido, sin inventar SHA.

public/_headers aplica no-store y X-Robots-Tag noindex, nofollow a /version.json; Worker local confirmó ambas cabeceras y MIME JSON. El dato permite comparar archivos servidos con el commit del Build en Cloudflare, sin confundir ID de versión de Cloudflare ni confirmar éxito de despliegue por sí solo. Rebuild después de cambiar HEAD para actualizarlo. Son 20 páginas HTML más el JSON; 24 editores CMS sin cambios. El identificador generado no es editable desde CMS.

Pruebas: check 44 archivos sin errores/advertencias, build y content:check aprobados. verify-version (añadido a CI) valida fixture Git limpio, modificado y sin Git, campos permitidos y coincidencia JSON/admin con checkout. Worker local: 31 comprobaciones de rutas, fuentes/marca, JSON y cabeceras, query, 405 y navegador móvil aprobados; servidor detenido. Suite del sitio y axe registrados al terminar.

Última integración Git autorizada fue 96bd165 en ambas ramas; su despliegue real todavía no está confirmado desde el entorno. Esta mejora solo feat/feature-catalog, sin nueva publicación, PR creada ni cambio DNS. PR existentes y CI remoto no verificables por API. Autor Joel Alejandro Yañez Caballero; agente Codex principal, sin subagentes.

Siguiente paso exacto: comprobar Actions del SHA de esta entrega. Si se autoriza integrar esta mejora en feat/brand-foundation, comprobar después /version.json y /admin frente al SHA del build. La URL pública actual todavía puede responder 404 a /version.json porque no incluye esta mejora; no interpretarlo como fallo de la versión anterior. No se retira noindex. Quedan dispositivos/lector y validación comercial/legal.

Resultado final local: test:ci aprobado (20 rutas/69 destinos, navegación, marca/editorial/contactos, identificación de versión y axe 44 comprobaciones sin infracciones). Worker local 31 rutas más JSON/cabeceras aprobado y detenido; no se publicó. Identificación de versión cubre también los escenarios limpio/modificado/sin Git. Se recompila después de guardar el commit para reflejar su identificador.

## 2026-11-04 · Pruebas compatibles con etiquetas del CMS

Las pruebas activas de navegación, auditoría de estados y Worker dejan de depender de textos fijos «Menú», etiquetas de selects, nombres de sectores/opciones y botón de generar. Usan IDs/clases de controles o nombres accesibles obtenidos del contenido actual. Verify-editorial conserva verificación semántica de etiquetas/botones y búsqueda contra pages.json; no se desactivan reglas axe ni controles de accesibilidad. Corregido además el resumen generado de FEATURE_STATUS: CMS ya conectado y con guardado real, sin cambiar los 14 estados SaaS.

Validación: build/content:check y test:ci aprobados (20 rutas/69 destinos, marca/editorial/versión y axe 44 comprobaciones sin infracciones). Prueba temporal adicional cambió nombre del menú/salto, etiqueta del buscador, campos/botones y opciones de demo: navegación y documento/descarga pasaron. Se restauraron los dos archivos editoriales y el build en finally; no se modificaron textos reales ni se hicieron escrituras CMS.

Durante la ejecución el usuario notificó «stream disconnected before completion»: es un aviso de interrupción del canal de respuesta, no una evidencia de fallo del sitio. Se comprobó el checkout: seis archivos de pruebas/documentación conservados, sin pérdida ni cambios de contenido. Se termina y guarda esta entrega en feat/feature-catalog. No hay nuevo despliegue; rama seguida por Worker sigue af35674, estado remoto del despliegue aún no confirmado por el entorno.

Autor Joel Alejandro Yañez Caballero; Codex principal, sin subagentes. Sin PR creada; existentes y Actions actual no verificables por API. Siguiente paso exacto: revisar Actions del SHA de esta entrega; usar CMS para editar etiquetas sin que las pruebas exijan la copia anterior. Continuar revisión manual con dispositivos/lector y validación comercial/legal. No integrar ni publicar otra versión sin autorización correspondiente. Recompilar tras cambiar HEAD para actualizar version.json.

## 4 de noviembre de 2026 · Versión pública identificada por el propietario

Evidencia: JSON pegado por el usuario desde /version.json, guardado íntegro en qa/deployed-version-af35674.json. SHA af3567400d596d0f9e386de1cee47e5297985187, fecha 2026-11-04T21:47:13+00:00 y sourceModified false. Contrastados con ref remota feat/brand-foundation y fecha Git; coincidencia exacta/instante equivalente. Confirma identidad de la copia servida; no implica que el agente accediera directamente, CI actual verde ni revisión funcional de todas las páginas.

Se actualizan resúmenes/continuidad para no repetir el bloqueo de verificación ya resuelto por el usuario. Cambios solo documentales, sin despliegue. Agente Codex principal, identidad Joel Alejandro Yañez Caballero; sin PR creada, existentes no verificadas por API. Siguiente paso: revisión funcional manual y CI del HEAD, luego pendientes comerciales/legales.
