# Guardado remoto del editor · 6 de noviembre de 2026

Backend implementado en workers/repository-editor.mjs e integrado con la sesión de workers/visual-auth.mjs. El inspector tiene transporte preparado (HOSTED_INSPECTOR.md); no está desplegado ni probado con proveedor real. VISUAL_WRITES_ENABLED permanece "false" en wrangler.editor-auth.jsonc. El editor local y Pages CMS siguen operativos y sin migración de contenido.

## Contrato preparado

GET /editor-api/state, con cookie de sesión válida: revalida usuario/permisos y devuelve documentos, biblioteca, HEAD, repositorio/rama y estado del guardado. No devuelve token GitHub. Todos los archivos se leen desde el mismo SHA inmutable; no se mezcla una versión de archivo con otra de la rama.

POST /editor-api/commit: requiere configuración completa, flag explícito "true", sesión, Origin exacto, Content-Type application/json y X-CSRF-Token de /auth/session. Admite cuerpo máximo de 64 KiB y hasta 30 cambios:

```json
{
  "baseHead": "SHA exacto recibido en state",
  "edits": [{
    "file": "content/pages.json",
    "path": ["pages-index", "text_002"],
    "oldValue": "Texto leído en state",
    "value": "Nuevo texto propuesto"
  }]
}
```

El ejemplo del SHA es una explicación, no un valor válido. Paths son segmentos, no rutas de filesystem. Solo admite campos string existentes en los 13 JSON conocidos; texto plano e imágenes ya existentes. No crea/elimina contenido estructural, archivos o medios. IDs, rutas, moneda, estados/evidencias, datos operativos y propiedades de prototipo quedan bloqueados. Pages CMS conserva edición estructurada y subida de imágenes.

## Validación y transacción

src/lib/content-validation.mjs reúne las reglas existentes, sin Node/filesystem. scripts/validate-content.mjs conserva el adaptador local con comprobación real de medios/symlinks. Build, editor local y backend remoto usan las mismas reglas de referencias, planes, módulos, marcadores y esquema. No se suavizan reglas para permitir guardar.

El backend consulta referencia/commit/árbol completos, exige archivos regulares 100644 y rechaza árbol truncado, symlinks, inventario inesperado o contenido inválido. Lee .pages.yml en el formato JSON usado en este repositorio. Un cambio de inventario o formato requiere revisión técnica antes de seguir.

Antes de escribir: compara baseHead con la rama y oldValue con cada campo, rechaza duplicados y valida todos los documentos modificados con el mismo esquema. Después crea blobs de archivos afectados, árbol basado en el original y commit con un único padre igual a HEAD revisado. Autor/committer: Joel Alejandro Yañez Caballero <joel.yc23@gmail.com>. Actualiza únicamente refs/heads/feat/feature-catalog con force:false; no hay parámetro para elegir repositorio/rama ni merge con producción.

Una carrera posterior a crear objetos puede dejar blobs/commit sin referencia: GitHub rechaza una actualización no fast-forward y el servicio devuelve 409, sin afirmar guardado de la rama. Una respuesta perdida al actualizar debe resolverse recargando el estado; no hacer reintentos ciegos ni force-push. El backend no fuerza builds ni publica Cloudflare. Un commit puede activar el CI de la rama, conforme a la configuración del repositorio.

## Verificación realizada

```sh
npm run content:check
node scripts/test-visual-editor.mjs
node scripts/test-visual-auth.mjs
node scripts/test-repository-editor.mjs
```

Ocho grupos nuevos: snapshot coherente; commit/árbol/autor/destino; HEAD/campo obsoletos; traversal/prototipo/estados/URLs/marcadores; carrera al actualizar referencia; symlink; flujo sintético OAuth → sesión → CSRF → commit con flag por defecto cerrado; permiso revocado. Las pruebas usan contenido real del checkout como fixtures y respuestas simuladas de GitHub. No hacen peticiones externas ni escrituras reales en el repositorio. El editor local mantiene sus ocho grupos aislados; autenticación, ocho grupos sintéticos. Informe qa/repository-editor-report.json incorporado a CI y artefactos.

No se han configurado credenciales ni probado App real. No existe todavía una URL alojada utilizable. La UI ahora dispone de transporte local y alojado separado, con borradores/diff y confirmación; exige snapshot/preview del mismo commit limpio. La prueba alojada con proveedor real y su reconstrucción siguen pendientes. No habilitar el flag para presentar una integración completa que aún no está conectada.

## Siguiente paso exacto

Conectar el transporte remoto del inspector y la vista previa al snapshot validado, conservando borradores/confirmación y sin exponer tokens. En paralelo, completar origen HTTPS y registro/instalación de GitHub App siguiendo HOSTED_VISUAL_AUTH.md. Solo después de revisión y autorización de una prueba protegida: configurar secretos en Cloudflare, probar permisos reales/conflictos/recuperación y evaluar habilitar guardado. No desplegar la API local ni cambiar la rama del Worker público. Bloqueo visual-cms sigue pendiente. Agente: Codex principal, sin subagentes.

Cierre: check 75 archivos, cero errores/avisos/hints; content:check 14 módulos/3 guías/34 editores; tres suites de ocho grupos aprobadas (24 grupos de comprobaciones). Wrangler dry-run del servicio separado aprobado, 32.03 KiB sin subir/desplegar, flag false. Sin cambios frontend, no se repiten navegación/axe/Lighthouse; evidencia estática anterior conserva su identidad. Recompilar y verificar versión después del commit; paquete regenerable.

## 6/11/2026 · Inspector conectado al contrato remoto

Implementado src/lib/remote-editor.ts e integración del inspector: sesión/snapshot con cookies same-origin, borradores en memoria, revisión anterior/nuevo, envío explícito con CSRF/baseHead/oldValue, conservación ante 409/401/403, descarga y recuperación de borrador validada, logout y bloqueo tras commit hasta reconstruir preview. Metadatos del iframe exigen mismo SHA limpio; no se mezclan builds. Portada/logos tienen punteros explícitos; otros campos ambiguos se bloquean en remoto. Selector de las 41 páginas de contenido.

Build protegido aislado con npm run editor:build → .editor-dist y ASSETS del servicio separado; no sobrescribe dist. Modo estático normal/local conservados. Callback OAuth vuelve al editor. Ocho escenarios de navegador con API simulada aprobados, prueba de transporte aprobada; no hay login/guardado real en servicio alojado. HOSTED_INSPECTOR.md registra uso, contrato, límites y recuperación. CI incorpora bundle aislado, prueba y dry-run.

Siguen vacíos origen/client ID, sin secretos ni despliegue, flag de escritura false. Siguiente paso exacto: configurar GitHub App/URL/secretos fuera del chat y revisar/autorización de prueba alojada por separado; probar permisos reales y rebuild del preview desde el commit nuevo antes de habilitar guardado. 43 páginas/34 editores, precios y evidencia SaaS intactos. Sin publicación/DNS/cambio de rama Worker. Agente Codex principal, sin subagentes; sin PR nueva, existentes/CI remoto sin verificar.
