# Editor visual real · 6 de noviembre de 2026

El propietario confirmó que quiere seleccionar textos e imágenes sobre una vista previa y ver los cambios al momento. Esta entrega implementa edición visual funcional en desarrollo, con guardado validado en archivos y commit/push explícitos a GitHub. No es todavía un CMS visual alojado/autenticado para uso público. Pages CMS y sus 34 editores siguen disponibles.

## Uso en desarrollo

```sh
npm ci --include=dev
npm run dev
```

Abrir http://127.0.0.1:4321/admin/editor/. El servidor debe tener checkout Git de feat/feature-catalog y acceso Git habitual al remoto origin para enviar cambios. No introducir tokens en la web ni en el chat. Astro 7 puede iniciar un daemon: `npx --no-install astro dev stop` lo detiene. Las opciones --host o un túnel no convierten este editor local en servicio autenticado: no exponer su API mediante un proxy público.

1. Seleccionar página; las páginas internas enlazadas también se pueden recorrer desde la vista previa.
2. Seleccionar texto/logo con clic o teclado sobre el borde discontinuo. Si hay coincidencias múltiples, elegir el campo correcto en el inspector. Los nombres proceden del esquema CMS; la ruta de fuente se muestra para revisión.
3. Escribir texto plano o elegir un PNG/JPEG/WebP existente de public/media. La vista cambia mediante textContent/atributos de imagen; no se ejecuta HTML escrito por el editor. Descartar restaura la vista sin modificar archivos.
4. Guardar en el proyecto: compara hash del archivo, escribe el campo exacto, valida todo el contenido y restaura si falla. Astro actualiza la página desde los archivos reales. Su recarga de desarrollo puede reiniciar el inspector; el inventario de archivos pendientes permanece en el servidor durante la sesión.
5. Revisar guardado en GitHub: muestra los archivos de esta sesión y solicita una acción explícita para crear el commit y enviarlo solo a feat/feature-catalog. No integra ni despliega producción. La identidad de commit es Joel Alejandro Yañez Caballero <joel.yc23@gmail.com>.

Sin credenciales Git configuradas, se puede editar/guardar en el proyecto y revisar con Git manualmente. No se simula éxito del envío. Si push falla, el commit local se conserva y puede reintentarse sin duplicarlo. Una caída/reinicio del servidor pierde el inventario en memoria: los archivos/commits ya guardados siguen en disco y se revisan manualmente con git status/log. No cambiar de rama mientras se edita.

## Alcance y límites

La selección vincula textos renderizados exactamente identificables con campos de los JSON existentes. Conserva plantillas Astro y no migra datos. Cubre textos simples y los logos configurados; contenidos compuestos/calculados, moneda formateada, SEO no visible, rutas, IDs, estados/evidencias, arrays y estructuras se editan en Pages CMS. No es un constructor de diseño arbitrario ni garantiza que todos los elementos de las 42 páginas comerciales sean seleccionables.

La biblioteca visual selecciona imágenes existentes; para subir originales sigue disponible la biblioteca autenticada de Pages CMS. No hay upload anónimo ni edición binaria de logos. Las imágenes originales permanecen intactas. La vista móvil usa 390px cuando el espacio disponible lo permite, con ajuste al contenedor en pantallas menores.

Nuevo /admin/editor/: total 43 páginas HTML y los mismos 34 editores estructurados. En el build estático muestra su disponibilidad y una vista de lectura: no incluye el puente de selección de desarrollo, no llama a la API y no permite guardado. El panel /admin enlaza la herramienta con esa distinción explícita.

## Implementación y controles

- integrations/visual-editor.mjs: integración Astro mediante astro:server:setup exclusivamente. API /__visual_editor/state, /save y /commit, sin rutas de producción. Solo loopback, Host local, Origin correcto, token CSRF de sesión, JSON y tamaño acotado para POST. Sin CORS abierto ni secretos en contenido.
- Escrituras serializadas; lista de archivos definida por .pages.yml, campos existentes permitidos, rechazo de traversal/symlinks, hash optimista y validación con scripts/validate-content.mjs. No cambia IDs/estados ni ejecuta comandos desde texto del usuario.
- Git rechaza otra rama, HEAD cambiado, índice preparado por terceros, cambios previos en archivos afectados o modificaciones externas detectadas. Solo añade archivos guardados por esta sesión; sin add global, force-push ni rama de producción. Un archivo restaurado a su hash inicial sale de pendientes. Un commit pendiente de push se envía antes de crear otro.
- src/scripts/visual-preview.ts: puente en iframe solo en DEV y con editor-preview=1, mensajes limitados al origen y ventana padre; borradores en DOM, sin persistencia en navegador.
- src/scripts/visual-editor.ts: inspector, selección de campo, cancelación, guardado y revisión explícita de Git. No hay autoenvío ni autocommit al escribir.

El iframe representa código confiable de este mismo proyecto. Su sandbox no es una frontera para ejecutar HTML de terceros; las entradas se tratan como texto y las imágenes se restringen a la biblioteca. No se han añadido OAuth, usuarios, cookies de sesión públicas ni infraestructura alojada. Conservar el servidor local sin exposición pública hasta integrar autenticación de verdad.

## Pruebas reproducibles

```sh
node scripts/test-visual-editor.mjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/verify-visual-editor.mjs
```

La primera crea un proyecto temporal y remoto Git bare aislado: ocho grupos de pruebas de Host/Origin/CSRF, campos/rutas, guardado, conflicto, rollback, imágenes, autor/committer, destino Git, bloqueo de producción, push fallido/reintento y cambios previos. No toca el checkout real ni GitHub.

La segunda requiere servidor Astro local en 4321 (o VISUAL_EDITOR_URL local), usa la UI real para seleccionar/escribir/descartar/guardar, restaura exactamente content/pages.json y prueba imágenes/diálogo Git/vista móvil. No pulsa la confirmación de commit ni hace push real. Ejecutarla sin ediciones concurrentes; conserva el archivo inicial y lo restaura también al fallar. El flujo de commit se prueba solo en el remoto aislado. CI la ejecuta con servidor de desarrollo propio y lo detiene mediante trap.

Informes: qa/visual-editor-security-report.json y qa/visual-editor-report.json; no representan CI remoto ni un despliegue público. verify-admin también comprueba que el build estático no llama a la API y tiene Git deshabilitado. El sitio/reflujo/axe cubren la nueva página estática; no extrapolar esa auditoría a todos los estados anotados del editor local.

Se corrigió además una carrera de prueba preexistente: verify-resources espera el cambio de hash tras activar el índice por teclado, en lugar de comprobar URL antes de completarse la navegación. Se conserva la aserción y la navegación real, sin silenciar fallos.

## Siguiente paso exacto

Revisar la experiencia funcional local y conectar autenticación/autorización de GitHub en un servidor alojado antes de habilitar escritura en una URL accesible desde otras cuentas/equipos. Elegir y configurar ese alojamiento y sus credenciales mediante un flujo seguro; no enviar secretos por chat ni suponer que el Worker estático actual ya lo ofrece. Después probar login, permisos, conflictos, guardado y recuperación en esa integración. Se añade visual-cms como octavo bloqueo explícito en la checklist de lanzamiento. Esta entrega no autoriza publicar. Agente: Codex principal, sin subagentes.

Cierre de esta entrega: check 70 archivos sin errores/avisos/hints; build 43 páginas; sitio 43 rutas/178 destinos; reflujo 32 rutas; 90 comprobaciones axe sin infracciones tras distinguir zonas del iframe. UI real repetida con inspector activo a 320/390/1440 sin desbordamiento. Ocho grupos de persistencia/seguridad aprobados y fuente original restaurada. Remoto GitHub CI/Firefox/WebKit siguen sin confirmación local; no se publica. Informes son instantáneas de base b15d9e1 con cambios locales, no se reetiquetan al commit posterior.

## 6/11/2026 · Base de autenticación para edición alojada

Implementados workers/visual-auth.mjs y wrangler.editor-auth.jsonc separados del Worker público: flujo GitHub App, estado OAuth cifrado, sesión AES-GCM HttpOnly/Secure con duración máxima de una hora, comprobación de usuario manaturaloso y permiso push en el repositorio exacto, CSRF/logout y rechazo por defecto. Sin secretos/configuración devuelve 503. No hay endpoints de escritura ni integración todavía con el inspector alojado; contentWritesEnabled false. HOSTED_VISUAL_AUTH.md registra configuración y alcance.

Ocho grupos sintéticos de autenticación/criptografía/permisos aprobados. No hay login GitHub real, App registrada, credenciales configuradas o despliegue. CI incorpora prueba e informe visual-auth-report.json. Web estática, 43 páginas/34 editores, editor local y Pages CMS conservados. No se repite navegación/axe/Lighthouse por código servidor separado sin cambios frontend; la evidencia anterior conserva su identidad.

Siguiente paso exacto: elegir origen HTTPS, registrar/instalar GitHub App solo para sistematicando-web y configurar variables/secretos fuera del chat; revisar y autorizar despliegue de prueba por separado, probar login real y después conectar identidad con guardado remoto validado. El bloqueo visual-cms sigue abierto. Solo Codex principal, sin subagentes; sin publicación, DNS, PR nueva ni cambio en rama Worker. PR existentes y CI remoto sin verificar.
