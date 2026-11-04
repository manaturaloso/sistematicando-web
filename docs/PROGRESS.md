# Progreso y continuidad

Estado consolidado: 4 de noviembre de 2026 (America/Lima). Este archivo sustituye como resumen activo a [PROGRESS_HISTORY.md](PROGRESS_HISTORY.md), que conserva íntegro el registro anterior.

## Git y estado externo

- Repositorio: manaturaloso/sistematicando-web. Desarrollo y CMS: `feat/feature-catalog`.
- Último cambio funcional de la web: `1be0fc0`; integración autorizada enviada a la rama de Cloudflare `feat/brand-foundation`: `af35674`.
- Última mejora de pruebas: `5c92a27`, solo en desarrollo. Esta entrega posterior consolida documentación; consultar `git log -1` para su SHA final.
- Fetch de ambas ramas sin cambios concurrentes antes de consolidar. El push y referencias se verifican al entregar; repetir fetch en la próxima sesión.
- Worker: https://sistematicando-web.manaturaloso.workers.dev. El envío de `af35674` está confirmado en Git; su build/versión activa sigue sin confirmación remota desde este entorno.
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

Pendientes reales: confirmar build/versión activa de `af35674`; CI de los SHA actuales; revisión manual con dispositivos/lector de pantalla; evidencia del SaaS y tarifas; revisión/adopción de privacidad y otros textos legales; dominio/canonicals/sitemap/indexación autorizados. No hay páginas individuales de módulos con disponibilidad acreditada ni backend de leads.

## Siguiente paso exacto

1. Comprobar Cloudflare Build de `af35674` y abrir `/version.json` y `/admin/`: commit esperado empieza por `af35674`, sourceModified false. Si falta Git al compilar, null requiere diagnóstico, no supone por sí solo caída del sitio. Registrar la evidencia del propietario si la red del agente sigue bloqueada.
2. Revisar Actions del nuevo SHA de esta entrega. `5c92a27` mejora las pruebas ante ediciones CMS y no está integrado en la rama seguida; no actualizarla sin autorización correspondiente.
3. Recorrer contacto/demo/catálogo/privacidad en dispositivos y lector de pantalla; revisar los pendientes comerciales/legales. No inventar capacidades, precios ni datos.
4. Para continuar desde otra cuenta, seguir [HANDOFF.md](HANDOFF.md). Antes de editar: AGENTS, estado Git, fetch y configuración local de identidad. Tras cambiar HEAD, reconstruir para actualizar version.json.

Agente usado: Codex principal, sin subagentes. Identidad obligatoria: Joel Alejandro Yañez Caballero, joel.yc23@gmail.com. No reescribir commits publicados ni desplegar/cambiar DNS sin autorización. Las autorizaciones previas son entregas concretas.
