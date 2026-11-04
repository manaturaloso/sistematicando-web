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

Última integración enviada al Worker: af35674. Versión servida confirmada por el propietario mediante /version.json (sourceModified false); evidencia en qa/deployed-version-af35674.json. No fue una consulta directa exitosa del agente ni auditoría funcional completa. Mejoras de pruebas posteriores a 5c92a27 y corrección de reflujo al ampliar texto al 200% están en desarrollo; no se han publicado. Consultar HEAD para SHA exacto, no asumir que esta lista es la punta remota actual.

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

Identidad pública af35674 confirmada por JSON del propietario: no repetir esa solicitud salvo un despliegue nuevo. Revisar Actions del HEAD y recorrer home/contacto/demo/catálogo/privacidad/admin/404 en dispositivos/lector. La revisión asistida local ya corrigió reflujo móvil 200% y verificó teclado; no sustituye dispositivos físicos/lector. Si se detecta un fallo, obtener evidencia concreta y corregirlo antes de ampliar alcance.

Quedan evidencia SaaS, precios y privacidad. No crear afirmaciones para rellenar información ausente. Cualquier actualización pública exige autorización correspondiente. Las mejoras de pruebas/documentación posteriores a af35674 no necesitan desplegarse para documentar este estado.

## Mensaje para iniciar otra sesión

> Continúa manaturaloso/sistematicando-web desde su estado remoto. Lee AGENTS.md y docs/HANDOFF.md, PROGRESS.md y DECISIONS.md; verifica cambios locales y ambas ramas. Usa mi identidad Git registrada. Confirma primero versión activa del Worker y CI; continúa los pendientes autorizados. No publiques ni cambies DNS sin mi autorización. Guarda cambios/pruebas/pendientes/agentes/siguiente paso en documentación y GitHub y confirma rama, commit y PR.
