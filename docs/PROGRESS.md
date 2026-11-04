# Progreso y continuidad

Estado consolidado: 4 de noviembre de 2026 (America/Lima). Este archivo sustituye como resumen activo a [PROGRESS_HISTORY.md](PROGRESS_HISTORY.md), que conserva íntegro el registro anterior.

## Git y estado externo

- Repositorio: manaturaloso/sistematicando-web. Desarrollo y CMS: `feat/feature-catalog`.
- Último cambio funcional de la web: `1be0fc0`; integración autorizada enviada a la rama de Cloudflare `feat/brand-foundation`: `af35674`.
- Última mejora de pruebas: `5c92a27`, solo en desarrollo. Esta entrega posterior consolida documentación; consultar `git log -1` para su SHA final.
- Fetch de ambas ramas sin cambios concurrentes antes de consolidar. El push y referencias se verifican al entregar; repetir fetch en la próxima sesión.
- Worker: https://sistematicando-web.manaturaloso.workers.dev. La versión servida `af35674` quedó confirmada por el JSON de /version.json aportado por el propietario; sourceModified false y fecha coincidente con Git. Evidencia en qa/deployed-version-af35674.json. El agente no hizo una consulta directa exitosa ni un recorrido funcional remoto.
- API GitHub y acceso al hostname estuvieron bloqueados por Forbidden/CONNECT 403. No confundir con un fallo del sitio. El propietario confirmó Actions verde para `296dc05`, no para todos los SHA posteriores.
- No se crearon PR; las existentes no pudieron consultarse. No afirmar que no existan.

## Implementado

Astro 7.4.5, TypeScript 6.0.3, Node 24.22.1 y Wrangler 4.157.0 fijados. Sitio estático; no hay integración SaaS ni receptor propio de solicitudes.

20 páginas HTML terminadas en desarrollo: home, 404, contacto, admin, catálogo, precios informativos, guía de demo, privacidad en revisión, índice de soluciones y seis sectores, recursos y tres guías, FAQ. Inventario en [SITEMAP.md](SITEMAP.md).

- Catálogo de 14 módulos conceptuales, cinco áreas, búsqueda local, recuentos/estado vacío y navegación por área; sin JS se conserva el catálogo completo. Los módulos siguen sin evidencia operativa.
- Guía local: tres selecciones, validación, resumen, descarga TXT, reset e invalidación al cambiar opciones. Generar/descargar no envía datos ni reserva una demo.
- WhatsApp comercial autorizado y canales separados de privacidad en contacto/demo. Datos confirmados en `content/contact.json`; política aún para revisión/adopción.
- Pages CMS conectado a GitHub, con guardados reales comprobados (commits `1206881`–`55f79ee`). `/admin/` abre el servicio externo autenticado; 24 editores, medios y contenido `content/*.json`. No es un constructor visual arbitrario.
- Textos dinámicos del buscador y del documento/avisos de demo editables. Recuentos requieren exactamente un `{count}`; validación antes del build.
- Logos originales en `public/media`, hashes conservados. Astro genera PNGs de presentación de 256/512/768 px con srcset; favicon/SVG directos. Fuentes locales Gluten/Manrope y licencias.
- Menú progresivo con teclado/Escape, texto ampliado y navegación sin JS; inicialización temprana y precarga de fuentes. FAQ sin pérdida transitoria de contraste por opacidad.
- `/version.json` y panel de versión en `/admin/`: commit, fecha del commit y cambios locales de fuente. Build estático; sin Git devuelve null. Worker aplica no-store/noindex al JSON. No es un indicador de éxito del despliegue.
- Workflow `Site and CMS quality`: check, dry-run, sitio, navegación, marca, editorial/descarga, versión y axe; artefactos de QA. No despliega.

## Pruebas y evidencia

Resultados ejecutados antes de esta consolidación, no repetidos para cambios solo documentales:

| Comprobación | Resultado observado |
| --- | --- |
| Check/build/content | Sin errores; 20 páginas HTML más JSON de versión, 24 editores. |
| Sitio | 20 rutas y 69 destinos internos. |
| Navegación | Sin JS, teclado/Escape, salto al contenido, texto 200% y scripts externos bloqueados. |
| Marca | Seis anchos a DPR1/2, originales por hash, variantes y transferencia responsive. |
| Editorial/contacto | Canales JS/no-JS sin mensajes reales; copia CMS, descarga TXT e invalidación. |
| Versión | Git limpio/modificado/ausente; JSON/admin coincidentes; Worker no-store/noindex. |
| Axe | 44 comprobaciones, cero infracciones detectadas. Incomplete conservados; no certificación WCAG. |
| Worker local | 31 comprobaciones de rutas más JSON/cabeceras, assets, query, POST 405 y navegador. |
| Etiquetas personalizadas | Menú, buscador, campos, botones y opciones editados temporalmente; pruebas aprobadas; fuentes y build restaurados. |

Informes en `docs/qa`. Lighthouse histórico de tres rutas llegó a rendimiento/accesibilidad/buenas prácticas 100 y CLS 0; SEO 66 por noindex. No son métricas de producción ni una auditoría de todas las páginas.

Esta entrega: revisión de informes JSON, referencias Git, enlaces de los documentos nuevos y `git diff --check`. No modifica código ni publica.

## Fases y pendientes

El plan original numera 0–10: inicialización y base visual completadas; home/soluciones/catálogo/contacto/precios informativos/recursos/CMS implementados. Cierre de QA y verificación del Worker en curso (fases 8–9). Lanzamiento oficial (10) pendiente.

Pendientes reales: CI de los SHA actuales; revisión manual con dispositivos/lector de pantalla; evidencia del SaaS y tarifas; revisión/adopción de privacidad y otros textos legales; dominio/canonicals/sitemap/indexación autorizados. No hay páginas individuales de módulos con disponibilidad acreditada ni backend de leads.

## Siguiente paso exacto

1. Identidad de la versión pública af35674 confirmada; no volver a pedir el mismo JSON salvo otro despliegue. Revisar Actions del HEAD de desarrollo; verde histórico de 296dc05 no acredita los nuevos SHA.
2. Recorrer contacto/demo/catálogo/privacidad/admin y una ruta inexistente en dispositivos/lector. Confirmar logo, navegación y canales sin enviar mensajes reales. Identificar cualquier defecto concreto antes de añadir trabajo nuevo.
3. Resolver evidencia SaaS, tarifas y revisión/adopción legal/operativa con el propietario. Mantener noindex y DNS mientras no se autorice lanzamiento oficial.
4. Las mejoras de pruebas 5c92a27 y documentación están solo en desarrollo; no hace falta otra publicación para registrar esta evidencia. Continuidad en HANDOFF.md, identidad local obligatoria y fetch antes de editar. Recompilar tras cambiar HEAD.

Agente usado: Codex principal, sin subagentes. Identidad obligatoria: Joel Alejandro Yañez Caballero, joel.yc23@gmail.com. No reescribir commits publicados ni desplegar/cambiar DNS sin autorización. Las autorizaciones previas son entregas concretas.

## Confirmación de versión pública · 4 de noviembre de 2026

El propietario pegó el JSON de /version.json: af3567400d596d0f9e386de1cee47e5297985187, fecha 2026-11-04T21:47:13+00:00, sourceModified false. Coincide con la referencia remota de feat/brand-foundation y fecha de commit en Git. Validación documental/schema/SHA/fecha y diff; sin repetir pruebas de aplicación ni nuevo despliegue. No equivale a auditoría de todas las rutas ni CI remoto aprobado. Solo Codex principal; sin PR creada, existentes sin verificar por API.
