# Decisiones vigentes

Consolidación: 4 de noviembre de 2026 (America/Lima). El registro anterior íntegro está en [DECISIONS_HISTORY.md](DECISIONS_HISTORY.md); los estados históricos no sustituyen este resumen y [PROGRESS.md](PROGRESS.md).

## Producto y contenido

- Web comercial estática, no implementación del SaaS. Los 14 módulos permanecen no verificados; ninguna página permite inferir disponibilidad, integración SUNAT, precios o controles de seguridad reales.
- Contacto externo por WhatsApp autorizado y correo/WhatsApp de privacidad confirmados. Guía generada localmente, sin transmisión ni reserva. Datos fuente en content/contact.json; no volver a solicitarlos por falta de historial.
- Privacidad es versión para revisión, no adopción legal/operativa definitiva. Mantener noindex/robots hasta lanzamiento autorizado.

## Administración y fuentes

- Pages CMS conectado a GitHub; /admin es acceso al servicio externo, sin usuarios/credenciales ni API de escritura en el sitio. Edición en feat/feature-catalog, 24 editores.
- Fuente editorial content/*.json. src/data son adaptadores. .pages.yml se regenera cuando cambia el esquema, no tras cada edición: evitar sobrescribir configuración por rutina.
- Diseño estructural, lógica e integraciones requieren desarrollo. La identidad de compilación es técnica y de solo lectura, no un campo CMS.
- Originales del logo preservados. Derivados PNG de presentación generados por Astro, sin recorte/reconstrucción; selección y variante oscura en site.json. No subir derivados /_astro al CMS.

## Calidad y ejecución

- Astro estático, fuentes locales y CSS nativo. Wrangler sirve solo dist, barra final y 404 real; custom build obligatorio antes de servir/desplegar.
- CI de lectura y sin deploy. Revisa páginas, navegación, marca, editorial, versión y axe; elimina evidencia vieja antes de ejecutar. Mantener reglas y resultados incomplete, no silenciar fallos para obtener verde.
- Pruebas usan controles estables o nombres accesibles del contenido vigente; no exigir etiquetas históricas que el propietario puede editar. El arreglo FAQ conserva texto opaco durante la animación y cubre un instante intermedio.
- Versión: metadatos Git al compilar, sin variables de entorno/autor/correo/secretos; Git ausente → null. sourceModified cubre fuentes/configuración relevantes, no docs/QA. Fecha del commit, no de publicación. Cambiar HEAD requiere nuevo build.
- Lighthouse es laboratorio de tres rutas, no Core Web Vitals reales ni certificación WCAG completa. No quitar noindex para aumentar SEO.

## Git, permisos e identidad

- Desarrollo/CMS feat/feature-catalog; rama seguida por Cloudflare feat/brand-foundation. Push a esta última puede publicar. No mezclar ambas por «continuar» desarrollo.
- Aprobaciones de publicación concretas: 9a017af, 96bd165 y af35674. Para af35674, «Sigamos» respondió directamente a la pregunta específica de publicar 1be0fc0; interpretación comunicada antes de actuar. No es permiso general para entregas futuras.
- Fast-forward/push normal cuando procede, preservando commits del propietario. Sin force-push, cambios DNS ni retiro de noindex implícitos. PR no obligatoria si commit/push autorizado; no afirmar que no existen PR si la API no responde.
- Siempre autor/committer Joel Alejandro Yañez Caballero <joel.yc23@gmail.com>, configurados localmente y verificados. AGENTS.md explica replicarlo; .git/config no viaja con Git. No reescribir historial para cambiar autores antiguos.
- Solo Codex principal, sin subagentes. Antes de retomar tras una desconexión, inspeccionar checkout y referencias; no repetir ediciones/publicaciones sin conocer el estado.

## Consolidación de esta entrega

PROGRESS y README contenían estados superados (19 páginas, 23 editores y conexión CMS pendiente). Se conservan las fuentes históricas y se crea guía breve entre cuentas. No hay cambios de producto ni nuevo despliegue. Validación documental y de evidencia/Git; no repetición de tests de aplicación sin cambio funcional.

## 4 de noviembre de 2026 · Versión pública identificada por el propietario

Evidencia: JSON pegado por el usuario desde /version.json, guardado íntegro en qa/deployed-version-af35674.json. SHA af3567400d596d0f9e386de1cee47e5297985187, fecha 2026-11-04T21:47:13+00:00 y sourceModified false. Contrastados con ref remota feat/brand-foundation y fecha Git; coincidencia exacta/instante equivalente. Confirma identidad de la copia servida; no implica que el agente accediera directamente, CI actual verde ni revisión funcional de todas las páginas.

Se actualizan resúmenes/continuidad para no repetir el bloqueo de verificación ya resuelto por el usuario. Cambios solo documentales, sin despliegue. Agente Codex principal, identidad Joel Alejandro Yañez Caballero; sin PR creada, existentes no verificadas por API. Siguiente paso: revisión funcional manual y CI del HEAD, luego pendientes comerciales/legales.

## 4 de noviembre de 2026 · Revisión asistida y reflujo al ampliar texto

Se revisaron capturas de contacto/privacidad, resultado de demo, búsqueda vacía y versión de admin; interacción de teclado en validación vacía, generación, invalidación y salto de área. Código base equivalente al publicado af35674 antes del ajuste; revisión local, no acceso directo al Worker ni pruebas en dispositivos físicos/lector de pantalla.

Defecto reproducido: a 390 px con texto 200%, scroll horizontal en contacto/demo (408 px), catálogo (498 px) y admin (563 px). También se detectó portada al ampliar su mockup. Corrección: límites de ancho en logo/botones/énfasis de titulares; división de palabras largas; mínimos de grid/flex a cero, mockup con columnas adaptables y etiquetas del gráfico envolventes; botón de limpiar permite varias líneas. Sin recortar contenido, reducir el porcentaje de texto, cambiar fuentes/logos originales ni usar overflow:hidden para ocultar el problema.

Prueba de regresión de navegación ampliada: seis rutas, anchos 390/1280, texto 200%, sin overflow. Evidencia antes/después en qa/reflow-review.json. Nuevas comprobaciones de teclado: formulario vacío lleva foco a business, generación a result-title, reset a business y salto de área tras cero resultados restaura 14 tarjetas. Capturas de estados revisadas; a texto ampliado los títulos ocupan más líneas.

Pruebas: check 45 archivos sin errores/advertencias; build 20 páginas/24 editores; test:ci (20 rutas/69 destinos, navegación, marca, editorial, versión y axe 44 comprobaciones sin infracciones) aprobado. Lighthouse local final en home/catálogo/demo: rendimiento/accesibilidad/buenas prácticas 100 y SEO 66 por noindex. Informes regenerados, no datos de producción ni certificación WCAG.

Agente Codex principal, sin subagentes; autor Joel Alejandro Yañez Caballero. Rama feat/feature-catalog, sin nueva publicación ni PR creada; existentes/Actions remoto sin verificar por API. Publicado confirmado af35674. Siguiente paso: revisar Actions del nuevo SHA y autorizar la integración concreta si se quiere reflejar esta corrección en el Worker. Siguen pendientes dispositivos/lector, evidencia SaaS, tarifas y revisión/adopción legal.
