# Inspector conectado al backend remoto · 6 de noviembre de 2026

Implementado el transporte del inspector para sesión GitHub y guardado remoto validado. Está preparado en código y probado con servicios simulados; no existe todavía despliegue, URL/credenciales configuradas ni login real verificado. El guardado del servicio sigue desactivado por defecto. Pages CMS y el editor local se conservan.

## Modos y compilación separada

- `npm run dev`: editor local sobre archivos, sin configurar el modo alojado.
- `npm run build`: web estática normal en dist, editor sin API de escritura.
- `npm run editor:build`: subproceso con PUBLIC_VISUAL_EDITOR_MODE=hosted y salida **.editor-dist**. No sobrescribe dist ni cambia el entorno del proceso que lo llama.

wrangler.editor-auth.jsonc sirve .editor-dist mediante ASSETS y envía /auth/*, /editor-api/* y /__visual_editor/* al Worker. La última ruta nunca expone la API local. No cambia wrangler.jsonc ni el Worker público. workers_dev/preview_urls siguen false; origen/client ID vacíos y VISUAL_WRITES_ENABLED=false. Crear este bundle no despliega ni habilita el servicio.

```sh
npm run editor:build
WRANGLER_SEND_METRICS=false npx --no-install wrangler deploy --dry-run --config wrangler.editor-auth.jsonc --outdir /tmp/sistematicando-editor-bundle
```

Las credenciales se configuran solo en el servidor conforme a HOSTED_VISUAL_AUTH.md. No añadir GITHUB_CLIENT_SECRET ni SESSION_KEY a variables PUBLIC_ o al navegador.

## Recorrido de edición alojada

1. Iniciar sesión con GitHub. El callback vuelve a /admin/editor/, no a una página JSON. El inspector consulta /auth/session y /editor-api/state con cookies del mismo origen. No recibe ni almacena el bearer GitHub.
2. Comparar commit y limpieza de la vista previa con el snapshot recibido. Si falta identidad, el commit es distinto o la vista procede de fuentes modificadas, no se habilita selección/guardado. El intercambio inicial entre iframe e inspector funciona aunque sus scripts carguen en distinto orden.
3. Seleccionar texto/logo identificable. El titular de portada y logos tienen vínculos explícitos al campo de origen. Otros textos se vinculan solo cuando son inequívocos; coincidencias múltiples en remoto se bloquean y remiten al CMS estructurado. No se adivina qué campo cambiar.
4. Escribir para previsualizar; **Añadir a revisión** conserva cambios en memoria de esta pestaña, sin POST de guardado ni commit. La revisión muestra valor anterior/nuevo y campo afectado. Permite volver al valor original para retirar un cambio.
5. Confirmar explícitamente el guardado. Un único POST contiene baseHead y cambios con oldValue. Backend revalida sesión/permisos/CSRF, contenido y conflictos según REMOTE_EDITOR_SAVES.md. Guardado desactivado significa botón de envío deshabilitado; preparar un borrador no habilita escrituras.
6. Tras confirmar el nuevo commit se requiere recompilar la vista desde ese SHA antes de seguir editando. No se mezcla el documento compilado anterior con contenido posterior ni se dispara despliegue de producción. La automatización del rebuild alojado debe configurarse y autorizarse por separado.

El selector permite las **41 páginas de contenido** (excluye /admin y /admin/editor): principales, 14 módulos, seis sectores, tres guías, tres artículos y 404. Se conservan tamaños adaptables y vista móvil. Tab/Enter seleccionan contenido; Alt+clic deja interactuar con controles/FAQ. Los enlaces de página y los controles del preview siguen siendo una vista de edición, no un mecanismo para enviar formularios reales.

## Borradores y errores

- Un 409 conserva la revisión para resolver el conflicto; no hay refresh automático que la borre.
- Un 401/403 muestra acceso y bloquea nuevos envíos, conservando cambios para descargarlos antes de volver a iniciar sesión.
- Descargar borrador genera JSON con repositorio, rama, SHA y cambios; excluye tokens/CSRF del editor. No es un guardado en servidor ni una copia automática persistente.
- Recuperar borrador exige el mismo repositorio/rama/SHA y campos/valores de origen válidos. Rechaza archivo mayor de 64 KiB, cambios protegidos, imágenes ajenas o versión incompatible. Una importación inválida no altera el borrador existente. La validación completa sigue ocurriendo en backend al enviar.
- Recargar o salir advierte si hay cambios sin enviar. Cerrar sesión con confirmación borra los borradores de esta pestaña, llama logout con CSRF y recarga sin volver a anunciar una sesión válida.

No hay localStorage de credenciales ni guardado automático. Un fallo de red después de actualizar la rama puede requerir reconciliar el SHA con GitHub; no hacer reintentos ciegos ni force-push.

## Pruebas y evidencia

`node scripts/test-remote-transport.mjs`: añadir/revertir, valor original, commit explícito, conflictos/sesión caducada sin pérdida, exportación/recuperación sin credenciales, versión incompatible, bloqueo tras commit y guardado desactivado.

`CHROMIUM_PATH=/usr/bin/chromium node scripts/verify-hosted-inspector.mjs` tras editor:build: ocho escenarios reales de navegador sobre bundle alojado con API simulada: éxito, conflicto, expiración, solo revisión, preview antiguo, preview con fuentes modificadas, usuario sin sesión y logout. Incluye revisión/cancelación, descarga/recuperación, selector de 41 páginas, tres anchos e inexistencia de llamadas externas/escrituras reales. El fixture ajusta identidad de iframe para simular un build limpio coherente; no es prueba de despliegue ni de OAuth real. Informe qa/hosted-inspector-report.json conserva la identidad original del build probado.

El editor local se prueba aparte con su servidor real y restauración exacta de fuentes (verify-visual-editor.mjs). CI incorpora ambos recorridos, build aislado y dry-run sin desplegar; su resultado remoto no se presume. Las auditorías estáticas de la web no certifican todos los estados interactivos del editor alojado.

## Siguiente paso exacto

Registrar/instalar la GitHub App y configurar origen HTTPS, variables y secretos fuera del chat; revisar y autorizar un despliegue de prueba protegido por separado. Probar OAuth/cookies/permisos/CSRF y commits reales, conflictos y recuperación sobre desarrollo. Comprobar cómo se reconstruye el preview desde el SHA nuevo antes de activar guardados. No exponer la API local, no habilitar el flag por considerar suficientes los fixtures y no publicar la web. El bloqueo visual-cms sigue pendiente de integración real. Agente: Codex principal, sin subagentes.

Cierre verificado: check 80 archivos sin errores/avisos/hints; build público 43 páginas; test:ci 43 rutas/178 destinos, reflujo 200% en 32 rutas y 90 comprobaciones axe sin infracciones detectadas. Transporte unitario y ocho escenarios de navegador alojado aprobados, incluidas recuperación y logout; tres suites de ocho grupos de servidor aprobadas. Editor local real repetido sobre código final, fuentes restauradas exactamente y daemon detenido. Dry-run del servicio con ASSETS aprobado; sin desplegar. Firefox/WebKit no ejecutados localmente; CI remoto no confirmado. Informes identifican sus builds de base ce6ad9f con fuentes modificadas y no se reasignan al commit posterior.

## 6/11/2026 · Registro de GitHub App confirmado por el propietario

El propietario proporcionó el Client ID público de Sistematicando Editor y confirmó la corrección de permisos/instalación después de la captura inicial sin acceso. Esa confirmación es del propietario, no una consulta verificada de GitHub. Se registran GITHUB_CLIENT_ID y EDITOR_ORIGIN previstos en wrangler.editor-auth.jsonc, única fuente de esos valores públicos. No se crean ni solicitan secretos por chat.

VISUAL_WRITES_ENABLED sigue false; workers_dev y preview_urls siguen false. No se desplegó ni comprobó que la URL exista. Falta generar/configurar Client secret y SESSION_KEY en Cloudflare, confirmar acceso solo al repositorio y autorizar/probar el servicio protegido. Siguiente paso exacto: GitHub App → General → Client secrets → Generate a new client secret; guardar el valor privadamente para Cloudflare, sin enviarlo por chat. No generar clave privada: esta integración usa el flujo OAuth de usuario con Client secret.

Solo Codex principal, sin subagentes. Sin cambio funcional de UI ni fuente comercial; 43 páginas/34 editores. No se repiten navegación/axe/Lighthouse por registrar configuración pública. Sin PR nueva, existentes y CI remoto sin verificar. La prueba de login real sigue pendiente.
