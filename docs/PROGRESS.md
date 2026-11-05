# Progreso y continuidad

Estado consolidado: 5 de noviembre de 2026 (America/Lima). Este archivo sustituye como resumen activo a [PROGRESS_HISTORY.md](PROGRESS_HISTORY.md), que conserva íntegro el registro anterior.

## Git y estado externo

- Repositorio manaturaloso/sistematicando-web. Desarrollo/CMS feat/feature-catalog; rama seguida por Worker feat/brand-foundation.
- Base Git de esta entrega: 43645c0 en desarrollo. Rama Worker preservada en 557222e, última integración anterior autorizada. Ahora el propietario confirma producto parcial y pide web de lanzamiento completa, sin nuevas publicaciones hasta preparación al 100% y autorización final.
- Nuevos cambios de esta entrega solo en desarrollo. Consultar git log -1 para SHA final. Fetch sin novedades concurrentes; push/ref se verifican al entregar.
- Worker de revisión existente: https://sistematicando-web.manaturaloso.workers.dev. Última identidad pública aportada por usuario: af35674; el envío posterior 557222e no se ha confirmado desde el entorno. Esta entrega no actualiza el Worker.
- API GitHub y hostname estuvieron bloqueados por Forbidden/CONNECT 403. Verde remoto de 296dc05 confirmado por el propietario; no inferir verde para los nuevos SHA. No se crearon PR; existentes sin verificar.

## Implementado

Astro 7.4.5, TypeScript 6.0.3, Node 24.22.1 y Wrangler 4.157.0 fijados. Sitio estático; no hay integración SaaS ni receptor propio de solicitudes.

42 páginas HTML en desarrollo: 14 páginas individuales de módulos más home, 404, contacto, admin, catálogo, precios informativos, guía de demo, privacidad en revisión, índice de soluciones y seis sectores, recursos y tres guías, FAQ, Nosotros, Ayuda, índice de Blog con tres artículos e Implementación, más términos de uso en borrador. Inventario en [SITEMAP.md](SITEMAP.md).

- Catálogo de 14 módulos, cinco áreas y páginas individuales con beneficios/recorrido/ámbito de lanzamiento, todo editable. Búsqueda, recuentos y estado vacío; sin JS se conserva el catálogo. La matriz interna conserva evidencia/estados reales, sin convertir el copy objetivo en validación del SaaS.
- Guía local: tres selecciones, validación, resumen, descarga TXT, reset e invalidación al cambiar opciones. Generar/descargar no envía datos ni reserva una demo.
- WhatsApp comercial autorizado y canales separados de privacidad en contacto/demo. Datos confirmados en `content/contact.json`; política aún para revisión/adopción.
- Pages CMS conectado a GitHub, con guardados reales comprobados (commits `1206881`–`55f79ee`). `/admin/` abre el servicio externo autenticado; 34 editores, medios y contenido `content/*.json`. No es un constructor visual arbitrario.
- Textos dinámicos del buscador y del documento/avisos de demo editables. Recuentos requieren exactamente un `{count}`; validación antes del build.
- Logos originales en `public/media`, hashes conservados. Astro genera PNGs de presentación de 256/512/768 px con srcset; favicon/SVG directos. Fuentes locales Gluten/Manrope y licencias.
- Menú progresivo con teclado/Escape, texto ampliado y navegación sin JS; inicialización temprana y precarga de fuentes. FAQ sin pérdida transitoria de contraste por opacidad.
- `/version.json` y panel de versión en `/admin/`: commit, fecha del commit y cambios locales de fuente. Build estático; sin Git devuelve null. Worker aplica no-store/noindex al JSON. No es un indicador de éxito del despliegue.
- Workflow `Site and CMS quality`: check, dry-run, sitio, navegación, marca, editorial/descarga, versión y axe; artefactos de QA. No despliega.

## Pruebas y evidencia

Última suite frontend de la entrega visual anterior (no se repite por cambios solo del auditor). La medición de rendimiento actual figura después y en PERFORMANCE.md:

| Comprobación | Resultado observado |
| --- | --- |
| Check/build/content | Sin errores; 42 páginas HTML más JSON de versión, 34 editores. |
| Sitio | 42 rutas y 162 destinos internos. |
| Navegación | Sin JS, teclado/Escape, salto al contenido, texto 200% en 31 rutas a 390/1280 px, home/pie en cinco anchos a 100/200% y scripts externos bloqueados. |
| Marca | Seis anchos a DPR1/2, originales por hash, variantes y transferencia responsive. |
| Editorial/contacto | Canales JS/no-JS sin mensajes reales; copia CMS, descarga TXT e invalidación. |
| Versión | Git limpio/modificado/ausente; JSON/admin coincidentes; Worker no-store/noindex. |
| Axe | 88 comprobaciones, cero infracciones detectadas. Incomplete conservados; no certificación WCAG. |
| Worker local | 53 comprobaciones de rutas más JSON/cabeceras, assets, query, POST 405 y navegador. |
| Etiquetas personalizadas (entrega anterior) | Menú, buscador, campos, botones y opciones editados temporalmente; pruebas aprobadas; fuentes y build restaurados. |

Informes en `docs/qa`. Medición actual de cinco rutas en PERFORMANCE.md: cuatro con rendimiento 100; módulo 86 inicial y 100/100 en dos repeticiones sin cambios frontend. Accesibilidad/buenas prácticas 100 y SEO 66 por noindex. No son métricas de producción ni auditoría de todas las páginas.

Esta entrega: auditor de rendimiento ampliado a cinco rutas, identidad del build, métricas/peso y repeticiones focales; siete mediciones y anomalía conservada, sin cambios del frontend. Se conservan Nosotros, Ayuda y Blog con tres artículos. Se conservan las 14 páginas de módulos y el copy de lanzamiento en home/sectores/FAQ/precios. Vista previa global (launchDraft true), 34 editores y matriz real intacta. Check/build, sitio/navegación/marca/editorial/módulos/versión, nuevos recorridos editoriales, auditoría axe aislada, Worker local y paquete verificados. Lighthouse actual actualizado a cinco rutas y dos repeticiones focales; ver PERFORMANCE.md. No se publica.

## Fases y pendientes

El plan original numera 0–10: inicialización y base visual completadas; home/soluciones/catálogo/contacto/precios informativos/recursos/CMS implementados. Cierre de QA y verificación del Worker en curso (fases 8–9). Lanzamiento oficial (10) pendiente.

Pendientes reales: CI de los SHA actuales; revisión manual con dispositivos/lector de pantalla; evidencia del SaaS y tarifas; revisión/adopción de privacidad y otros textos legales; dominio/canonicals/sitemap/indexación autorizados. Las páginas de módulos están preparadas como objetivo comercial; su disponibilidad operativa sigue por acreditar. No hay backend propio de leads.

## Siguiente paso exacto

1. Revisar Actions del SHA final y RELEASE_CHECKLIST.md, que enumera las 42 páginas, comprobaciones automáticas y siete pendientes externos/manuales.
2. Revisar compatibilidad de menú/buscador/guía con movimiento reducido y preparar matriz de navegadores; probar Firefox/WebKit cuando estén disponibles. La medición de cinco rutas y repetición de la anomalía ya están documentadas en PERFORMANCE.md. La revisión visual local está registrada en VISUAL_REVIEW.md; no confundirla con dispositivos físicos o lector de pantalla. El cierre automatizado de metadatos/enlaces/errores ya está implementado. Usar LEGAL_REVIEW.md para decisiones legales pendientes; no rehacer los términos ya preparados ni confundirlos con un contrato SaaS aprobado. El recorrido comercial, Empresa, Ayuda y Blog ya están implementados. Preparar la web objetivo completa; no bloquear frontend pidiendo otra vez verificar el producto parcial ya confirmado. No inventar tarifas, certificaciones ni condiciones.
3. Mantener launchDraft/noindex; no publicar, integrar ni pedir despliegue ahora. El propietario confirmará cuando producto y web estén al 100% y autorizará lanzamiento. Rama Worker sigue 557222e.
4. Antes del lanzamiento: confirmar evidencias operativas, precios/condiciones, legal/privacidad, dominio/indexación y pruebas con dispositivos/lector. Fuente actual de implementación/evidencias internas en FEATURE_STATUS.md.
5. Continuidad HANDOFF.md y AGENTS.md. Autor Joel Alejandro Yañez Caballero; Codex principal, sin subagentes. No se creó PR, existentes sin verificar por API.

Agente usado: Codex principal, sin subagentes. Identidad obligatoria: Joel Alejandro Yañez Caballero, joel.yc23@gmail.com. No reescribir commits publicados ni desplegar/cambiar DNS sin autorización. Las autorizaciones previas son entregas concretas.

## Confirmación de versión pública · 4 de noviembre de 2026

El propietario pegó el JSON de /version.json: af3567400d596d0f9e386de1cee47e5297985187, fecha 2026-11-04T21:47:13+00:00, sourceModified false. Coincide con la referencia remota de feat/brand-foundation y fecha de commit en Git. Validación documental/schema/SHA/fecha y diff; sin repetir pruebas de aplicación ni nuevo despliegue. No equivale a auditoría de todas las rutas ni CI remoto aprobado. Solo Codex principal; sin PR creada, existentes sin verificar por API.

## 4 de noviembre de 2026 · Publicación de corrección de reflujo autorizada

El propietario respondió «Sí, autorizo» a integrar c1b0baf en feat/brand-foundation para publicar la corrección de texto ampliado. Fetch confirmó origen c1b0baf y destino af35674 sin cambios concurrentes; destino antecesor. Se agrega solo este registro documental, se integra por fast-forward y se envía mediante push normal, preservando historial. Consultar git log -1 y referencias remotas para SHA final.

Código aprobado sin nuevas modificaciones: check 45 archivos/build 20 páginas; test:ci 28 rutas/69 destinos y axe 44 comprobaciones; reflujo 200% en seis rutas a 390/1280 y pruebas de foco/teclado; Lighthouse local 100 en las tres rutas medidas. Antes del push se recompila con dry-run y se verifica versión contra el nuevo commit y sourceModified false. No se repite la suite por el registro documental.

Última copia pública confirmada por el propietario antes de esta entrega: af35674. El nuevo build/versión activa queda pendiente de comprobar; no se afirma éxito por el push. API/hostname del entorno siguen restringidos. Sin DNS/noindex/bindings nuevos; autor Joel Alejandro Yañez Caballero. Solo Codex principal, sin subagentes. Sin PR creada; existentes sin verificar.

Siguiente paso: comprobar Cloudflare Build/SHA final, Ready y /version.json; comparar commit y sourceModified false. Revisar texto 200% en móvil en contacto/demo/catálogo/admin y portada. Continuar desarrollo en feat/feature-catalog sincronizada; esta aprobación no autoriza otras publicaciones. Pendientes reales: dispositivos/lector, CI remoto actual y evidencia comercial/legal.

Vista previa de lanzamiento preparada según la directiva del propietario; 14 páginas nuevas, pruebas de contenido de módulos y política de no publicación documentadas el 4 de noviembre de 2026 (America/Lima).

## Incidencias de verificación de la entrega editorial anterior

La primera ejecución test:ci se detuvo porque Playwright no tenía navegador descargado; se usó CHROMIUM_PATH=/usr/bin/chromium, navegador ya instalado. La ejecución siguiente pasó sitio/navegación/marca/editorial/módulos/recursos/versión; su auditoría axe coincidió con el rebuild automático al arrancar worker:dev y analizó una respuesta de error transitoria en punto-de-venta. Se detuvo Worker y se repitió axe aisladamente sobre dist estable. El auditor ahora exige HTTP 200 para no tratar páginas de error como resultados de accesibilidad del producto. No se debilitaron reglas ni se excluyó ninguna ruta. Informes finales en docs/qa; no se infiere CI remoto verde.

## 5 de noviembre de 2026 · Recorrido comercial e implementación

Nueva ruta /implementacion/: cuatro etapas propuestas, contexto de preparación y responsabilidades a acordar. Precios enlaza directamente a cada etapa; demo permite continuar hacia implementación. No se han aprobado tarifas, tiempos, migraciones, capacitación, SLA ni servicios: la propuesta debe concretarlos por caso. Todo editable en implementation.json y pages.json; dos editores nuevos (32 total).

El párrafo de WhatsApp usa texto CMS con un único marcador {phone}, validado antes de build. Teléfono real sigue centralizado; la guía no se adjunta ni modifica el mensaje comercial. Nuevas pruebas de recorrido por teclado con/sin JavaScript; la guía interactiva sigue oculta si no hay JS y los enlaces de contacto/preparación permanecen accesibles.

Agente: Codex principal, sin subagentes. Se conserva el bloqueo de publicación y la evidencia operativa real. Próximo paso exacto: auditoría de contenido legal de privacidad y alcance de términos, sin convertir borradores en condiciones aprobadas. Consultar git log -1 para SHA final; sin PR creada, pendientes externos sin verificar.

Verificación final de esta entrega: check 54 archivos sin errores/advertencias/hints, build 41 páginas, 32 editores, suite completa aprobada (41 rutas/152 destinos, reflujo 28 rutas × dos anchos, recorrido comercial con/sin JS y axe 86 comprobaciones sin infracciones). Worker local 52 verificaciones aprobado y detenido; paquete de 41 páginas validado, capturas revisadas. Lighthouse histórico sin repetir. Git remoto base 3de5f3e y rama Worker 557222e comprobados antes de editar; el push final debe verificarse con ls-remote. No hay cambios concurrentes observados.

## 5 de noviembre de 2026 · Privacidad y términos del sitio

/legal/terminos/ implementada como borrador de ocho secciones, índice por teclado y contactos separados. Textos/identidad desde CMS, dos editores nuevos (34 total); privacidad corregida según comportamiento local y administración externa. No hay contratación ni aceptación simulada; contrato SaaS y aprobación de términos siguen pendientes en LEGAL_REVIEW.md.

Validación: check 56 archivos sin errores/advertencias/hints; build 42 páginas; test:ci aprobado, 42 rutas/162 destinos, reflujo en 30 rutas y axe 88 comprobaciones sin infracciones. Prueba legal con/sin JS y guía sin solicitudes externas/cookies/persistencia local. Worker local 53 verificaciones aprobado y detenido. Revisión visual y corrección de numeración del índice; recorridos legales/navegación repetidos tras el ajuste. Paquete local sin desplegar. Un id reservado fue rechazado por content:check y corregido antes del build final; no se desactivaron validaciones.

Rama de trabajo feat/feature-catalog, base remota 7fb5d9c y rama Worker 557222e comprobadas antes de editar. Consultar git log -1 para SHA final; verificar push con ls-remote. Sin PR creada; pendientes existentes y verde remoto no verificados por API. Autor Joel Alejandro Yañez Caballero, Codex principal sin subagentes. Próximo paso exacto: checklist consolidado de cierre por página/recorrido y revisión de metadatos, navegación y errores; mantener congelación de publicación.

Comprobación final del ajuste del índice: cuatro análisis axe focales (privacidad/términos a 390/1440) sin infracciones; evidencia adicional en qa/legal-report.json. Para axe usar browser.newContext() explícito: la comprobación puntual inicial con browser.newPage() fue rechazada por la API antes del análisis y se corrigió. Check final: 56 archivos, cero errores/advertencias/hints.

## 5 de noviembre de 2026 · Checklist de cierre y metadatos

42 páginas / 34 editores, sin nuevas rutas. 404 con descripción propia, destino principal identificable y salidas a Inicio/Ayuda; seis guías/artículos con OG article. verify-site comprueba metadatos únicos/coherentes, idioma/viewport, noindex, enlaces y fragmentos. Informes de sitio/axe incorporan identidad del build. audit:release genera RELEASE_CHECKLIST.md y qa/release-report.json solo con cobertura completa y evidencias coincidentes; mantiene siete pendientes externos/manuales y readyToPublish false.

Pruebas reales: check final 58 archivos sin errores/advertencias/hints; build 42 páginas; suite completa aprobada (42 rutas/162 destinos, reflujo 31 rutas × dos anchos, marca/editorial/módulos/recursos/legal/versión y axe 88 comprobaciones sin infracciones). Verificador adicional rechazó build obsoleto, ruta ausente y fallo axe simulado, restaurando fuentes de evidencia y conservando la salida válida. Worker local: 53 comprobaciones más recuperación desde 404 por teclado sin/con JS; servidor detenido. Captura 404 móvil revisada y ZIP de 42 páginas validado. Lighthouse conserva evidencia histórica, sin repetir.

La matriz identifica la instantánea de trabajo validada (base 47ce92a, sourceModified true), no se cambia su SHA para hacerla pasar por el commit final. Tras commit se recompila y verifica versión; CI regenerará informes para su build. Esta distinción evita confundir snapshot, commit y despliegue. Estado remoto inicial 47ce92a en desarrollo y Worker 557222e confirmado; comprobar push/ref al entregar. Sin PR creada; pendientes existentes/verde remoto sin verificar por API.

Codex principal, sin subagentes; identidad Joel Alejandro Yañez Caballero. Próximo paso exacto: revisión visual sistemática móvil/escritorio y estados del buscador/guía/menú, registrando hallazgos contra RELEASE_CHECKLIST.md. Mantener noindex/borrador y rama Worker intacta; no publicar.

## 5 de noviembre de 2026 · Revisión visual local

Se capturaron 42 rutas × 390/1440 (84 combinaciones), primeras pantallas/páginas completas/pies y once estados de menú/buscador/guía; hojas de primeras pantallas revisadas, cuerpos representativos y estados revisados. Registro humano y límites en VISUAL_REVIEW.md; geometría y referencias temporales en qa/visual-report.json. La galería completa se reproduce con review:visual y permanece bajo /tmp; no se guarda toda en Git ni se sirve en el Worker.

Corregido: pie móvil adaptable (857 → 573 px de alto a 390/100%, doce enlaces ≥44 px), separación de acciones de implementación, desbordamiento FAQ 320/200% (346 px antes) y adorno home 900/200% (908 px antes). Sin recortar contenido ni alterar logos. La nueva prueba de cinco anchos × 100/200% detectó estos dos fallos y pasó tras corregirlos. Capturas de componentes con altura suficiente evitan el sticky header sobre campos al tomar imágenes; no se cambia el comportamiento del producto para capturar.

Pruebas finales: check 59 archivos sin errores/advertencias/hints, build 42 páginas / 34 editores; suite completa aprobada (42 rutas/162 destinos, reflujo 31 rutas más cinco anchos de home/pie, marca/editorial/módulos/recursos/legal/versión, axe 88 sin infracciones, checklist y tres casos negativos de evidencia). Worker local 53 comprobaciones aprobado y detenido; ZIP de 42 páginas validado. Lighthouse anterior sin repetir. No se afirma prueba con dispositivos físicos, lector ni todos los motores, ni aprobación exhaustiva de cada texto.

Base remota b6d1d22 y Worker 557222e comprobados antes de editar; consultar git log -1 y verificar push/ref al entregar. Informes corresponden a la instantánea de trabajo; no se reasignan al SHA posterior al commit. Autor Joel Alejandro Yañez Caballero; Codex principal, sin subagentes. Sin PR creada; pendientes existentes y CI remoto sin verificar por API. Sin nueva publicación ni DNS. Siguiente paso exacto: medir rendimiento de home, catálogo, demo, módulo y artículo, optimizar solo con evidencia y conservar bloqueo de lanzamiento.

## 5 de noviembre de 2026 · Rendimiento de cinco rutas

Auditor ampliado a cinco rutas existentes, identidad Git del build, métricas/payload/configuración y JSON completos en carpeta /tmp única. Repeticiones focales --route/--runs y --output bajo /tmp preservan el informe principal. Check final 59 archivos limpio; build 42 páginas / 34 editores. Siete Lighthouse reales: home/catálogo/demo/artículo 100; módulo 86 inicial con LCP 4.204 s, luego 100/100 y LCP 0.906/0.903 s sin cambios de código frontend. Accesibilidad/buenas prácticas 100; SEO 66 por noindex deliberado. No se descarta la muestra lenta ni se atribuye causa no demostrada.

La anomalía no se reprodujo; no se aplican cambios de CSS/fuentes/logos/caché sin evidencia estable. Oportunidades de laboratorio y limitaciones en PERFORMANCE.md, métricas originales y repeticiones en docs/qa. Pendiente contrastar la variación en un entorno público autorizado; no son Core Web Vitals ni rendimiento del Worker. Suite funcional/axe/Worker previa conservada, sin repetir porque no cambió frontend, contenido ni dependencias.

Rama desarrollo feat/feature-catalog, base remota 43645c0 y Worker 557222e comprobados al iniciar. Consultar git log -1 para commit final y verificar push/ref al entregar; sin PR creada, existentes/CI remoto sin verificar por API. Autor Joel Alejandro Yañez Caballero; Codex principal, sin subagentes. Sin publicación/DNS ni cambios de indexación.

Siguiente paso exacto: comprobar menú/buscador/guía con movimiento reducido y preparar matriz de navegadores; ejecutar Firefox/WebKit cuando estén disponibles y registrar límites. Continúan pendientes dispositivos físicos/lector, producto/comercial/legal, dominio y autorización final.
