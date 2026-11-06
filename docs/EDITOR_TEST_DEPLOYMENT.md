# Despliegue autorizado del editor de prueba · 6/11/2026

El propietario respondió «Sí» a desplegar únicamente sistematicando-editor-auth en la URL prevista, con guardado desactivado y sin modificar la web actual. Esta autorización persiste: no volver a solicitarla para este mismo despliegue. No autoriza publicar el sitio de producción, cambiar DNS, habilitar escrituras ni integrar feat/feature-catalog a feat/brand-foundation.

El propietario confirma que generó y guardó privadamente GITHUB_CLIENT_SECRET y SESSION_KEY; sus valores no se recibieron por chat ni están en el repositorio. No se ha confirmado que estén configurados en Cloudflare.

## Estado observado y bloqueo actual

- Runtime gestionado: observaciones actuales, red restringida/enforced sin api.cloudflare.com, sin bindings de credenciales Cloudflare.
- `wrangler whoami` con configuración habitual del entorno: «You are not authenticated. Please run wrangler login». No se inicia login interactivo ni se cambia de cuenta o usa una cuenta temporal.
- No se ejecutó despliegue real ni se comprobó la URL. No existe rechazo de auto-review que se esté interpretando como falta de permiso del usuario: el permiso está concedido y el bloqueo es acceso/configuración técnica.
- workers_dev pasa a true **solo en wrangler.editor-auth.jsonc** para publicar la URL de prueba al desplegar; preview_urls sigue false y VISUAL_WRITES_ENABLED sigue "false". wrangler.jsonc y rama Worker pública intactos.

## Crear el servicio desde el panel del propietario

En la misma cuenta Cloudflare donde está sistematicando-web:

1. Workers & Pages → Create application / Create Worker → importar repositorio GitHub. Elegir manaturaloso/sistematicando-web.
2. Crear un servicio nuevo con nombre exacto **sistematicando-editor-auth**. No editar ni reemplazar sistematicando-web. Si el panel propone el nombre del repositorio, cambiarlo por el nombre del editor.
3. Rama del nuevo servicio: **feat/feature-catalog**. La web actual conserva feat/brand-foundation. Si el formulario no permite elegir la rama inicialmente, seleccionarla en los ajustes del nuevo servicio antes de desplegar la configuración del editor.
4. Root directory: `/`. Build command: `npm run editor:build`. Deploy command: `npx wrangler deploy --config wrangler.editor-auth.jsonc`. El build usa .nvmrc (Node 24.22.1); si no lo detecta, configurar NODE_VERSION como variable de compilación.
5. Revisar que el destino/name de Wrangler sea sistematicando-editor-auth y la salida .editor-dist. Desplegar este servicio de prueba está autorizado. El primer despliegue sin secretos cerrará la API con 503, no abrirá acceso ni guardado.
6. Abrir **ese nuevo Worker** → Settings → Variables and Secrets y añadir los dos valores como tipo **Secret** (runtime), no como variables públicas/build variables:
   - GITHUB_CLIENT_SECRET: secreto de GitHub App.
   - SESSION_KEY: los 64 caracteres hexadecimales generados localmente, sin espacios ni saltos de línea.
7. Guardar y aplicar los secretos al nuevo servicio. Las variables públicas EDITOR_ORIGIN/GITHUB_CLIENT_ID y VISUAL_WRITES_ENABLED="false" provienen de la configuración versionada. No cambiar el flag.
8. Comprobar que Cloudflare asigna la URL prevista `https://sistematicando-editor-auth.manaturaloso.workers.dev`. Si entrega otra, registrar la URL real y ajustar origen/callback coherentemente antes de intentar OAuth; no suponer equivalencia.

No pegar secretos en capturas, chat, comandos visibles o Git. No necesitan permisos o secretos del Worker público. La clave privada de GitHub App no se usa en este flujo OAuth de usuario.

## Alternativa desde un equipo autorizado con CLI

Con el repo y acceso Cloudflare normales ya configurados, rama de desarrollo actualizada:

```sh
npm ci --include=dev
npm run editor:build
npx --no-install wrangler deploy --config wrangler.editor-auth.jsonc
npx --no-install wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.editor-auth.jsonc
npx --no-install wrangler secret put SESSION_KEY --config wrangler.editor-auth.jsonc
```

Los comandos secret put piden el valor de manera interactiva. No incluir valores en argumentos. El deploy debe ejecutarse desde el commit final revisado; consultar git log -1 y verificar name/flag antes. No usar --temporary ni configurar credenciales ajenas para superar el bloqueo del entorno gestionado.

## Prueba real después del despliegue

1. Guardar Build/Deployment ID, SHA, estado y URL reales del servicio nuevo, sin afirmar éxito solo por un push.
2. Abrir /admin/editor/ en la URL del editor; probar iniciar sesión como manaturaloso. Callback debe coincidir con la GitHub App y volver al inspector.
3. Confirmar /auth/session autenticado y contentWritesEnabled=false. Si faltan secretos, corregir configuración en Cloudflare; no activar guardado como solución a un fallo de login.
4. Comprobar que el snapshot y el preview tienen el mismo SHA limpio. El build inicial de Cloudflare debe usar el commit actual de feat/feature-catalog; una edición posterior en GitHub exige recompilar el preview.
5. Preparar/cancelar/descargar/recuperar un borrador sin enviarlo. Confirmar que GitHub y producción no cambian. Habilitar escritura requerirá una decisión posterior basada en prueba real, no esta autorización de despliegue.

Registrar observaciones en PROGRESS.md y LAUNCH_DECISIONS.md. Agente usado: Codex principal, sin subagentes. La guía no acredita despliegue ni OAuth real; permanece pendiente hasta evidencia del panel/servicio.
