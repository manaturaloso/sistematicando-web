# Retomar Sistematicando desde otra cuenta de Codex

Usa el repositorio GitHub manaturaloso/sistematicando-web. Fecha de esta guía: 5 de noviembre de 2026; las referencias remotas deben comprobarse otra vez al retomar.

## Prioridad actual

El paquete de revisión ya está preparado: empezar por REVIEW_PACKAGE.md y LAUNCH_DECISIONS.md. Los siguientes pasos incluidos en registros de entregas anteriores pueden estar superados; el resumen activo está en PROGRESS.md. No recrear páginas o pruebas completadas por no disponer del chat.

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
