# Panel visual de contenido · 6 de noviembre de 2026

Petición del propietario: «Necesito que el CMS que tenemos sea más bonito, más visual». Se rediseña /admin conservando Pages CMS y sus permisos GitHub. En la entrega del panel la pregunta sobre edición integrada seguía abierta. El propietario confirmó después la edición visual real: implementación y alcance local en VISUAL_EDITOR.md. Se conserva Pages CMS y no se despliega infraestructura implícitamente.

## Implementación y recorrido

Panel local con identidad original, navegación por tareas, resumen de inventario, tres tarjetas visuales de marca/portada/planes y directorio buscable de los 34 editores. Cada tarjeta diferencia Editar (Pages CMS externo, otra pestaña) y Ver página (esta compilación). Los editores se obtienen de .pages.yml durante build: una sección no desaparece del directorio por mantener una lista manual parcial.

src/data/admin.ts agrupa los editores en páginas, contenido/oferta, marca/navegación y contacto/legal, con títulos legibles y destinos de vista previa. Las plantillas compartidas enlazan una página representativa. Al añadir un editor comprobar su grupo y ruta de muestra; verify-site detecta enlaces inválidos. El inventario no indica usuarios, actividad, estado de autenticación ni guardados en tiempo real.

Las muestras usan site.json, pages.json y pricing.json: logo original sin alterar, colores configurados, titular de portada y cuotas reales de la propuesta. Son muestras del contenido compilado, no capturas de toda la página ni editor WYSIWYG. Tras guardar en CMS hace falta un nuevo build de desarrollo para reflejar cambios aquí. No se promete previsualización instantánea.

El editor de campos, subida de medios, autenticación y guardado continúan en app.pagescms.org, rama feat/feature-catalog. No se ha modificado ni aplicado un tema a esa aplicación externa. Tampoco se añade OAuth propio, tokens de GitHub en navegador, endpoints de escritura, iframes ni sesión ficticia. El panel estático sigue siendo público y contiene solo información pública; las escrituras exigen permisos en el CMS.

## Dirección y reglas de interfaz

Superficies claras y neutrales, panel de resumen tinta #2a3139, acentos coral #ed735f y uso del logo recibido. Manrope para jerarquía administrativa; fuentes locales conservadas. Navegación lateral de 16rem en escritorio, 13rem a tamaño intermedio y navegación con ajuste de líneas por debajo de 900px. Contenido con ancho mínimo cero; retículas de tres/dos/una columnas según espacio disponible. Tarjetas con radios .7–1rem y separación 1–1.5rem; tipografía con escalado rem y foco global visible.

Controles con altura mínima de 44px; enlace de salto; encabezados por grupo; etiquetas de búsqueda; recuento aria-live y estado vacío. Buscar ignora acentos, combina palabras, oculta grupos vacíos; Limpiar restaura todo y devuelve foco. Los enlaces de grupo también restauran el directorio para garantizar un destino visible. Sin JS se oculta la búsqueda y se muestran los 34 editores. Sin animaciones nuevas ni dependencias.

## Validación y límites

verify-admin.mjs verifica inventario completo contra configuración, URLs de la rama correcta, muestras, búsqueda/vacío/reset/teclado, cinco anchos 320/390/768/1024/1440 y ausencia de peticiones externas antes de navegar. Está incluido en test:ci; admin-report.json se limpia y conserva en artefactos. Pruebas sin iniciar sesión ni guardar contenido real en el CMS.

Capturas locales de /admin y tarjetas a 390/1440 revisadas. Se corrigieron un id de grupo que colisionaba con el contenido principal y dos rutas de muestras legales, detectados por verify-site. Axe encontró zonas complementarias sin nombres únicos: se añadieron etiquetas accesibles a navegación lateral, inventario y aviso de rama, y se repitió la auditoría completa. Resultado final de suite y commit: PROGRESS.md. No certificación WCAG ni confirmación remota de Actions.

Siguiente paso exacto: revisar este panel visual y precisar si el propietario quiere también sustituir la pantalla externa de edición. Esa ampliación debe definir guardado autenticado, medios y previsualización sobre contenido real antes de elegir implementación. No solicitar publicar para revisar. Agentes: Codex principal, sin subagentes; skill digital-design-excellence para dirección visual. Sin despliegue, DNS ni cambio de noindex.

## 6/11/2026 · Edición visual funcional en desarrollo

Autorización expresa del propietario: seleccionar textos/imágenes en una vista previa y ver cambios inmediatamente. Implementado /admin/editor/ con iframe de páginas reales, selección vinculada a JSON, inspector, borrador inmediato, descarte, selección de logos existentes, guardado validado/hash/rollback y revisión explícita de commit/push a feat/feature-catalog. VISUAL_EDITOR.md contiene uso, arquitectura y límites. 43 páginas HTML, 34 editores CMS conservados; sin migrar contenido ni alterar evidencia SaaS.

La API existe solo en el servidor Astro de desarrollo y exige acceso local, Origin y CSRF; no se añade escritura al build estático ni al Worker. Commit bloquea rama distinta, archivos con cambios previos, conflictos e índice ajeno; no hay autocommit al escribir. Pages CMS mantiene edición estructurada y subida de medios. El editor visual alojado con OAuth público sigue pendiente; no presentarlo como servicio ya conectado.

Pruebas funcionales aprobadas: ocho grupos en proyecto/remoto Git bare temporales; UI real de selección/texto/imagen/descarte/guardado/recuperación/diálogo Git/vista móvil, con content/pages.json restaurado exactamente y sin commits/push de prueba al repositorio real. Check 70 archivos sin errores/avisos/hints; build 43 páginas. Cierre estático aprobado: 43 rutas/178 destinos internos, navegación y texto 200% en 32 rutas, marca/editorial/módulos/recursos/versión/legales/precios/admin y Chromium cinco escenarios. Axe inicial detectó zonas de nombres repetidos entre editor e iframe; etiquetas diferenciadas y auditoría completa repetida: 90 comprobaciones, cero infracciones detectadas. Inventario y guardas de lanzamiento aprobados, ocho bloqueos reales conservados (incluye CMS visual alojado). Ajuste posterior solo del inspector activo comprobado con UI real a 320/390/1440; fuente restaurada. Firefox/WebKit no ejecutados localmente. Seis pruebas del calculador económico también aprobadas. No se repitieron Lighthouse ni runtime Worker. CI incorpora ambos recorridos y artefactos; resultado remoto no confirmado.

Siguiente paso exacto: revisar el editor local y configurar una integración alojada con autenticación y permisos GitHub antes de usar escritura desde una URL pública. Los secretos se configuran fuera del chat. No publicar para probar. Agentes: Codex principal, sin subagentes; precios, estados reales y congelación de producción intactos. Sin PR nueva; existentes sin verificar.
