# Retomar Sistematicando desde otra cuenta de Codex

## Actualización vigente: planes propuestos (5/11/2026)

El propietario delegó elegir precios y funciones. Implementada la propuesta Esencial S/99, Gestión S/199 y Multisede S/399 al mes por cuenta, con puesta en marcha S/199, S/399 y S/699 respectivamente. [PRICING_STRATEGY.md](PRICING_STRATEGY.md) contiene módulos, límites, extras, criterios y condiciones pendientes. Sustituye referencias anteriores a no diseñar tarifas o esperar elección entre planes y propuesta personalizada. Sigue siendo borrador sin publicación y sin validar disponibilidad del SaaS. 42 páginas y 34 editores conservados. Fuente única content/pricing.json; editor de planes en /admin. CI añade verify-pricing.mjs y pricing-report.json, incluidos en artefactos.

Siguiente paso: revisar viabilidad económica/tributaria y condiciones de contratación de esta propuesta; incorporar evidencia real de CI y pruebas humanas cuando esté disponible. No pedir otra vez diseñar los planes ni publicar. Agente principal únicamente.

Usa el repositorio GitHub manaturaloso/sistematicando-web. Fecha de esta guía: 5 de noviembre de 2026; las referencias remotas deben comprobarse otra vez al retomar.

## Prioridad actual

El CMS visual tiene editor local, autenticación/backend alojados y transporte del inspector preparados. Leer HOSTED_INSPECTOR.md, HOSTED_VISUAL_AUTH.md y PROGRESS.md. App/Client ID/origen previsto registrados; permisos/instalación confirmados por el propietario. Faltan secretos/configuración Cloudflare y una prueba real autorizada; el flag de guardado sigue false. No rehacer código ya implementado ni afirmar que ya existe una URL alojada operativa. Las notas antiguas pueden estar superadas por el resumen activo.

## Inicio seguro

1. Abrir el checkout existente. Leer AGENTS.md, [PROGRESS.md](PROGRESS.md) y [DECISIONS.md](DECISIONS.md). Consultar los archivos *_HISTORY solo si hace falta contexto anterior.
2. Revisar `git status --short`, `git branch --show-current` y `git log -1`. Conservar cambios del propietario; no reset/force-push ni crear worktrees sin petición.
3. Configurar identidad local y verificar autor/committer:

```sh
git config --local user.name 'Joel Alejandro Yañez Caballero'
git config --local user.email 'joel.yc23@gmail.com'
git var GIT_AUTHOR_IDENT
git var GIT_COMMITTER_IDENT
```

4. Fetch de ambas ramas explícitas, revisar diferencias antes de integrar:

```sh
git fetch origin refs/heads/feat/feature-catalog:refs/remotes/origin/feat/feature-catalog refs/heads/feat/brand-foundation:refs/remotes/origin/feat/brand-foundation
```

Trabajar en feat/feature-catalog. Cloudflare sigue feat/brand-foundation: no enviar commits allí sin autorización concreta de publicación.

## Estado que no requiere volver a preguntar

CMS conectado y logos subidos/seleccionados por el propietario. Datos comerciales/privacidad confirmados en content/contact.json; los avisos legales aún requieren revisión operativa. No solicitar tokens ni contraseñas. No sustituir originales ni marcar SaaS disponible sin evidencia.

Nueva entrega autorizada para Worker: c1b0baf más registro documental; consultar SHA final en la rama feat/brand-foundation. Versión pública confirmada antes de esa actualización: af35674. Versión servida confirmada por el propietario mediante /version.json (sourceModified false); evidencia en qa/deployed-version-af35674.json. No fue una consulta directa exitosa del agente ni auditoría funcional completa. La corrección de reflujo c1b0baf y las mejoras de pruebas acumuladas se integran con autorización del propietario. Falta verificar el nuevo build/versión activa. Consultar HEAD para SHA exacto, no asumir que esta lista es la punta remota actual.

## Ejecutar y validar

Node fijado en .nvmrc (24.22.1). Instalar desde package-lock.json:

```sh
npm ci --include=dev
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

Con navegador Playwright instalado, `npm run test:ci`. Para instalarlo: `npx --no-install playwright install --with-deps chromium` (puede necesitar permisos/dependencias del sistema). Si ya existe Chromium del sistema, usar `CHROMIUM_PATH=/usr/bin/chromium npm run test:ci`.

CI verifica el commit del build: recompilar después de cualquier nuevo commit antes de ejecutar la suite. `npm run dev -- --port 4321` abre servidor local; no es URL pública.

Worker sin publicar: `WRANGLER_SEND_METRICS=false npm run worker:check`. Para runtime: `npm run worker:dev`, después `npm run test:worker` y detener servidor. En el entorno gestionado con home de solo lectura usar `XDG_CONFIG_HOME=/tmp/sistematicando-config` para Wrangler y telemetría Astro desactivada. No cambiar HOME ni credenciales.

Fuentes: contenido en content/*.json; esquema CMS con `npm run cms:config` solo al cambiar tipos/campos; matriz SaaS con `npm run docs:features`. Informes en docs/qa; comandos detallados en [CI.md](CI.md), [ADMIN.md](ADMIN.md) y [DEPLOYMENT.md](DEPLOYMENT.md).

## Próxima acción concreta

Continuar la web objetivo completa, con producto parcial ya confirmado. Revisar copy de las 14 fichas de módulos y continuar paquete final de revisión; compatibilidad local y CI estricta en COMPATIBILITY.md; rendimiento actual en PERFORMANCE.md; revisión visual local registrada en VISUAL_REVIEW.md; usar RELEASE_CHECKLIST.md y LEGAL_REVIEW.md; el recorrido precios/implementación/demo y Empresa/Ayuda/Blog están terminados en desarrollo. No bloquear frontend esperando verificación del SaaS ni pedir de nuevo el estado global. Las evidencias reales siguen en FEATURE_STATUS.md.

Mantener launchDraft/noindex y no publicar nuevas versiones hasta confirmación explícita de producto/web completos y autorización final. Rama Worker sigue en 557222e; el último JSON público aportado por el propietario correspondía a af35674. No modificar el Worker durante esta preparación.

Comprobar Actions del nuevo HEAD. Pruebas locales actuales: 42 rutas/162 destinos, 88 comprobaciones axe y 14 fichas de contenido CMS. Detalles en PROGRESS.md; capturas en LAUNCH_PREVIEW.md; nueva evidencia editorial en qa/resources-report.json.

## Mensaje para iniciar otra sesión

> Continúa manaturaloso/sistematicando-web desde su estado remoto. Lee AGENTS.md y docs/HANDOFF.md, PROGRESS.md y DECISIONS.md; verifica cambios locales y ambas ramas. Usa mi identidad Git registrada. Confirma primero versión activa del Worker y CI; continúa los pendientes autorizados. No publiques ni cambies DNS sin mi autorización. Guarda cambios/pruebas/pendientes/agentes/siguiente paso en documentación y GitHub y confirma rama, commit y PR.

## Directiva actual de producto y lanzamiento

El propietario confirmó producto parcialmente desarrollado y pidió trabajar la web como la versión completa prevista al 100%. Ya se prepararon 14 páginas de módulos y copy comercial de home/sectores/FAQ/precios; 42 páginas y 34 editores CMS. Contenido futuro en features.items[].launch; estados/evidencias reales se mantienen aparte. launchDraft true identifica la vista previa. No volver a bloquear frontend preguntando si el producto ya está operativo.

No hay autorización para publicar estas nuevas versiones: mantener todos los cambios en feat/feature-catalog hasta confirmación explícita de producto/web al 100% y autorización final. El Worker de revisión previo permanece en la rama con 557222e; no se elimina ni actualiza por esta directiva. Próximo trabajo: checklist de cierre y revisión de metadatos/navegación/errores; decisiones legales en LEGAL_REVIEW.md; pruebas/pendientes en PROGRESS.md.

## Entrega actual: implementación

/implementacion/ tiene cuatro etapas, contexto de preparación y responsabilidades a acordar; enlazado desde precios y demo. Fuente implementation.json; textos en pages-implementacion-index; párrafo WhatsApp en components-WhatsAppContact.text_007 con {phone}. 42 páginas / 34 editores. No hay precios/plazos/SLA aprobados ni nueva publicación. No reiniciar el recorrido comercial ya implementado: continuar privacidad/alcance de términos y pendientes de COMMERCIAL_SCOPE.md. Usar SHA de git log -1, no confundir refs de tracking antiguas con ls-remote.

## Entrega legal actual

/legal/terminos/ está preparada como borrador informativo, no contrato SaaS; ocho secciones en terms.json, copy en pages-legal-terminos. Privacidad ajustada al código e incluye administración externa. Identidad y mensajes con marcadores validados, contactos centrales intactos. La fecha original de la política identifica el borrador inicial, no aprobación legal. 42 páginas / 34 editores. Nueva prueba verify-legal y qa/legal-report.json, también en CI.

Siguiente acción exacta: consolidar checklist de lanzamiento por página/recorrido y revisar metadatos, navegación y errores; no crear otro contrato con condiciones inventadas ni repetir la revisión básica ya implementada. LEGAL_REVIEW.md lista adopción y decisiones operativas pendientes. No publicar; rama Worker 557222e intacta. Codex principal, sin subagentes.

## Checklist técnico actual

El cierre automatizado ya está implementado: `npm run test:ci` termina generando RELEASE_CHECKLIST.md y qa/release-report.json. `npm run audit:release` solo funciona con sitio/axe del mismo dist/version.json y cobertura completa. No ejecutar build/Worker mientras corre la suite; no volver a generar el checklist con evidencia antigua tras cambiar HEAD. El checklist conserva la identidad de la instantánea validada, sin fingir que es el SHA final posterior al commit.

Metadatos únicos/coherentes por ruta; seis guías/artículos con OG article. 404 con descripción propia y salidas Inicio/Ayuda, probada sin/con JS en Worker. 42 páginas / 34 editores. Los siete pendientes externos/manuales siguen abiertos. Próximo trabajo exacto: revisión visual de las páginas restantes a móvil/escritorio y estados buscador/guía/menú, registrar hallazgos por ruta; no rehacer el inventario ni pedir otra vez estado global del producto parcial.

## Revisión visual local completada

VISUAL_REVIEW.md y qa/visual-report.json registran el alcance: 84 capturas por ruta/ancho, once estados, revisión de primeras pantallas y cuerpos representativos; no lectura exhaustiva/aprobación de cada texto ni pruebas en dispositivos físicos. Pie responsive compacto, separación CTA de implementación y reflujo corregido para FAQ 320/200% y adorno home 900/200%. Navegación añade cinco anchos × dos tamaños de texto para geometría del pie/home.

Reproducir: CHROMIUM_PATH=/usr/bin/chromium npm run review:visual -- /tmp/sistematicando-visual. Galería index.html y report.json fuera del checkout. Solo estados: añadir --states-only al final (usar otra carpeta para no reemplazar el informe completo). No ejecutar build/Worker a la vez que captura o test:ci. Se mantienen 42 páginas / 34 editores; sin deploy.

Siguiente paso exacto: extender/ejecutar medición de rendimiento para home, catálogo, demo, una ficha de módulo y un artículo; conservar noindex y no prometer resultados de producción. No repetir el inventario o la revisión visual básica ya registrada.

## Rendimiento medido: no repetir por falta de historial

PERFORMANCE.md y dos JSON en qa contienen cinco rutas y dos repeticiones focales: cuatro rutas 100; módulo 86 inicial, luego 100/100 sin cambios frontend. La anomalía no se reproduce y se conserva; no hay una optimización aplicada ni una causa demostrada. SEO 66 deliberado, no retirar noindex. Auditor permite --route/--runs/--output bajo /tmp; datos completos temporales y resúmenes versionados. Identidad de la instantánea en cada JSON.

Siguiente paso exacto: probar menú/buscador/guía con movimiento reducido y preparar matriz de navegadores. Ejecutar Firefox/WebKit si están disponibles; registrar limitaciones en lugar de asumir compatibilidad. Dispositivos físicos/lector y decisiones de lanzamiento continúan pendientes. No volver a bloquear frontend preguntando si el producto parcial ya está completo ni publicar nuevas versiones.

## Compatibilidad ya implementada

COMPATIBILITY.md y qa/compatibility-report.json: Chromium 155 cinco escenarios aprobados (390/1440 con movimiento normal/reducido + no-JS). Firefox/WebKit no instalados/no ejecutados en este entorno; la política no incluye sus descargas, no se cambia para sortearla. Nunca convertir unavailable en aprobación. Prueba local estricta rechazó motores obligatorios ausentes (guard JSON); CI instala/exige los tres, resultado remoto pendiente de observar.

`CHROMIUM_PATH=/usr/bin/chromium npm run test:compatibility`; para requerir todos usar COMPAT_REQUIRED_ENGINES=chromium,firefox,webkit con binarios/dependencias realmente disponibles. Incluido en test:ci. No frontend/CMS nuevo; 42 páginas / 34 editores. Siguiente paso exacto: paquete final de revisión de recorridos y decisiones comerciales/legales; incorporar evidencia real de Actions cuando sea accesible, sin bloquear el trabajo independiente ni pedir publicación. No repetir movimiento reducido básico ya cubierto.

## Paquete de revisión listo

REVIEW_PACKAGE.md describe 42 páginas/34 editores terminados como borrador y un recorrido concreto; LAUNCH_DECISIONS.md conserva datos confirmados y asuntos abiertos. `python scripts/package-review.py /tmp/sistematicando-review.zip` genera web anidada e informes separados con manifiesto de hashes/versiones. Para otra cuenta: clonar rama, leer documentos, build y regenerar; el ZIP temporal no tiene que viajar con el historial del chat. No desplegar el ZIP externo ni interpretar su generación como aprobación.

CI d52bccc consultada: Forbidden (qa/remote-ci-status.json); no hay conclusión observada ni verificación nueva de PR existentes. Chromium local pasó; Firefox/WebKit siguen pendientes de resultado real. Siguiente paso exacto: revisar recorridos y registrar observaciones/decisiones de oferta/alcance en LAUNCH_DECISIONS.md; incorporar la ejecución real de Actions cuando sea accesible. No pedir de nuevo datos ya confirmados ni solicitar publicar para seguir revisando.

## Revisión editorial posterior al paquete

EDITORIAL_REVIEW.md registra cuatro correcciones independientes: demo ya no promete ausencia de restauración entre visitas; guía de evaluación enlaza la comunicación de lanzamiento; tres guías van directamente a su ficha de módulo (probado por teclado con/sin JS); etiquetas comunes de guías ahora editables en Página: recursos-guias-slug. Paquete sigue con 42 páginas / 34 editores. No reabrir esos hallazgos ni modificar evidencia del SaaS para justificar copy futuro.

Siguiente paso exacto: revisar el paquete actualizado y registrar observaciones/decisiones comerciales/legales concretas en LAUNCH_DECISIONS.md; la elección comercial ya fue delegada: revisar viabilidad de la propuesta implementada ni publicar. CI/Firefox/WebKit permanecen sin resultado remoto confirmado por la restricción conocida.

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

Check final: 64 archivos sin errores/avisos/hints; build de 42 páginas. verify-admin aprobado con/sin JS, cinco anchos, enlaces de rama, búsqueda/reset/teclado y sin peticiones externas. Capturas 390/1440 revisadas. CI incorpora admin-report.json y la prueba; cierre aprobado: 42 rutas y 176 destinos internos; navegación/200%, marca, editorial, módulos, recursos, versión, legales, precios, panel y compatibilidad Chromium aprobados. Axe inicial detectó nombres no únicos de zonas laterales; corregidas sus etiquetas y repetidas las 88 comprobaciones completas: cero infracciones detectadas. Inventario y guardas de lanzamiento aprobados. Firefox/WebKit siguen no disponibles localmente y CI remota no confirmada. No se repitieron Lighthouse ni runtime Worker. No se guardaron cambios en el servicio externo ni se enviaron mensajes.

Agente: Codex principal sin subagentes; skill digital-design-excellence aplicada. No se publica. Próximo paso exacto: revisar el nuevo /admin y concretar si también se quiere reemplazar el editor externo; no confundir este panel con un reemplazo ya realizado. Continúan costos reales, validación operativa/legal, dispositivos/lectores, CI remoto y autorización de lanzamiento pendientes.

## 6/11/2026 · Edición visual funcional en desarrollo

Autorización expresa del propietario: seleccionar textos/imágenes en una vista previa y ver cambios inmediatamente. Implementado /admin/editor/ con iframe de páginas reales, selección vinculada a JSON, inspector, borrador inmediato, descarte, selección de logos existentes, guardado validado/hash/rollback y revisión explícita de commit/push a feat/feature-catalog. VISUAL_EDITOR.md contiene uso, arquitectura y límites. 43 páginas HTML, 34 editores CMS conservados; sin migrar contenido ni alterar evidencia SaaS.

La API existe solo en el servidor Astro de desarrollo y exige acceso local, Origin y CSRF; no se añade escritura al build estático ni al Worker. Commit bloquea rama distinta, archivos con cambios previos, conflictos e índice ajeno; no hay autocommit al escribir. Pages CMS mantiene edición estructurada y subida de medios. El editor visual alojado con OAuth público sigue pendiente; no presentarlo como servicio ya conectado.

Pruebas funcionales aprobadas: ocho grupos en proyecto/remoto Git bare temporales; UI real de selección/texto/imagen/descarte/guardado/recuperación/diálogo Git/vista móvil, con content/pages.json restaurado exactamente y sin commits/push de prueba al repositorio real. Check 70 archivos sin errores/avisos/hints; build 43 páginas. Cierre estático aprobado: 43 rutas/178 destinos internos, navegación y texto 200% en 32 rutas, marca/editorial/módulos/recursos/versión/legales/precios/admin y Chromium cinco escenarios. Axe inicial detectó zonas de nombres repetidos entre editor e iframe; etiquetas diferenciadas y auditoría completa repetida: 90 comprobaciones, cero infracciones detectadas. Inventario y guardas de lanzamiento aprobados, ocho bloqueos reales conservados (incluye CMS visual alojado). Ajuste posterior solo del inspector activo comprobado con UI real a 320/390/1440; fuente restaurada. Firefox/WebKit no ejecutados localmente. Seis pruebas del calculador económico también aprobadas. No se repitieron Lighthouse ni runtime Worker. CI incorpora ambos recorridos y artefactos; resultado remoto no confirmado.

Siguiente paso exacto: revisar el editor local y configurar una integración alojada con autenticación y permisos GitHub antes de usar escritura desde una URL pública. Los secretos se configuran fuera del chat. No publicar para probar. Agentes: Codex principal, sin subagentes; precios, estados reales y congelación de producción intactos. Sin PR nueva; existentes sin verificar.

## 6/11/2026 · Base de autenticación para edición alojada

Implementados workers/visual-auth.mjs y wrangler.editor-auth.jsonc separados del Worker público: flujo GitHub App, estado OAuth cifrado, sesión AES-GCM HttpOnly/Secure con duración máxima de una hora, comprobación de usuario manaturaloso y permiso push en el repositorio exacto, CSRF/logout y rechazo por defecto. Sin secretos/configuración devuelve 503. No hay endpoints de escritura ni integración todavía con el inspector alojado; contentWritesEnabled false. HOSTED_VISUAL_AUTH.md registra configuración y alcance.

Ocho grupos sintéticos de autenticación/criptografía/permisos aprobados. No hay login GitHub real, App registrada, credenciales configuradas o despliegue. CI incorpora prueba e informe visual-auth-report.json. Web estática, 43 páginas/34 editores, editor local y Pages CMS conservados. No se repite navegación/axe/Lighthouse por código servidor separado sin cambios frontend; la evidencia anterior conserva su identidad.

Siguiente paso exacto: elegir origen HTTPS, registrar/instalar GitHub App solo para sistematicando-web y configurar variables/secretos fuera del chat; revisar y autorizar despliegue de prueba por separado, probar login real y después conectar identidad con guardado remoto validado. El bloqueo visual-cms sigue abierto. Solo Codex principal, sin subagentes; sin publicación, DNS, PR nueva ni cambio en rama Worker. PR existentes y CI remoto sin verificar.

## 6/11/2026 · Backend de guardado remoto validado

Implementado workers/repository-editor.mjs e integrado con autenticación: snapshot de GitHub fijado a HEAD, validación de los 13 JSON y medios regulares, conflictos HEAD/oldValue y commit/actualización no forzada solo en feat/feature-catalog. Autor/committer Joel Alejandro Yañez Caballero. API protegida por sesión, permiso revalidado, Origin/CSRF, límites y flag VISUAL_WRITES_ENABLED="false" por defecto. No existe escritura anónima ni selector de repositorio/rama.

Validación centralizada sin dependencias Node en src/lib/content-validation.mjs; scripts/validate-content.mjs mantiene adaptador filesystem y comprobación real de medios. Backend local/compilación/remoto comparten reglas. Ocho grupos nuevos de pruebas de repositorio aprobados con respuestas GitHub sintéticas; también pasan ocho grupos de autenticación y ocho de editor local aislado. No se llama ni escribe al GitHub real desde estas pruebas. REMOTE_EDITOR_SAVES.md documenta contrato, conflictos y recuperación.

No desplegado ni conectado aún a la UI alojada. 43 páginas/34 editores, sin cambios de contenido/identidad/precios. Siguiente paso exacto: adaptar transporte del inspector y su vista previa al snapshot remoto; completar URL/GitHub App/secretos fuera del chat y probar autenticación/guardado reales en entorno protegido autorizado. Mantener flag cerrado hasta integración y revisión. No publicar, DNS o rama Worker. Agente principal sin subagentes; sin PR nueva; CI remoto/PR existentes no verificados.

## 6/11/2026 · Inspector conectado al contrato remoto

Implementado src/lib/remote-editor.ts e integración del inspector: sesión/snapshot con cookies same-origin, borradores en memoria, revisión anterior/nuevo, envío explícito con CSRF/baseHead/oldValue, conservación ante 409/401/403, descarga y recuperación de borrador validada, logout y bloqueo tras commit hasta reconstruir preview. Metadatos del iframe exigen mismo SHA limpio; no se mezclan builds. Portada/logos tienen punteros explícitos; otros campos ambiguos se bloquean en remoto. Selector de las 41 páginas de contenido.

Build protegido aislado con npm run editor:build → .editor-dist y ASSETS del servicio separado; no sobrescribe dist. Modo estático normal/local conservados. Callback OAuth vuelve al editor. Ocho escenarios de navegador con API simulada aprobados, prueba de transporte aprobada; no hay login/guardado real en servicio alojado. HOSTED_INSPECTOR.md registra uso, contrato, límites y recuperación. CI incorpora bundle aislado, prueba y dry-run.

Siguen vacíos origen/client ID, sin secretos ni despliegue, flag de escritura false. Siguiente paso exacto: configurar GitHub App/URL/secretos fuera del chat y revisar/autorización de prueba alojada por separado; probar permisos reales y rebuild del preview desde el commit nuevo antes de habilitar guardado. 43 páginas/34 editores, precios y evidencia SaaS intactos. Sin publicación/DNS/cambio de rama Worker. Agente Codex principal, sin subagentes; sin PR nueva, existentes/CI remoto sin verificar.

## 6/11/2026 · Registro de GitHub App confirmado por el propietario

El propietario proporcionó el Client ID público de Sistematicando Editor y confirmó la corrección de permisos/instalación después de la captura inicial sin acceso. Esa confirmación es del propietario, no una consulta verificada de GitHub. Se registran GITHUB_CLIENT_ID y EDITOR_ORIGIN previstos en wrangler.editor-auth.jsonc, única fuente de esos valores públicos. No se crean ni solicitan secretos por chat.

VISUAL_WRITES_ENABLED sigue false; workers_dev y preview_urls siguen false. No se desplegó ni comprobó que la URL exista. Falta generar/configurar Client secret y SESSION_KEY en Cloudflare, confirmar acceso solo al repositorio y autorizar/probar el servicio protegido. Siguiente paso exacto: GitHub App → General → Client secrets → Generate a new client secret; guardar el valor privadamente para Cloudflare, sin enviarlo por chat. No generar clave privada: esta integración usa el flujo OAuth de usuario con Client secret.

Solo Codex principal, sin subagentes. Sin cambio funcional de UI ni fuente comercial; 43 páginas/34 editores. No se repiten navegación/axe/Lighthouse por registrar configuración pública. Sin PR nueva, existentes y CI remoto sin verificar. La prueba de login real sigue pendiente.
