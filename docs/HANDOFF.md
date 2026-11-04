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

Última integración enviada al Worker: af35674; build/versión activa no confirmados desde este entorno. Mejoras de pruebas posteriores en 5c92a27 y esta entrega documental están en desarrollo. Consultar HEAD para SHA exacto, no asumir que esta lista es la punta remota actual.

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

Confirmar que Cloudflare Build de af35674 está Ready y abrir https://sistematicando-web.manaturaloso.workers.dev/version.json. Esperado commit af35674 y sourceModified false. /admin ofrece la misma identificación. Si el agente recibe CONNECT 403/Forbidden, pedir evidencia del dashboard/JSON sin afirmar fallo del sitio. La API también puede impedir consultar Actions/PR.

Después, revisar Actions del HEAD actual y revisión manual/dispositivos/lector, evidencia SaaS, precios y privacidad. No crear funciones/afirmaciones para rellenar esos datos ausentes. Cualquier actualización pública exige autorización correspondiente.

## Mensaje para iniciar otra sesión

> Continúa manaturaloso/sistematicando-web desde su estado remoto. Lee AGENTS.md y docs/HANDOFF.md, PROGRESS.md y DECISIONS.md; verifica cambios locales y ambas ramas. Usa mi identidad Git registrada. Confirma primero versión activa del Worker y CI; continúa los pendientes autorizados. No publiques ni cambies DNS sin mi autorización. Guarda cambios/pruebas/pendientes/agentes/siguiente paso en documentación y GitHub y confirma rama, commit y PR.
