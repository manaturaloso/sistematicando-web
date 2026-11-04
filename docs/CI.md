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
