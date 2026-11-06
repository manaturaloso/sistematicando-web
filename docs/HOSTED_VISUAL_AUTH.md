# Autenticación del editor alojado · 6 de noviembre de 2026

Base implementada en workers/visual-auth.mjs, con configuración separada wrangler.editor-auth.jsonc. No modifica wrangler.jsonc ni el Worker público sistematicando-web. No se ha desplegado ni usado un Client secret real. El propietario creó la App y confirmó permisos/instalación; Client ID y origen previsto están registrados en la configuración. La entrega posterior añade backend de guardado remoto protegido, desactivado por defecto (REMOTE_EDITOR_SAVES.md); la conexión del inspector ya está preparada (HOSTED_INSPECTOR.md), sin despliegue ni prueba real de proveedor.

## Flujo implementado

- GET /auth/login: redirige a GitHub con client_id, redirect_uri fijo y estado aleatorio. Cookie de estado cifrada, HttpOnly/Secure/SameSite=Lax y cinco minutos de duración.
- GET /auth/callback: compara estado/cookie, rechaza caducidad y parámetros duplicados; intercambia el código exclusivamente desde el servidor. Consulta /user y el repositorio concreto. Solo admite login manaturaloso, full_name manaturaloso/sistematicando-web y permissions.push === true.
- Sesión AES-GCM con nonce aleatorio y origen como datos autenticados, en cookie __Host-, HttpOnly/Secure/SameSite=Lax, duración máxima una hora o menor si el token vence antes. El token GitHub no aparece en JSON, HTML ni almacenamiento accesible desde JavaScript.
- GET /auth/session: vuelve a comprobar usuario/permisos en GitHub, devuelve cuenta/repositorio/rama, caducidad y CSRF, sin token. contentWritesEnabled refleja el flag de guardado, cerrado por defecto; no conecta por sí solo el inspector.
- POST /auth/logout: exige Origin y CSRF, y elimina la cookie del navegador. No equivale a revocación global del token o de copias robadas de una sesión. La caducidad, rotación de SESSION_KEY y revocación de la App en GitHub son mecanismos distintos.

No hay proxy genérico; los endpoints de edición posteriores están limitados, autenticados y desactivados por defecto. No hay acceso a otra rama o repositorio, CORS abierto, redirecciones de retorno arbitrarias ni registro de secretos. Todos los resultados llevan no-store y no-referrer. Errores del proveedor fallan cerrados y no se reflejan sus cuerpos. La configuración incompleta responde 503 sin llamadas a GitHub. workers_dev y preview_urls quedan false; el origen registrado sigue siendo previsto, no una URL comprobada como desplegada.

## Configuración requerida fuera del chat

1. Elegir la URL HTTPS canónica del servicio de edición. Debe ser un origen exacto, sin ruta, credenciales, barra final, query ni fragmento. La aprobación para desarrollo no autoriza desplegarlo.
2. En la cuenta GitHub autorizada, registrar una **GitHub App**, no una OAuth App con acceso general a repositorios. Nombre descriptivo vinculado a Sistematicando; propietario Joel Alejandro Yañez Caballero. Configurar Homepage con el origen elegido y callback `<origen>/auth/callback`. Solicitar únicamente el permiso de repositorio Contents: Read and write para el futuro guardado y Metadata: Read. No habilitar webhooks, Actions ni administración por esta integración.
3. Instalar la App solo en manaturaloso/sistematicando-web y autorizar al usuario manaturaloso. No cambiar permisos de Pages CMS ni retirarlo durante esta preparación. El inicio de sesión de una App y su instalación/autorización son pasos distintos; las pruebas reales deben verificar ambos.
4. Guardar EDITOR_ORIGIN y GITHUB_CLIENT_ID como variables del servicio. Client ID no es un secreto, pero la configuración no debe inventarlo.
5. Generar un Client secret y una clave aleatoria de 32 bytes en hexadecimal para SESSION_KEY. Guardarlos con los mecanismos de secretos de Cloudflare como GITHUB_CLIENT_SECRET y SESSION_KEY, nunca en Git, frontend, documentos o chat. La clave de los fixtures de prueba no debe usarse para configurar nada real.
6. Revisar el código/configuración y autorizar expresamente un despliegue de prueba protegido antes de ejecutarlo. Esta entrega solo hace dry-run sin subir archivos. No desplegarlo para descubrir luego permisos/origen.

No se configura ningún secreto con comandos durante esta entrega. Cuando corresponda, `wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.editor-auth.jsonc` y el equivalente SESSION_KEY solicitan valores de forma interactiva; no introducirlos en el texto del comando ni en logs. Revisar también la configuración del dominio/ruta y mantener el Worker público intacto.

## Pruebas ejecutadas y reproducibles

```sh
node scripts/test-visual-auth.mjs
npm run editor:build
WRANGLER_SEND_METRICS=false npx --no-install wrangler deploy --dry-run --config wrangler.editor-auth.jsonc --outdir /tmp/sistematicando-visual-auth
```

Ocho grupos sintéticos: configuración ausente; origen; estado/expiración; cookies/sesión cifrada y ausencia de bearer en respuesta; usuario/repositorio/permisos; manipulación/expiración/rotación de clave; logout con CSRF; error upstream y ausencia de escritura. Las llamadas GitHub están sustituidas por respuestas locales de fixture. No es evidencia de login con el proveedor, instalación de App, permisos reales ni despliegue. qa/visual-auth-report.json conserva ese alcance. CI ejecuta la prueba y guarda el informe, pero su resultado remoto sigue sin observarse.

## Siguiente paso exacto

Completar URL y registro seguro de App, revisar/autorización de despliegue de prueba por separado y comprobar login real, denegación, permisos revocados, caducidad/logout y recuperación. Después conectar esta identidad con el inspector y un guardado remoto validado que use conflictos de SHA y solo feat/feature-catalog. No reutilizar la API local basada en filesystem/Git CLI dentro de Cloudflare ni activarla como proxy público.

Antes de habilitar guardados alojados: revalidar permisos en cada escritura, validar contenido equivalente a los JSON/esquema, proteger CSRF/origen, revisar concurrencia, auditoría/recuperación y política de sesiones/rate limiting del servicio. El bloqueo visual-cms de lanzamiento permanece abierto. No se han aprobado ni publicado producto, precios, legal o dominio. Agente Codex principal, sin subagentes.

Cierre técnico: check 72 archivos, cero errores/avisos/hints; ocho grupos sintéticos aprobados; Wrangler 4.157.0 dry-run de la configuración separada aprobado (8.58 KiB sin subir/desplegar, origen/client ID vacíos, sin secretos). Solo cambian servidor/QA/documentos y seguimiento de procedencia; UI estática intacta. Recompilar/verificar versión tras commit; conservar identidades previas de QA sin reasignarlas a este SHA.

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
