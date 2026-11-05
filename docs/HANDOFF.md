# Retomar Sistematicando desde otra cuenta de Codex

Usa el repositorio GitHub manaturaloso/sistematicando-web. Fecha de esta guía: 4 de noviembre de 2026; las referencias remotas deben comprobarse otra vez al retomar.

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

Continuar la web objetivo completa, con producto parcial ya confirmado. Revisar copy de las 14 fichas de módulos y seguir Empresa/Ayuda/recursos/oferta. No bloquear frontend esperando verificación del SaaS ni pedir de nuevo el estado global. Las evidencias reales siguen en FEATURE_STATUS.md.

Mantener launchDraft/noindex y no publicar nuevas versiones hasta confirmación explícita de producto/web completos y autorización final. Rama Worker sigue en 557222e; el último JSON público aportado por el propietario correspondía a af35674. No modificar el Worker durante esta preparación.

Comprobar Actions del nuevo HEAD. Pruebas locales actuales: 34 rutas/125 destinos, 72 comprobaciones axe y 14 fichas de contenido CMS. Detalles en PROGRESS.md; capturas en LAUNCH_PREVIEW.md.

## Mensaje para iniciar otra sesión

> Continúa manaturaloso/sistematicando-web desde su estado remoto. Lee AGENTS.md y docs/HANDOFF.md, PROGRESS.md y DECISIONS.md; verifica cambios locales y ambas ramas. Usa mi identidad Git registrada. Confirma primero versión activa del Worker y CI; continúa los pendientes autorizados. No publiques ni cambies DNS sin mi autorización. Guarda cambios/pruebas/pendientes/agentes/siguiente paso en documentación y GitHub y confirma rama, commit y PR.

## Directiva actual de producto y lanzamiento

El propietario confirmó producto parcialmente desarrollado y pidió trabajar la web como la versión completa prevista al 100%. Ya se prepararon 14 páginas de módulos y copy comercial de home/sectores/FAQ/precios; 34 páginas y 25 editores CMS. Contenido futuro en features.items[].launch; estados/evidencias reales se mantienen aparte. launchDraft true identifica la vista previa. No volver a bloquear frontend preguntando si el producto ya está operativo.

No hay autorización para publicar estas nuevas versiones: mantener todos los cambios en feat/feature-catalog hasta confirmación explícita de producto/web al 100% y autorización final. El Worker de revisión previo permanece en la rama con 557222e; no se elimina ni actualiza por esta directiva. Próximo trabajo: Empresa/Ayuda/recursos y oferta comercial sin precios inventados; pruebas/pendientes en PROGRESS.md.
