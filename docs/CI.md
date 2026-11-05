# Validación automática de ediciones del CMS

> Estado vigente consolidado en [PROGRESS.md](PROGRESS.md) y [HANDOFF.md](HANDOFF.md). Versión servida af35674 confirmada por JSON del propietario; el estado de CI de los nuevos SHA sigue sin verificar. Este documento conserva también registros anteriores.

## Implementado

Workflow `.github/workflows/quality.yml`, nombre **Site and CMS quality**.

- Push a feat/feature-catalog: comprueba los commits, incluidos los que guarde Pages CMS en esa rama.
- Pull requests: ejecuta la misma validación.
- workflow_dispatch declarado; la disponibilidad del botón manual depende de que GitHub reconozca el workflow en la rama predeterminada.
- Permisos contents:read, sin secretos, tokens de Cloudflare, publicación, merges ni commits automáticos.
- Tiempo máximo 20 minutos; nuevas ejecuciones sustituyen las anteriores del mismo ref.

## Pasos

1. Checkout sin conservar credenciales.
2. Eliminar informes de ejecuciones anteriores para no adjuntarlos como si fueran evidencia actual.
3. Node de .nvmrc y npm ci --include=dev desde el lockfile.
4. Astro check y Worker dry-run; este último incluye el build y content:check.
5. Instalación del Chromium de Playwright en el runner.
6. npm run test:ci: todas las rutas/enlaces, navegación y auditoría axe.
7. Guardar dist y los informes de esta ejecución como artefacto con retención de siete días. Descargar un artefacto no publica una web. Un artefacto de un job fallido no significa que el build esté aprobado.

Las acciones oficiales checkout/setup-node/upload-artifact usan v7 según sus README públicos consultados durante la implementación. No se usan pull_request_target ni tareas de despliegue.

## Pruebas

- verify-site.mjs recorre las rutas compiladas de forma dinámica: títulos únicos, H1, descripción, noindex, IDs, overflow móvil, imágenes y destinos internos/anclas. No visita servicios externos ni inicia sesiones.
- verify-navigation.mjs comprueba menú sin JS, foco, Escape y texto al 200%.
- audit-accessibility.mjs cubre 19 páginas a dos anchos y tres estados interactivos actualmente. Los resultados incomplete se conservan y necesitan revisión aparte.
- CHROMIUM_PATH selecciona un navegador explícito. En Actions, test:ci utiliza el browser descargado por Playwright; en la validación local se usó /usr/bin/chromium.

Para repetir localmente, con dist construido:

```sh
CHROMIUM_PATH=/usr/bin/chromium npm run test:ci
```

El wrapper borra y regenera site-report.json/accessibility-report.json. Revisar su diff antes de guardar. No tocar esos archivos durante otra auditoría. Lighthouse no corre en cada edición: sus resultados históricos son de laboratorio y la variabilidad no se usa como puerta artificial de aprobación.

## Estado comprobado y pendiente

Instalación limpia, check, dry-run y suite equivalente **aprobados localmente**. YAML parseado y estructura/acciones/permisos comprobados; no se ha confirmado todavía una ejecución exitosa del workflow alojado. GitHub puede requerir que el propietario habilite Actions o apruebe una ejecución de un colaborador.

Después de guardar el workflow, revisar **Actions → Site and CMS quality** y comprobar el SHA concreto y el resultado. La API GitHub no está disponible para consultar esos resultados desde esta sesión. No dar por aprobado un job solo porque existe el archivo.

Guardado real de CMS y subida/selección de logos confirmados por commits 1206881–55f79ee. Pruebas locales aprobadas; Actions alojado sigue sin verificar. No se hizo push a la rama del Worker; el propietario añadió allí .pages.yml vacío en ed7227d.

## 2026-11-04 · Fallo de Actions en FAQ abiertas: contraste transitorio

Evidencia remota aportada por el propietario: workflow Site and CMS quality #9, commit dd113be, falló en Check pages, navigation and accessibility. Resumen 41 comprobaciones y una infracción en expanded-menu-and-faq; no se recibió el detalle de regla del artefacto. La captura confirma fallo alojado, no fallo del despliegue Cloudflare.

Reproducción local: la animación appear aplicaba opacity 0→1 a los párrafos de details. Detenida al 25% mediante Web Animations, axe detecta color-contrast en cinco respuestas FAQ (1.9:1 frente al mínimo 4.5:1); al terminar la animación el mismo estado pasa. Es una causa reproducida compatible con el fallo dependiente del momento de medición; no se atribuye una regla al log remoto que no la muestra.

Corrección: retirar solo la interpolación de opacidad y conservar el desplazamiento suave de 3px y prefers-reduced-motion. Texto siempre opaco; sin desactivar color-contrast, exclusiones ni esperas para esconder el problema. Control negativo: reintroducir CSS anterior solo en página de prueba vuelve a detectar la infracción; CSS corregido pasa con las mismas cinco animaciones pausadas.

Auditoría ampliada a 42 estados/rutas con expanded-faq-animation-quarter en no-preference; conserva estado abierto normal y resto de pruebas. Logs ahora imprimen regla, selector, ayuda y causa, además del informe JSON del artefacto. Build 19 páginas/content:check y prueba de reproducción aprobados; resultado final de test:ci registrado al completar esta entrega. No repetir Lighthouse: no se cambia geometría ni carga de recursos.

Agente: Codex principal, sin subagentes. Identidad Git: Joel Alejandro Yañez Caballero. Solo rama feat/feature-catalog; sin despliegue ni push a feat/brand-foundation (publicado 9a017af). Siguiente paso exacto: revisar nueva ejecución de Actions del commit de esta entrega; debe mostrar 42 comprobaciones y cero infracciones. Si falla, abrir validate y copiar AXE + selector + causa o descargar accessibility-report.json del artefacto. API GitHub del entorno sigue sin acceso; no afirmar CI alojado verde hasta observarlo. Sin PR creada; PR existentes sin verificar.

Resultado final local: test:ci aprobado (19 páginas, 66 destinos, navegación sin JS/teclado/200% y menú con scripts externos bloqueados); axe 42 comprobaciones, cero infracciones. Informe accessibility-report.json regenerado. Incomplete conservados, no equivalen a aprobación WCAG completa.

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

## 2026-11-04 · Identificación de versión servida

Implementado endpoint estático /version.json y sección de solo lectura en /admin: commit base, fecha del commit y sourceModified. Metadatos obtenidos de Git durante build; no hay consulta dinámica ni datos de entorno/autor/correo/credenciales. sourceModified comprueba código/contenido/configuración relevantes y distingue una compilación local con cambios sin commit; documentación e informes de QA no alteran ese indicador. Sin Git se devuelven null y el panel declara desconocido, sin inventar SHA.

public/_headers aplica no-store y X-Robots-Tag noindex, nofollow a /version.json; Worker local confirmó ambas cabeceras y MIME JSON. El dato permite comparar archivos servidos con el commit del Build en Cloudflare, sin confundir ID de versión de Cloudflare ni confirmar éxito de despliegue por sí solo. Rebuild después de cambiar HEAD para actualizarlo. Son 20 páginas HTML más el JSON; 24 editores CMS sin cambios. El identificador generado no es editable desde CMS.

Pruebas: check 44 archivos sin errores/advertencias, build y content:check aprobados. verify-version (añadido a CI) valida fixture Git limpio, modificado y sin Git, campos permitidos y coincidencia JSON/admin con checkout. Worker local: 31 comprobaciones de rutas, fuentes/marca, JSON y cabeceras, query, 405 y navegador móvil aprobados; servidor detenido. Suite del sitio y axe registrados al terminar.

Última integración Git autorizada fue 96bd165 en ambas ramas; su despliegue real todavía no está confirmado desde el entorno. Esta mejora solo feat/feature-catalog, sin nueva publicación, PR creada ni cambio DNS. PR existentes y CI remoto no verificables por API. Autor Joel Alejandro Yañez Caballero; agente Codex principal, sin subagentes.

Siguiente paso exacto: comprobar Actions del SHA de esta entrega. Si se autoriza integrar esta mejora en feat/brand-foundation, comprobar después /version.json y /admin frente al SHA del build. La URL pública actual todavía puede responder 404 a /version.json porque no incluye esta mejora; no interpretarlo como fallo de la versión anterior. No se retira noindex. Quedan dispositivos/lector y validación comercial/legal.

## 2026-11-04 · Pruebas compatibles con etiquetas del CMS

Las pruebas activas de navegación, auditoría de estados y Worker dejan de depender de textos fijos «Menú», etiquetas de selects, nombres de sectores/opciones y botón de generar. Usan IDs/clases de controles o nombres accesibles obtenidos del contenido actual. Verify-editorial conserva verificación semántica de etiquetas/botones y búsqueda contra pages.json; no se desactivan reglas axe ni controles de accesibilidad. Corregido además el resumen generado de FEATURE_STATUS: CMS ya conectado y con guardado real, sin cambiar los 14 estados SaaS.

Validación: build/content:check y test:ci aprobados (20 rutas/69 destinos, marca/editorial/versión y axe 44 comprobaciones sin infracciones). Prueba temporal adicional cambió nombre del menú/salto, etiqueta del buscador, campos/botones y opciones de demo: navegación y documento/descarga pasaron. Se restauraron los dos archivos editoriales y el build en finally; no se modificaron textos reales ni se hicieron escrituras CMS.

Durante la ejecución el usuario notificó «stream disconnected before completion»: es un aviso de interrupción del canal de respuesta, no una evidencia de fallo del sitio. Se comprobó el checkout: seis archivos de pruebas/documentación conservados, sin pérdida ni cambios de contenido. Se termina y guarda esta entrega en feat/feature-catalog. No hay nuevo despliegue; rama seguida por Worker sigue af35674, estado remoto del despliegue aún no confirmado por el entorno.

Autor Joel Alejandro Yañez Caballero; Codex principal, sin subagentes. Sin PR creada; existentes y Actions actual no verificables por API. Siguiente paso exacto: revisar Actions del SHA de esta entrega; usar CMS para editar etiquetas sin que las pruebas exijan la copia anterior. Continuar revisión manual con dispositivos/lector y validación comercial/legal. No integrar ni publicar otra versión sin autorización correspondiente. Recompilar tras cambiar HEAD para actualizar version.json.

## 4 de noviembre de 2026 · Web preparada para el producto completo

Directiva explícita del propietario: Sistematicando está parcialmente desarrollado, pero la web debe trabajarse como la versión completa de lanzamiento; no se publicará hasta que producto/web estén al 100%. Sustituye el bloqueo previo de crear páginas de módulos solo después de verificar el software. Se permite preparar su copy objetivo como borrador; no se modifica la evidencia ni se marca un módulo como verificado. No solicitar nuevas publicaciones durante esta preparación.

Implementado: 14 páginas /funcionalidades/<id>/ con copy original específico (propuesta, resumen, tres beneficios, tres pasos y ámbito), enlaces entre módulos y sectores, CTA de guía/contacto y navegación desde catálogo/soluciones. Datos en features.items[].launch, campos/validaciones CMS y plantilla estática. Portada, sectores, FAQ y precios adaptados a tono de lanzamiento; precios usa propuesta personalizada sin inventar cifras, planes aprobados, pruebas gratuitas ni condiciones contractuales. Mockup sigue siendo conceptual; no se inventan capturas reales, testimonios, certificaciones ni PMS completo.

Vista previa global editable en site.json (launchDraft true y etiqueta/aviso); meta noindex y robots intactos. Catálogo presenta áreas y contenido comercial; estados/evidencias siguen en la matriz interna. Interfaz admin enlaza textos comunes de módulos. Son 34 páginas HTML más version.json y 25 editores. Los 14 estados/evidencias anteriores se compararon y quedaron intactos. Validador rechaza beneficios de lanzamiento vacíos.

Pruebas: check 47 archivos sin errores/advertencias, build y content:check aprobados; test:ci 34 rutas/125 destinos, navegación y reflujo 200% en 20 rutas a 390/1280 px, marca/editorial/versión, nueva prueba de las 14 páginas y axe 72 comprobaciones sin infracciones. Worker local 45 rutas más cabeceras/assets/JSON, query/405 y navegador aprobado; servidor detenido. Capturas móvil/escritorio de módulo, catálogo, sector y precios revisadas. Lighthouse home/catálogo/demo 100 rendimiento/accesibilidad/buenas prácticas; SEO 66 por noindex. Paquete local de 34 páginas verificado, sin publicar. Un archivo CSS incorrecto se detectó durante build y se restauró/corrigió antes de las validaciones finales.

Agente Codex principal, sin subagentes; autor Joel Alejandro Yañez Caballero. Todo solo en feat/feature-catalog. Rama Worker permanece en 557222e (envío anterior autorizado, no hay confirmación nueva de esa versión activa); af35674 fue la última identidad pública confirmada por el propietario. Sin deploy, DNS ni PR creada; PR existentes/CI remoto no verificables por API.

Siguiente paso exacto: revisar Actions del nuevo SHA y copy comercial de las 14 páginas; continuar Empresa/Ayuda/recursos editoriales y arquitectura de la oferta sin cifras inventadas. El producto parcial ya está confirmado: no volver a preguntar ese estado para bloquear frontend. Mantener launchDraft/noindex y no integrar a la rama del Worker hasta que el propietario confirme preparación completa y autorice el lanzamiento. Validación operativa, tarifas/condiciones, legal/privacidad y dispositivos/lector siguen pendientes antes de publicar.

## Cobertura Empresa/Ayuda/Blog

`verify-resources.mjs` forma parte de test:ci y prueba descubrimiento de artículos, tabla de contenidos por teclado, relaciones con guías/módulos y FAQ nativa de Ayuda con/sin JS. Produce qa/resources-report.json, también como artefacto Actions. Verificación de sitio/axe recorre todas las rutas generadas; reflujo al 200% incluye Nosotros/Ayuda/Blog y cada artículo (26 rutas × dos anchos en esta entrega). No contacta canales comerciales ni publica.

## 5 de noviembre de 2026 · Recorrido comercial

verify-editorial recorre precios → última etapa de implementación (ancla por teclado) → demo con y sin JavaScript; valida WhatsApp configurado, texto con teléfono CMS y guía oculta sin JS. Tras generar la guía se comprueba que el enlace WhatsApp no incorpore sus selecciones. verify-navigation incluye precios/implementación en texto al 200% (28 rutas a dos anchos). Validación de contenido exige etapas, preparación, responsabilidades y un único {phone}. Todo sin comunicaciones externas ni despliegue. Ejecutar Worker después de test:ci para evitar recompilar dist durante axe.

## Cobertura legal local

verify-legal.mjs forma parte de test:ci; qa/legal-report.json se limpia antes de la suite y se incluye como artefacto. Verifica identidad/canales, enlaces entre documentos, índice de términos por teclado y ausencia de formularios de aceptación, con/sin JS. Navega las dos páginas y genera la guía local, sin abrir servicios externos: exige peticiones GET al origen local, cero cookies y localStorage/sessionStorage vacíos. No prueba configuración pública/terceros ni constituye revisión legal.

Reflujo incluye privacidad/términos: 30 rutas a dos anchos. El validador bloqueó inicialmente un id «contenido» reservado para main; se cambió a informacion-comercial antes de compilar. No se debilitaron reglas. Ejecutar Worker solo después de terminar test:ci para no recompilar dist durante axe.

## Cierre técnico por ruta

verify-site exige metadata única/coherente (title, description, OG title/description/type/locale, lang, viewport), noindex y ausencia de canonical/og:url mientras no haya dominio autorizado; registra enlaces por ruta y buildVersion. Axe registra también buildVersion. audit-release es el último paso de test:ci, produce qa/release-report.json y RELEASE_CHECKLIST.md y falla ante identidad/cobertura obsoleta o infracciones. La CI elimina salidas previas y las conserva como artefactos de QA.

Comando independiente: `npm run audit:release`, solo tras generar informes del build vigente. Cambiar HEAD requiere recompilar; un informe guardado corresponde a su instantánea, que puede indicar sourceModified true. No debe reasignarse al commit final por editar el JSON. CI volverá a medir el SHA que ejecute. El informe mantiene siete puertas externas/manuales abiertas y readyToPublish false; no es un flujo de deploy. Estados HTTP 404 y recuperación por teclado sin/con JS se prueban con test:worker aparte, después de la suite. Reflujo incluye /404.html: 31 rutas a dos anchos.

verify-release-evidence.mjs ejecuta tres casos negativos tras generar el checklist: build distinto, cobertura incompleta y fallo axe simulado. Exige rechazo y que la salida válida no se sobrescriba; restaura los informes originales en finally. Evidencia en qa/release-guards-report.json, incluida como artefacto. No modifica contenido ni permisos de publicación.

## Revisión visual reproducible (opcional, local)

`npm run review:visual -- /tmp/sistematicando-visual` descubre rutas de dist y captura 390/1440 px, página completa/primera pantalla/pie, once estados del menú/buscador/guía y hojas de contacto. Genera index.html/report.json bajo /tmp; no es una comparación pixel a pixel ni aprobación humana. `--states-only` al final captura solo interacciones; usar carpeta distinta. Las capturas esperan fuentes, fijan scroll al inicio y desactivan animaciones para estabilizar la evidencia. Los componentes se capturan con altura suficiente para evitar la cabecera sticky sobre los campos.

No forma parte de cada ejecución CI por el volumen de imágenes; la regresión de geometría sí está en verify-navigation: home/pie en 320/390/768/900/1440 a 100/200%, altura de enlaces ≥44, sin colisiones ni desbordamiento. Revisión de todas las rutas a dos anchos y estados mantiene la evidencia local, no sustituye dispositivos/lector ni cambia permisos de publicación.

## Medición de rendimiento focal

`npm run audit:performance` mide cinco muestras secuenciales: home, catálogo, demo, primer módulo/artículo definidos en contenido. Incluye buildVersion, métricas, bytes, hallazgos, configuración y carpetas únicas /tmp con los Lighthouse completos. `--route=<una muestra> --runs=1..3 --output=/tmp/archivo.json` permite investigar sin reemplazar el informe principal. No hacer build ni correr otros navegadores en paralelo; no es un umbral de CI/publicación ni un benchmark de campo.

En esta entrega no se modifica frontend ni se repite test:ci/Worker; check/build y mediciones reales son las validaciones pertinentes. No agregar a cada push un informe Lighthouse histórico como si se hubiera regenerado en Actions. PERFORMANCE.md conserva los valores iniciales y las repeticiones, incluido el 86 aislado; no se eliminan outliers para afirmar un 100 universal.
