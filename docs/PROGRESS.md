# Progreso y continuidad

Estado consolidado: 6 de noviembre de 2026 (America/Lima). Este archivo sustituye como resumen activo a [PROGRESS_HISTORY.md](PROGRESS_HISTORY.md), que conserva íntegro el registro anterior.

## Git y estado externo

- Repositorio manaturaloso/sistematicando-web. Desarrollo/CMS feat/feature-catalog; rama seguida por Worker feat/brand-foundation.
- Base Git de esta entrega: 9d2f2f1 en desarrollo. Rama Worker preservada en 557222e, última integración anterior autorizada. Ahora el propietario confirma producto parcial y pide web de lanzamiento completa, sin nuevas publicaciones hasta preparación al 100% y autorización final.
- Nuevos cambios de esta entrega solo en desarrollo. Consultar git log -1 para SHA final. Fetch sin novedades concurrentes; push/ref se verifican al entregar.
- Worker de revisión existente: https://sistematicando-web.manaturaloso.workers.dev. Última identidad pública aportada por usuario: af35674; el envío posterior 557222e no se ha confirmado desde el entorno. Esta entrega no actualiza el Worker.
- API GitHub y hostname estuvieron bloqueados por Forbidden/CONNECT 403. Verde remoto de 296dc05 confirmado por el propietario; no inferir verde para los nuevos SHA. No se crearon PR; existentes sin verificar.

## Entrega actual: base de autenticación alojada (sin desplegar)

Base GitHub App/cookies/permisos implementada y probada con respuestas sintéticas; servidor separado y desactivado sin configuración. Leer HOSTED_VISUAL_AUTH.md. No es todavía un CMS visual alojado conectado: faltan App/origen/secretos, prueba real autorizada y guardado remoto. El editor visual local continúa operativo. 43 páginas HTML / 34 editores, sin publicación.

## Propuesta de precios implementada

Por encargo expreso del propietario: Esencial S/99, Gestión S/199 y Multisede S/399/mes; puesta en marcha S/199, S/399 y S/699. Complementos S/39 facturación, S/79 eventos/accesos y S/99 sede adicional, con unidades y exclusiones explícitas. PRICING_STRATEGY.md registra funciones, cupos y criterio. /precios terminado como borrador comercial editable: tarjetas, primer mes calculado, tabla de 14 módulos, extras y WhatsApp sin envío. No se modifica evidencia del SaaS. FAQs/términos y esquema CMS actualizados. 42 páginas/34 editores.

Siguiente paso exacto vigente: contrastar costes/margen, capacidad de puesta en marcha, tributación y condiciones finales; revisar paquete y CI real. El diseño de planes ya fue delegado y resuelto; no volver a pedir esa elección. Sin publicación. Agentes: Codex principal solamente.

## Implementado

Astro 7.4.5, TypeScript 6.0.3, Node 24.22.1 y Wrangler 4.157.0 fijados. Sitio estático; no hay integración SaaS ni receptor propio de solicitudes.

43 páginas HTML en desarrollo: 14 páginas individuales de módulos más home, 404, contacto, admin, catálogo, planes y precios propuestos, guía de demo, privacidad en revisión, índice de soluciones y seis sectores, recursos y tres guías, FAQ, Nosotros, Ayuda, índice de Blog con tres artículos e Implementación, más términos de uso en borrador. Inventario en [SITEMAP.md](SITEMAP.md).

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

Suite local de la revisión editorial/recorridos actual. Firefox/WebKit no ejecutados localmente; CI estricta preparada, pendiente de observar:

| Comprobación | Resultado observado |
| --- | --- |
| Check/build/content | Sin errores; 42 páginas HTML más JSON de versión, 34 editores. |
| Sitio | 42 rutas y 166 destinos internos. |
| Navegación | Sin JS, teclado/Escape, salto al contenido, texto 200% en 32 rutas a 390/1280 px, home/pie en cinco anchos a 100/200% y scripts externos bloqueados. |
| Marca | Seis anchos a DPR1/2, originales por hash, variantes y transferencia responsive. |
| Editorial/contacto | Canales JS/no-JS sin mensajes reales; copia CMS, descarga TXT e invalidación. |
| Compatibilidad | Chromium: cinco escenarios (390/1440 × movimiento normal/reducido y fallback sin JS). Firefox/WebKit unavailable; no se dan por aprobados. |
| Versión | Git limpio/modificado/ausente; JSON/admin coincidentes; Worker no-store/noindex. |
| Axe | 90 comprobaciones, cero infracciones detectadas. Incomplete conservados; no certificación WCAG. |
| Worker local (entrega visual anterior, no repetido aquí) | 53 comprobaciones de rutas más JSON/cabeceras, assets, query, POST 405 y navegador. |
| Etiquetas personalizadas (entrega anterior) | Menú, buscador, campos, botones y opciones editados temporalmente; pruebas aprobadas; fuentes y build restaurados. |

Informes en `docs/qa`. Medición actual de cinco rutas en PERFORMANCE.md: cuatro con rendimiento 100; módulo 86 inicial y 100/100 en dos repeticiones sin cambios frontend. Accesibilidad/buenas prácticas 100 y SEO 66 por noindex. No son métricas de producción ni auditoría de todas las páginas.

Esta entrega: copy de demo coherente con restauración del navegador, guía de evaluación alineada con fichas de lanzamiento, enlaces directos guía → módulo y etiquetas comunes de guías editables en CMS. Paquete de revisión conservado; CI remota no verificada. Se conservan Nosotros, Ayuda y Blog con tres artículos. Se conservan las 14 páginas de módulos y el copy de lanzamiento en home/sectores/FAQ/precios. Vista previa global (launchDraft true), 34 editores y matriz real intacta. Check/build, sitio/navegación/marca/editorial/módulos/versión, nuevos recorridos editoriales, auditoría axe aislada, Worker local y paquete verificados. Lighthouse actual actualizado a cinco rutas y dos repeticiones focales; ver PERFORMANCE.md. No se publica.

## Fases y pendientes

El plan original numera 0–10: inicialización y base visual completadas; home/soluciones/catálogo/contacto/planes y precios propuestos/recursos/CMS implementados. Cierre de QA y verificación del Worker en curso (fases 8–9). Lanzamiento oficial (10) pendiente.

Pendientes reales: CI de los SHA actuales; revisión manual con dispositivos/lector de pantalla; evidencia del SaaS y validación económica/tributaria de tarifas; revisión/adopción de privacidad y otros textos legales; dominio/canonicals/sitemap/indexación autorizados. Las páginas de módulos están preparadas como objetivo comercial; su disponibilidad operativa sigue por acreditar. No hay backend propio de leads.

## Siguiente paso exacto

1. Abrir REVIEW_PACKAGE.md y seguir el recorrido sobre el preview local/ZIP de desarrollo; no usar el Worker anterior como si mostrara esta entrega. RELEASE_CHECKLIST.md conserva las 42 rutas y pendientes.
2. Registrar observaciones y decisiones concretas en LAUNCH_DECISIONS.md, empezando por presentación comercial/alcance; el paquete actualizado ya incorpora las correcciones independientes de EDITORIAL_REVIEW.md. Incorporar Actions y compatibility-report reales del SHA revisado cuando exista acceso, sin inferir resultados por la configuración. COMPATIBILITY.md registra lo ejecutado y lo pendiente. La medición de cinco rutas y repetición de la anomalía ya están documentadas en PERFORMANCE.md. La revisión visual local está registrada en VISUAL_REVIEW.md; no confundirla con dispositivos físicos o lector de pantalla. El cierre automatizado de metadatos/enlaces/errores ya está implementado. Usar LEGAL_REVIEW.md para decisiones legales pendientes; no rehacer los términos ya preparados ni confundirlos con un contrato SaaS aprobado. El recorrido comercial, Empresa, Ayuda y Blog ya están implementados. Preparar la web objetivo completa; no bloquear frontend pidiendo otra vez verificar el producto parcial ya confirmado. Los precios propuestos autorizados están en PRICING_STRATEGY.md; validar viabilidad y condiciones finales, sin inventar certificaciones.
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

## 5 de noviembre de 2026 · Compatibilidad y movimiento reducido

Nuevo test:compatibility integrado en test:ci: Chromium/Firefox/WebKit, ancho 390/1440 y movimiento normal/reducido, más fallback no-JS. Chromium 155.0.8059.79 pasó cinco escenarios; los dos motores restantes no están instalados ni ejecutados localmente y se registran unavailable. Control estricto local exigió los tres: Chromium pasó, ausentes rechazados con exit 1 esperado, evidencia en compatibility-required-guard.json. No se fingió aprobación ni se cambió la política de red para descargarlos.

CI instala/exige los tres motores y conserva compatibility-report.json; se amplía la limpieza de salidas antes de setup para evitar artefactos viejos si falla preparación. Resultado real de Actions/Firefox/WebKit pendiente de observar. COMPATIBILITY.md registra casos, comandos y límites.

Check 60 archivos sin errores/advertencias/hints; build 42 páginas / 34 editores; suite local completa aprobada (42 rutas/162 destinos, navegación/reflujo, marca/editorial/módulos/recursos/legal/versión, compatibilidad Chromium y axe 88 sin infracciones, checklist y controles negativos). Sin cambios frontend/CMS/dependencias; no se repiten Lighthouse ni Worker (anteriores identificados, no pruebas nuevas). Dispositivos físicos, lector y motores ausentes siguen pendientes.

Base remota dc85c36 y rama Worker 557222e verificadas al iniciar. Consultar git log -1 y comprobar push/ref al entregar. Autor Joel Alejandro Yañez Caballero; Codex principal sin subagentes. Sin PR creada; pendientes existentes y CI remoto sin verificar por API. Sin publicación/DNS ni retiro de noindex. Próximo paso exacto: paquete final de revisión de recorridos y decisiones comerciales/legales; incorporar evidencia real de CI cuando sea accesible, manteniendo trabajo independiente y congelación de lanzamiento.

## 5 de noviembre de 2026 · Paquete final para revisión

REVIEW_PACKAGE.md reúne alcance implementado (42 páginas / 34 editores), recorrido y preview; LAUNCH_DECISIONS.md distingue datos ya confirmados de siete decisiones pendientes, sin pedirlos otra vez ni inventar aprobaciones. Pregunta opcional enviada sobre mantener propuesta personalizada o incorporar planes oficiales; no se asume respuesta por silencio y no autoriza publicación.

package-review.py genera un ZIP interno con site-preview.zip y review/ separados. Incluye LEEME, manifiesto de hashes, identidad real del sitio e identidad propia de cada evidencia. CRC, hashes, nombres únicos, versión y ausencia de documentos internos en el ZIP del sitio comprobados; la web anidada conserva noindex/robots. Archivo temporal regenerable desde Git, sin incluir credenciales/entorno ni desplegar.

Pruebas de esta entrega: build estático de 42 páginas y validador de contenido; compilación Python; enlaces locales de los documentos nuevos; generación y comprobaciones del paquete (61 archivos de revisión en la primera generación, cifra descubierta, no lista fija). No se repiten navegador/axe/Lighthouse/Worker por cambiar solo docs/empaquetador; la evidencia previa conserva su identidad y sus límites.

CI d52bccc consultada en modo lectura por gh run list: Forbidden; ejecución/conclusión/Firefox/WebKit desconocidos, no inferir ausencia ni verde. Registro en qa/remote-ci-status.json. No hay PR nueva; existentes sin verificar por API. Base remota d52bccc y rama Worker 557222e confirmadas; consultar git log -1 para SHA final y verificar push/ref al entregar.

Autor Joel Alejandro Yañez Caballero; Codex principal, sin subagentes. No se publica ni se cambia DNS/indexación. Próximo paso exacto: revisar recorridos y registrar decisiones/observaciones de oferta/alcance en LAUNCH_DECISIONS.md, incorporar la ejecución real de CI cuando sea accesible y resolver pendientes manuales/legales antes de una autorización de lanzamiento concreta.

## 5 de noviembre de 2026 · Correcciones independientes del recorrido de revisión

Revisión en EDITORIAL_REVIEW.md. Corregidos: mensaje absoluto de demo sobre visitas (ahora matiza restauración del navegador), texto histórico «catálogo conceptual» en guía de evaluación, enlaces de tres guías directamente a la ficha del módulo con nombre específico y tres etiquetas comunes de guía antes fijadas en plantilla. Esas etiquetas se editan en Página: recursos-guias-slug; 42 páginas / 34 editores, sin nuevos tipos CMS.

Pruebas reales: check 60 archivos sin errores/advertencias/hints; build/content aprobado; suite completa 42 rutas/159 destinos (antes 162 por tres anclas de tarjetas reemplazadas por destinos de ficha ya existentes). Tres recorridos guía → ficha por teclado con/sin JS añadidos; recursos-report incluye esas seis comprobaciones. Marca/editorial/legal/versión/compatibilidad Chromium aprobados y axe 88 sin infracciones; checklist y negativos de evidencia aprobados. Firefox/WebKit siguen unavailable localmente y sin resultado remoto confirmado. Sin nueva medición Lighthouse ni Worker porque no cambia su configuración/routing; evidencia anterior conservada, no presentada como nueva.

features.json, pricing.json, contact.json y terms.json permanecen intactos: no se cambian estados del SaaS, factores comerciales, identidad/canales ni términos. No se asume respuesta a la pregunta comercial pendiente. Paquete interno regenerable y actualizado; sin publicación/DNS/noindex cambiado. Base remota d075a27 y Worker 557222e verificadas al comenzar; consultar git log -1 y comprobar push/ref al entregar.

Autor Joel Alejandro Yañez Caballero; Codex principal sin subagentes. Sin PR nueva; existentes/CI remoto no verificados por la restricción conocida, sin repetir la consulta. Próximo paso exacto: revisión del paquete actualizado y decisiones concretas de oferta/alcance y adopción legal en LAUNCH_DECISIONS.md; incorporar evidencia real de CI cuando sea accesible. No inventar esas decisiones para cerrar la web al 100%.

## Verificación de esta propuesta (5/11/2026)

Check: 62 archivos, cero errores/avisos/hints. Build: 42 páginas. test:ci local final aprobado: 42 rutas, 162 destinos internos, navegación/200%/marca/editorial/módulos/recursos/versión/legales y pruebas nuevas de precios con/sin JS; 88 comprobaciones axe, cero infracciones. Compatibilidad: cinco escenarios Chromium aprobados; Firefox/WebKit no disponibles localmente, CI remota no confirmada. No se enviaron mensajes ni se efectuaron compras. Revisadas capturas de tarjetas a 390/1440 px y viewport móvil. Lighthouse no repetido en esta entrega. Informes conservan la identidad del build probado (6765801 con cambios de fuente), no se reetiquetan con el commit documental posterior.

Agentes: solo Codex principal. Pendientes: validación de margen/costes, tributación, condiciones finales y operación real; CI remota/pruebas humanas y otros siete bloqueos de lanzamiento conservados. Siguiente paso exacto: revisar PRICING_STRATEGY.md contra costes/capacidad y registrar ajustes en LAUNCH_DECISIONS.md; no publicar.

Worker dry-run de esta entrega aprobado: build de 42 páginas y 106 archivos estáticos; `--dry-run: exiting now`, sin subir ni desplegar. No se repitió runtime Worker; evidencia anterior claramente separada.

## Escenarios económicos internos · continuación del 5/11/2026

Implementados scripts/pricing-economics.py, plantilla sin supuestos inventados en docs/commercial/cost-assumptions.example.json y guía docs/commercial/README.md. Lee cuotas actuales; calcula margen de contribución, umbral por cartera de un solo plan, cuota de referencia para objetivo y puesta en marcha separada, con Decimal. Datos desconocidos producen missing-inputs, sin resultados económicos ficticios. No cambia precios ni permite aprobación financiera/publicación automática. Escenarios reales deben permanecer fuera de Git.

Seis pruebas sintéticas aprobadas; ejecución con plantilla vigente detecta 21 entradas pendientes y cero planes calculados. CI incorpora pruebas Python, resultado remoto no confirmado. Sin cambios frontend/CMS, sin repetir navegación/axe/Lighthouse ya aprobados en la entrega anterior. 42 páginas/34 editores terminados como borrador siguen intactos. Solo Codex principal, sin subagentes.

Siguiente paso exacto: completar una copia privada con costos reales por cuenta y de puesta en marcha, costos fijos, margen objetivo e impuesto indirecto confirmado; ejecutar el calculador y revisar viabilidad antes de ajustar/adoptar precios. No se presume impuesto ni se requiere rediseñar planes. Bloqueos operativos/legales/CI/manuales/dominio y autorización final conservados.

## 6/11/2026 · Fichas conectadas a planes y complementos

Las 14 fichas de /funcionalidades/<id>/ incluyen una sección de distribución comercial: planes base que contienen el módulo y complementos relacionados, con nombre, precio, unidad y planes aplicables. Cada enlace llega a la tarjeta concreta en /precios/. Si no hay plan base, se explica; no se presenta el complemento como incluido. La comparación completa y la guía de consulta siguen accesibles. Funciona sin JS, sin formularios ni almacenamiento/transmisión nuevos.

Fuente única content/pricing.json; sin nuevas tarifas ni cambios de alcance. Textos comunes en Página: feature-detail de content/pages.json, con esquema .pages.yml regenerado: 34 editores y 42 páginas conservados. Ajuste de scroll-margin para que anclas de planes/complementos no queden ocultas tras la cabecera. Estados y evidencia real de content/features.json intactos. No se afirma disponibilidad operativa del SaaS.

verify-pricing.mjs amplía pricing-report.json con recorridos de las 14 fichas, con/sin JS: incluidos/complementos contrastados con contenido, precios y enlaces activados por teclado hacia su destino. Capturas locales de punto de venta (1440), facturación y multisede (390) revisadas. Check 62 archivos, cero errores/avisos/hints; build 42 páginas. Suite test:ci completa aprobada: 42 rutas/166 destinos internos, reflujo 200% en 31 rutas, recorridos/editorial/marca/legales/versión y 88 comprobaciones axe sin infracciones. Nuevas pruebas: 28 recorridos (14 fichas × con/sin JS), 30 activaciones por teclado. Chromium cinco escenarios aprobados; Firefox/WebKit no disponibles localmente. Seis pruebas Python del calculador económico también pasan. No se repitió Lighthouse ni runtime Worker. Informes conservan identidad del build aa806cb con fuentes modificadas, sin reasignarla al commit posterior.

Agentes: Codex principal, sin subagentes. Sin publicación, DNS ni cambio de rama Worker. No se creó PR; existentes y CI remoto sin verificar por restricciones previas. Próximo paso exacto: revisar el recorrido funcionalidad → plan → consulta en el paquete actualizado y completar en privado costos/impuesto para evaluar viabilidad con docs/commercial/README.md. Adopción legal/operativa, pruebas humanas/otros motores, dominio y autorización final siguen pendientes.

## 6/11/2026 · Panel administrativo visual

Rediseñado /admin con logo original, navegación por tareas, resumen de inventario, tarjetas de marca/portada/planes desde datos reales y directorio buscable de los 34 editores con Editar/Ver página. Fuente del inventario .pages.yml vía src/data/admin.ts, sin eliminar editores. Móvil/escritorio, teclado, recuentos y vacío; sin JS todos los editores visibles. ADMIN_DESIGN.md explica alcance, reglas y límites.

Se conserva Pages CMS: editor de campos, medios, autenticación y guardado externos, rama feat/feature-catalog. No se ha cambiado el tema del editor externo ni implementado edición embebida/WYSIWYG. Muestras del último build, sin estado de guardado ficticio o actualización en vivo. Sin tokens, backend ni nuevos servicios. 42 páginas / 34 editores; precios y evidencia SaaS intactos.

Check final: 64 archivos sin errores/avisos/hints; build de 42 páginas. verify-admin aprobado con/sin JS, cinco anchos, enlaces de rama, búsqueda/reset/teclado y sin peticiones externas. Capturas 390/1440 revisadas. CI incorpora admin-report.json y la prueba; cierre aprobado: 43 rutas y 178 destinos internos; navegación/200%, marca, editorial, módulos, recursos, versión, legales, precios, panel y compatibilidad Chromium aprobados. Axe inicial detectó nombres no únicos de zonas laterales; corregidas sus etiquetas y repetidas las 88 comprobaciones completas: cero infracciones detectadas. Inventario y guardas de lanzamiento aprobados. Firefox/WebKit siguen no disponibles localmente y CI remota no confirmada. No se repitieron Lighthouse ni runtime Worker. No se guardaron cambios en el servicio externo ni se enviaron mensajes.

Agente: Codex principal sin subagentes; skill digital-design-excellence aplicada. No se publica. Próximo paso exacto: revisar el nuevo /admin y concretar si también se quiere reemplazar el editor externo; no confundir este panel con un reemplazo ya realizado. Continúan costos reales, validación operativa/legal, dispositivos/lectores, CI remoto y autorización de lanzamiento pendientes.

Identidad de informes: build de base bbfa1a9 con fuente modificada; los informes no se reasignan al commit posterior. Tras commit se recompila y verifica versión, y se regenera el ZIP de revisión. Rama de trabajo feat/feature-catalog; Worker feat/brand-foundation conservada en 557222e. Sin PR nueva; existentes sin verificar.

## 6/11/2026 · Edición visual funcional en desarrollo

Autorización expresa del propietario: seleccionar textos/imágenes en una vista previa y ver cambios inmediatamente. Implementado /admin/editor/ con iframe de páginas reales, selección vinculada a JSON, inspector, borrador inmediato, descarte, selección de logos existentes, guardado validado/hash/rollback y revisión explícita de commit/push a feat/feature-catalog. VISUAL_EDITOR.md contiene uso, arquitectura y límites. 43 páginas HTML, 34 editores CMS conservados; sin migrar contenido ni alterar evidencia SaaS.

La API existe solo en el servidor Astro de desarrollo y exige acceso local, Origin y CSRF; no se añade escritura al build estático ni al Worker. Commit bloquea rama distinta, archivos con cambios previos, conflictos e índice ajeno; no hay autocommit al escribir. Pages CMS mantiene edición estructurada y subida de medios. El editor visual alojado con OAuth público sigue pendiente; no presentarlo como servicio ya conectado.

Pruebas funcionales aprobadas: ocho grupos en proyecto/remoto Git bare temporales; UI real de selección/texto/imagen/descarte/guardado/recuperación/diálogo Git/vista móvil, con content/pages.json restaurado exactamente y sin commits/push de prueba al repositorio real. Check 70 archivos sin errores/avisos/hints; build 43 páginas. Cierre estático aprobado: 43 rutas/178 destinos internos, navegación y texto 200% en 32 rutas, marca/editorial/módulos/recursos/versión/legales/precios/admin y Chromium cinco escenarios. Axe inicial detectó zonas de nombres repetidos entre editor e iframe; etiquetas diferenciadas y auditoría completa repetida: 90 comprobaciones, cero infracciones detectadas. Inventario y guardas de lanzamiento aprobados, ocho bloqueos reales conservados (incluye CMS visual alojado). Ajuste posterior solo del inspector activo comprobado con UI real a 320/390/1440; fuente restaurada. Firefox/WebKit no ejecutados localmente. Seis pruebas del calculador económico también aprobadas. No se repitieron Lighthouse ni runtime Worker. CI incorpora ambos recorridos y artefactos; resultado remoto no confirmado.

Siguiente paso exacto: revisar el editor local y configurar una integración alojada con autenticación y permisos GitHub antes de usar escritura desde una URL pública. Los secretos se configuran fuera del chat. No publicar para probar. Agentes: Codex principal, sin subagentes; precios, estados reales y congelación de producción intactos. Sin PR nueva; existentes sin verificar.

Informes de esta entrega conservan base b15d9e1 con fuente modificada; no se reasignan al nuevo SHA. Recompilar/verificar versión tras commit y regenerar paquete. Rama de desarrollo feat/feature-catalog; Worker permanece 557222e. Sin PR nueva, existentes sin verificar por API.

## 6/11/2026 · Base de autenticación para edición alojada

Implementados workers/visual-auth.mjs y wrangler.editor-auth.jsonc separados del Worker público: flujo GitHub App, estado OAuth cifrado, sesión AES-GCM HttpOnly/Secure con duración máxima de una hora, comprobación de usuario manaturaloso y permiso push en el repositorio exacto, CSRF/logout y rechazo por defecto. Sin secretos/configuración devuelve 503. No hay endpoints de escritura ni integración todavía con el inspector alojado; contentWritesEnabled false. HOSTED_VISUAL_AUTH.md registra configuración y alcance.

Ocho grupos sintéticos de autenticación/criptografía/permisos aprobados. No hay login GitHub real, App registrada, credenciales configuradas o despliegue. CI incorpora prueba e informe visual-auth-report.json. Web estática, 43 páginas/34 editores, editor local y Pages CMS conservados. No se repite navegación/axe/Lighthouse por código servidor separado sin cambios frontend; la evidencia anterior conserva su identidad.

Siguiente paso exacto: elegir origen HTTPS, registrar/instalar GitHub App solo para sistematicando-web y configurar variables/secretos fuera del chat; revisar y autorizar despliegue de prueba por separado, probar login real y después conectar identidad con guardado remoto validado. El bloqueo visual-cms sigue abierto. Solo Codex principal, sin subagentes; sin publicación, DNS, PR nueva ni cambio en rama Worker. PR existentes y CI remoto sin verificar.

Cierre técnico: check 72 archivos, cero errores/avisos/hints; ocho grupos sintéticos aprobados; Wrangler 4.157.0 dry-run de la configuración separada aprobado (8.58 KiB sin subir/desplegar, origen/client ID vacíos, sin secretos). Solo cambian servidor/QA/documentos y seguimiento de procedencia; UI estática intacta. Recompilar/verificar versión tras commit; conservar identidades previas de QA sin reasignarlas a este SHA.
