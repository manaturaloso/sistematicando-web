# Decisiones vigentes

Consolidación: 5 de noviembre de 2026 (America/Lima). El registro anterior íntegro está en [DECISIONS_HISTORY.md](DECISIONS_HISTORY.md); los estados históricos no sustituyen este resumen y [PROGRESS.md](PROGRESS.md).

## Producto y contenido

- Web comercial estática, no implementación del SaaS. Por instrucción del propietario se prepara la comunicación del producto completo como borrador de lanzamiento, mientras el producto está parcialmente desarrollado. Los 14 estados/evidencias operativos se conservan internos; la vista previa no acredita integraciones, precios ni controles reales.
- Contacto externo por WhatsApp autorizado y correo/WhatsApp de privacidad confirmados. Guía generada localmente, sin transmisión ni reserva. Datos fuente en content/contact.json; no volver a solicitarlos por falta de historial.
- Privacidad es versión para revisión, no adopción legal/operativa definitiva. Mantener noindex/robots hasta lanzamiento autorizado.

## Administración y fuentes

- Pages CMS conectado a GitHub; /admin es acceso al servicio externo, sin usuarios/credenciales ni API de escritura en el sitio. Edición en feat/feature-catalog, 34 editores.
- Fuente editorial content/*.json. src/data son adaptadores. .pages.yml se regenera cuando cambia el esquema, no tras cada edición: evitar sobrescribir configuración por rutina.
- Diseño estructural, lógica e integraciones requieren desarrollo. La identidad de compilación es técnica y de solo lectura, no un campo CMS.
- Originales del logo preservados. Derivados PNG de presentación generados por Astro, sin recorte/reconstrucción; selección y variante oscura en site.json. No subir derivados /_astro al CMS.

## Calidad y ejecución

- Astro estático, fuentes locales y CSS nativo. Wrangler sirve solo dist, barra final y 404 real; custom build obligatorio antes de servir/desplegar.
- CI de lectura y sin deploy. Revisa páginas, navegación, marca, editorial, versión y axe; elimina evidencia vieja antes de ejecutar. Mantener reglas y resultados incomplete, no silenciar fallos para obtener verde.
- Pruebas usan controles estables o nombres accesibles del contenido vigente; no exigir etiquetas históricas que el propietario puede editar. El arreglo FAQ conserva texto opaco durante la animación y cubre un instante intermedio.
- Versión: metadatos Git al compilar, sin variables de entorno/autor/correo/secretos; Git ausente → null. sourceModified cubre fuentes/configuración relevantes, no docs/QA. Fecha del commit, no de publicación. Cambiar HEAD requiere nuevo build.
- Lighthouse es laboratorio de cinco rutas y repeticiones focales, no Core Web Vitals reales ni certificación WCAG completa. No quitar noindex para aumentar SEO.

## Git, permisos e identidad

- Desarrollo/CMS feat/feature-catalog; rama seguida por Cloudflare feat/brand-foundation. Push a esta última puede publicar. No mezclar ambas por «continuar» desarrollo.
- Aprobaciones de publicación concretas: 9a017af, 96bd165 y af35674. Para af35674, «Sigamos» respondió directamente a la pregunta específica de publicar 1be0fc0; interpretación comunicada antes de actuar. No es permiso general para entregas futuras.
- Fast-forward/push normal cuando procede, preservando commits del propietario. Sin force-push, cambios DNS ni retiro de noindex implícitos. PR no obligatoria si commit/push autorizado; no afirmar que no existen PR si la API no responde.
- Siempre autor/committer Joel Alejandro Yañez Caballero <joel.yc23@gmail.com>, configurados localmente y verificados. AGENTS.md explica replicarlo; .git/config no viaja con Git. No reescribir historial para cambiar autores antiguos.
- Solo Codex principal, sin subagentes. Antes de retomar tras una desconexión, inspeccionar checkout y referencias; no repetir ediciones/publicaciones sin conocer el estado.

## Consolidación de esta entrega

PROGRESS y README contenían estados superados (19 páginas, 23 editores y conexión CMS pendiente). Se conservan las fuentes históricas y se crea guía breve entre cuentas. No hay cambios de producto ni nuevo despliegue. Validación documental y de evidencia/Git; no repetición de tests de aplicación sin cambio funcional.

## 4 de noviembre de 2026 · Versión pública identificada por el propietario

Evidencia: JSON pegado por el usuario desde /version.json, guardado íntegro en qa/deployed-version-af35674.json. SHA af3567400d596d0f9e386de1cee47e5297985187, fecha 2026-11-04T21:47:13+00:00 y sourceModified false. Contrastados con ref remota feat/brand-foundation y fecha Git; coincidencia exacta/instante equivalente. Confirma identidad de la copia servida; no implica que el agente accediera directamente, CI actual verde ni revisión funcional de todas las páginas.

Se actualizan resúmenes/continuidad para no repetir el bloqueo de verificación ya resuelto por el usuario. Cambios solo documentales, sin despliegue. Agente Codex principal, identidad Joel Alejandro Yañez Caballero; sin PR creada, existentes no verificadas por API. Siguiente paso: revisión funcional manual y CI del HEAD, luego pendientes comerciales/legales.

## 4 de noviembre de 2026 · Revisión asistida y reflujo al ampliar texto

Se revisaron capturas de contacto/privacidad, resultado de demo, búsqueda vacía y versión de admin; interacción de teclado en validación vacía, generación, invalidación y salto de área. Código base equivalente al publicado af35674 antes del ajuste; revisión local, no acceso directo al Worker ni pruebas en dispositivos físicos/lector de pantalla.

Defecto reproducido: a 390 px con texto 200%, scroll horizontal en contacto/demo (408 px), catálogo (498 px) y admin (563 px). También se detectó portada al ampliar su mockup. Corrección: límites de ancho en logo/botones/énfasis de titulares; división de palabras largas; mínimos de grid/flex a cero, mockup con columnas adaptables y etiquetas del gráfico envolventes; botón de limpiar permite varias líneas. Sin recortar contenido, reducir el porcentaje de texto, cambiar fuentes/logos originales ni usar overflow:hidden para ocultar el problema.

Prueba de regresión de navegación ampliada: seis rutas, anchos 390/1280, texto 200%, sin overflow. Evidencia antes/después en qa/reflow-review.json. Nuevas comprobaciones de teclado: formulario vacío lleva foco a business, generación a result-title, reset a business y salto de área tras cero resultados restaura 14 tarjetas. Capturas de estados revisadas; a texto ampliado los títulos ocupan más líneas.

Pruebas: check 45 archivos sin errores/advertencias; build 20 páginas/24 editores; test:ci (20 rutas/69 destinos, navegación, marca, editorial, versión y axe 44 comprobaciones sin infracciones) aprobado. Lighthouse local final en home/catálogo/demo: rendimiento/accesibilidad/buenas prácticas 100 y SEO 66 por noindex. Informes regenerados, no datos de producción ni certificación WCAG.

Agente Codex principal, sin subagentes; autor Joel Alejandro Yañez Caballero. Rama feat/feature-catalog, sin nueva publicación ni PR creada; existentes/Actions remoto sin verificar por API. Publicado confirmado af35674. Siguiente paso: revisar Actions del nuevo SHA y autorizar la integración concreta si se quiere reflejar esta corrección en el Worker. Siguen pendientes dispositivos/lector, evidencia SaaS, tarifas y revisión/adopción legal.

## 4 de noviembre de 2026 · Publicación de corrección de reflujo autorizada

El propietario respondió «Sí, autorizo» a integrar c1b0baf en feat/brand-foundation para publicar la corrección de texto ampliado. Fetch confirmó origen c1b0baf y destino af35674 sin cambios concurrentes; destino antecesor. Se agrega solo este registro documental, se integra por fast-forward y se envía mediante push normal, preservando historial. Consultar git log -1 y referencias remotas para SHA final.

Código aprobado sin nuevas modificaciones: check 45 archivos/build 20 páginas; test:ci 20 rutas/69 destinos y axe 44 comprobaciones; reflujo 200% en seis rutas a 390/1280 y pruebas de foco/teclado; Lighthouse local 100 en las tres rutas medidas. Antes del push se recompila con dry-run y se verifica versión contra el nuevo commit y sourceModified false. No se repite la suite por el registro documental.

Última copia pública confirmada por el propietario antes de esta entrega: af35674. El nuevo build/versión activa queda pendiente de comprobar; no se afirma éxito por el push. API/hostname del entorno siguen restringidos. Sin DNS/noindex/bindings nuevos; autor Joel Alejandro Yañez Caballero. Solo Codex principal, sin subagentes. Sin PR creada; existentes sin verificar.

Siguiente paso: comprobar Cloudflare Build/SHA final, Ready y /version.json; comparar commit y sourceModified false. Revisar texto 200% en móvil en contacto/demo/catálogo/admin y portada. Continuar desarrollo en feat/feature-catalog sincronizada; esta aprobación no autoriza otras publicaciones. Pendientes reales: dispositivos/lector, CI remoto actual y evidencia comercial/legal.

## 4 de noviembre de 2026 · Web preparada para el producto completo

Directiva explícita del propietario: Sistematicando está parcialmente desarrollado, pero la web debe trabajarse como la versión completa de lanzamiento; no se publicará hasta que producto/web estén al 100%. Sustituye el bloqueo previo de crear páginas de módulos solo después de verificar el software. Se permite preparar su copy objetivo como borrador; no se modifica la evidencia ni se marca un módulo como verificado. No solicitar nuevas publicaciones durante esta preparación.

Implementado: 14 páginas /funcionalidades/<id>/ con copy original específico (propuesta, resumen, tres beneficios, tres pasos y ámbito), enlaces entre módulos y sectores, CTA de guía/contacto y navegación desde catálogo/soluciones. Datos en features.items[].launch, campos/validaciones CMS y plantilla estática. Portada, sectores, FAQ y precios adaptados a tono de lanzamiento; precios usa propuesta personalizada sin inventar cifras, planes aprobados, pruebas gratuitas ni condiciones contractuales. Mockup sigue siendo conceptual; no se inventan capturas reales, testimonios, certificaciones ni PMS completo.

Vista previa global editable en site.json (launchDraft true y etiqueta/aviso); meta noindex y robots intactos. Catálogo presenta áreas y contenido comercial; estados/evidencias siguen en la matriz interna. Interfaz admin enlaza textos comunes de módulos. Son 34 páginas HTML más version.json y 25 editores. Los 14 estados/evidencias anteriores se compararon y quedaron intactos. Validador rechaza beneficios de lanzamiento vacíos.

Pruebas: check 47 archivos sin errores/advertencias, build y content:check aprobados; test:ci 34 rutas/125 destinos, navegación y reflujo 200% en 20 rutas a 390/1280 px, marca/editorial/versión, nueva prueba de las 14 páginas y axe 72 comprobaciones sin infracciones. Worker local 45 rutas más cabeceras/assets/JSON, query/405 y navegador aprobado; servidor detenido. Capturas móvil/escritorio de módulo, catálogo, sector y precios revisadas. Lighthouse home/catálogo/demo 100 rendimiento/accesibilidad/buenas prácticas; SEO 66 por noindex. Paquete local de 34 páginas verificado, sin publicar. Un archivo CSS incorrecto se detectó durante build y se restauró/corrigió antes de las validaciones finales.

Agente Codex principal, sin subagentes; autor Joel Alejandro Yañez Caballero. Todo solo en feat/feature-catalog. Rama Worker permanece en 557222e (envío anterior autorizado, no hay confirmación nueva de esa versión activa); af35674 fue la última identidad pública confirmada por el propietario. Sin deploy, DNS ni PR creada; PR existentes/CI remoto no verificables por API.

Siguiente paso exacto: revisar Actions del nuevo SHA y copy comercial de las 14 páginas; continuar Empresa/Ayuda/recursos editoriales y arquitectura de la oferta sin cifras inventadas. El producto parcial ya está confirmado: no volver a preguntar ese estado para bloquear frontend. Mantener launchDraft/noindex y no integrar a la rama del Worker hasta que el propietario confirme preparación completa y autorice el lanzamiento. Validación operativa, tarifas/condiciones, legal/privacidad y dispositivos/lector siguen pendientes antes de publicar.

## Empresa, Ayuda y Blog · 4 de noviembre de 2026

Se añaden seis rutas estáticas y cinco editores CMS (total 40 páginas / 30 editores). `content/articles.json` contiene artículos originales de organización, crecimiento y operación; `pages.json` contiene textos comunes, Nosotros y Ayuda. Referencias a módulos/guías/FAQ se validan antes de compilar. No se inventan fechas de publicación, autores, historia corporativa, clientes, cifras de resultados ni SLA de soporte.

Ayuda orienta hacia guías, FAQ, preparación de demo y contacto; no simula una base de soporte del software ni instrucciones de una interfaz inexistente. FAQ y tabla de contenidos funcionan con teclado sin JavaScript. El blog es lectura estática, sin comentarios, suscripciones ni envíos. CMS sigue externo y autenticado. Se amplía la navegación y el pie con ajuste responsive. Se mantiene launchDraft, noindex y congelación del Worker.

Codex principal, sin subagentes. Siguiente paso: recorrido comercial de precios/demo, alcance de implementación y pendientes legales/comerciales documentados, sin inventar tarifas ni publicar.

## 5 de noviembre de 2026 · Implementación y recorrido comercial

/implementacion/ organiza cuatro etapas como planificación por acordar, no como servicio, calendario o alcance ya contratado. Preparación y responsabilidades se editan en implementation.json; copy en pages-implementacion-index. Precios ofrece enlaces a las etapas y demo permite continuar hacia esa explicación. Total actual: 41 páginas y 32 editores.

No se inventan planes, tarifas, impuestos aplicables, plazos, migraciones incluidas, SLA, capacitación ni condiciones de contratación. El flujo comercial real continúa siendo WhatsApp externo; no hay envío de solicitudes ni adjuntos automáticos desde la guía local. Párrafo de contacto editable con marcador {phone} único y validado; dato centralizado en contact.json.

Pruebas de recorrido sin/con JavaScript, anclas por teclado, coincidencia del contacto y ausencia de datos de la guía en el enlace comercial. Mantener launchDraft/noindex y no publicar. Siguiente paso: preparación/revisión legal y editorial; agente Codex principal, sin subagentes.

## 5 de noviembre de 2026 · Privacidad y términos de uso informativo

Se prepara /legal/terminos/ como borrador de uso de la web, no como contrato SaaS. No se inventan tarifas, renovación, reembolsos, SLA, límites de responsabilidad ni jurisdicción. Ocho secciones editables en terms.json; encabezados/contacto en pages-legal-terminos. Términos/privacidad se enlazan entre sí y en el pie. Total: 42 páginas / 34 editores.

Privacidad distingue código local y tratamiento del hosting/servicios externos; aclara posible restauración de campos por el navegador y el alcance del correo de privacidad, y añade administración externa Pages CMS/GitHub. Identidad del responsable y textos de contacto ahora editables con marcadores validados {responsible}, {ruc}, {address}; datos reales centralizados en contact.json. No se cambia la fecha original del borrador ni se presenta como adopción legal.

Prueba de navegador local: navegación legal con/sin JS, tabla de contenidos por teclado, canales separados y guía sin peticiones externas, cookies ni almacenamiento persistente. No extrapolar al Worker público, configuración de Cloudflare ni servicios abiertos voluntariamente. Revisión/adopción legal y decisiones de conservación/proveedores siguen pendientes (LEGAL_REVIEW.md). Codex principal, sin subagentes; solo desarrollo, sin publicar.

## 5 de noviembre de 2026 · Cierre técnico y evidencia por página

Layout admite tipo Open Graph website/article: tres guías y tres artículos usan article, sin inventar autores o fechas. La 404 tiene descripción específica y salidas a Inicio/Ayuda con navegación de teclado sin JS. Textos en el editor 404 existente; 42 páginas / 34 editores, sin nuevos tipos CMS.

verify-site exige títulos/descripciones únicos, Open Graph coherente, idioma/viewport, noindex y ausencia de canonicals/og:url durante preparación. Reporta enlaces por ruta e identidad del build. Axe también registra esa identidad. audit:release exige cobertura exacta y coincidencia de ambas evidencias con dist/version.json antes de generar RELEASE_CHECKLIST.md y qa/release-report.json; CI los limpia y publica solo como artefactos de QA, nunca despliegue.

La instantánea puede corresponder a un checkout con cambios locales, indicado explícitamente. Un commit posterior cambia la identidad: no reasignar los informes a otro SHA. El build final se recompila y verifica; CI regenera evidencia para su SHA. No se convierte «cero infracciones» en certificación ni porcentaje de preparación. Se mantienen pendientes producto, comercial, legal, revisión manual, CI remoto, dominio y autorización final.

Agente Codex principal, sin subagentes. Solo feat/feature-catalog, rama Worker 557222e intacta. Siguiente paso: revisión visual sistemática y estados interactivos; conservar noindex y no publicar.

## 5 de noviembre de 2026 · Revisión visual y reflujo ampliado

Pie a ≤899 px usa grid adaptable con mínimo relativo al tamaño del texto: dos columnas cuando caben y una cuando el espacio o la ampliación lo requieren. Doce enlaces conservados, altura táctil mínima 44 px y sin cambios en contenido/logo. A 390 px/100% el pie pasa de 857 a 573 px. La CTA de implementación se separa del aviso introductorio.

Nuevas comprobaciones a 320/390/768/900/1440 y texto 100/200% detectaron dos defectos preexistentes: FAQ de home a 320/200% (scrollWidth 346) y adorno visual-orbit a 900/200% (908). FAQ permite mínimos de grid a cero y corte de palabras; el adorno deja de rotar a ≤1100 px. Sin ocultar desbordamiento, reducir texto o alterar logos.

review:visual captura 42 páginas × 390/1440, página completa, primera pantalla, pie y once estados de menú/buscador/guía. Salida bajo /tmp, sin publicar ni añadir toda la galería al repositorio. Scroll al inicio y animaciones estabilizados; capturas de componentes con altura suficiente para que el sticky header no tape campos. El script comprueba geometría, no asigna aprobación humana ni aprobación de lanzamiento. Revisión y límites en VISUAL_REVIEW.md.

La evidencia del repositorio sigue identificando la instantánea de build, no un commit posterior ni el Worker. Codex principal, sin subagentes. Próximo paso: rendimiento de cinco rutas representativas y optimizaciones justificadas; dispositivos físicos/lector, producto/comercial/legal y autorización final permanecen pendientes.

## 5 de noviembre de 2026 · Rendimiento de cinco muestras

Auditor local ampliado: home, catálogo, demo, primer módulo y primer artículo; registra identidad del build, payload, métricas, configuración, hallazgos y JSON completo en /tmp único. Permite --route, --runs=1..3 y salida alternativa bajo /tmp para no borrar la medición principal al investigar una anomalía. El resumen anterior se elimina antes de medir para no presentar una salida vieja como nueva si falla.

Cuatro rutas dieron 100; módulo 86/LCP 4.204 s inicial y 100 con LCP 0.906/0.903 s en dos repeticiones sin cambios frontend. Se conserva el 86 y no se atribuye causa ni mejora sin reproducción. No se modificó la web para perseguir una cifra. SEO 66 por noindex deliberado; oportunidades locales no justifican cambiar logos/fuentes/caché de producción. PERFORMANCE.md documenta resultados y límites.

Sin dependencias, contenidos, permisos o publicación nuevos. Check/build y siete Lighthouse; no repetir navegación/axe/Worker sin modificación de frontend. Los informes anteriores conservan su identidad; CI actual no se infiere de pruebas locales. Codex principal, sin subagentes. Próximo paso: movimiento reducido y compatibilidad de flujos/navegadores, dejando explícito lo no ejecutado.

## 5 de noviembre de 2026 · Compatibilidad y movimiento reducido

Prueba reproducible de menú/FAQ, búsqueda y guía con Chromium/Firefox/WebKit; cuatro combinaciones de ancho/movimiento y un fallback sin JS por motor. Solo Chromium está instalado localmente y sus cinco escenarios pasan. Firefox/WebKit quedan unavailable, con versión null y cero casos; no se simula compatibilidad. La política actual no incluye destinos de descarga y no se cambia ni se sortea.

CI instala los tres motores y los exige con COMPAT_REQUIRED_ENGINES. Ausente/arranque fallido de motor obligatorio causa fallo; contenido de la guía se contrasta con TXT descargado y no se permite tráfico externo en esos flujos. Se comprobó la modalidad estricta local: rechaza la falta de Firefox/WebKit. El workflow limpia todas sus evidencias antes de preparar navegadores para no publicar un informe viejo si falla setup.

No hay cambios de producto, frontend, contenido CMS ni dependencias. No se vuelve a medir Lighthouse sin causa nueva. Informes identifican su build local y no un commit posterior o CI remoto. Codex principal, sin subagentes; desarrollo solo, no publicación. Siguiente paso: paquete final de revisión e incorporar la ejecución real de CI cuando esté disponible; siguen pendientes físicos/lector y decisiones de lanzamiento.

## 5 de noviembre de 2026 · Paquete interno de revisión

REVIEW_PACKAGE.md reúne áreas terminadas, recorrido del propietario, límites de evidencia y preview local. LAUNCH_DECISIONS.md separa datos ya confirmados de las siete decisiones pendientes. No se vuelve a solicitar identidad/canales ni se interpreta «sigamos» como adopción comercial/legal o publicación. Se pregunta opcionalmente por propuesta personalizada frente a planes oficiales, sin frenar el empaquetado ni asumir respuesta por silencio.

package-review.py crea un ZIP interno con site-preview.zip y review/ separados; el ZIP del sitio se valida con package-preview.py. El manifiesto registra hashes, identidad del sitio y la de cada informe, sin reasignar snapshots. CRC/integridad, nombres únicos y ausencia de documentos internos en el ZIP anidado se comprueban al generar. Fuente de docs/scripts guardada en Git; el ZIP temporal se regenera desde otra cuenta. No se despliega el paquete externo.

Consulta read-only de CI d52bccc por gh run list: Forbidden; conclusión/runs desconocidos, no ausencia de ejecuciones ni verde. Registro en qa/remote-ci-status.json. No reintentar por rutas alternativas para eludir la restricción ni pedir tokens. Sin frontend/dependencias nuevas; no se repite suite de navegador por empaquetar documentos. Agente Codex principal, identidad Joel Alejandro Yañez Caballero, sin subagentes. Próximo paso: revisión del propietario y decisiones concretas; mantener congelación de lanzamiento.
