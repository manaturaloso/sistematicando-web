# Progreso y continuidad

Estado consolidado: 4 de noviembre de 2026 (America/Lima). Este archivo sustituye como resumen activo a [PROGRESS_HISTORY.md](PROGRESS_HISTORY.md), que conserva íntegro el registro anterior.

## Git y estado externo

- Repositorio: manaturaloso/sistematicando-web. Desarrollo y CMS: `feat/feature-catalog`.
- Base pública confirmada por el propietario: `af35674`. Nueva entrega autorizada: corrección de reflujo `c1b0baf` más registro documental; SHA final con git log -1. Verificación de la nueva versión servida pendiente.
- Pruebas posteriores a `5c92a27` ahora cubren texto 200% en móvil/escritorio y foco de teclado en demo/catálogo. Consultar `git log -1` para SHA final de esta entrega.
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

Resultados vigentes, incluyendo la suite repetida tras corregir el reflujo:

| Comprobación | Resultado observado |
| --- | --- |
| Check/build/content | Sin errores; 20 páginas HTML más JSON de versión, 24 editores. |
| Sitio | 20 rutas y 69 destinos internos. |
| Navegación | Sin JS, teclado/Escape, salto al contenido, texto 200% en seis rutas a 390/1280 px y scripts externos bloqueados. |
| Marca | Seis anchos a DPR1/2, originales por hash, variantes y transferencia responsive. |
| Editorial/contacto | Canales JS/no-JS sin mensajes reales; copia CMS, descarga TXT e invalidación. |
| Versión | Git limpio/modificado/ausente; JSON/admin coincidentes; Worker no-store/noindex. |
| Axe | 44 comprobaciones, cero infracciones detectadas. Incomplete conservados; no certificación WCAG. |
| Worker local | 31 comprobaciones de rutas más JSON/cabeceras, assets, query, POST 405 y navegador. |
| Etiquetas personalizadas | Menú, buscador, campos, botones y opciones editados temporalmente; pruebas aprobadas; fuentes y build restaurados. |

Informes en `docs/qa`. Lighthouse histórico de tres rutas llegó a rendimiento/accesibilidad/buenas prácticas 100 y CLS 0; SEO 66 por noindex. No son métricas de producción ni una auditoría de todas las páginas.

Esta entrega: revisión asistida de capturas/teclado y corrección CSS de desbordamientos con texto 200%; check/build, suite completa y Lighthouse aprobados. Evidencia antes/después en qa/reflow-review.json. No se publica.

## Fases y pendientes

El plan original numera 0–10: inicialización y base visual completadas; home/soluciones/catálogo/contacto/precios informativos/recursos/CMS implementados. Cierre de QA y verificación del Worker en curso (fases 8–9). Lanzamiento oficial (10) pendiente.

Pendientes reales: CI de los SHA actuales; revisión manual con dispositivos/lector de pantalla; evidencia del SaaS y tarifas; revisión/adopción de privacidad y otros textos legales; dominio/canonicals/sitemap/indexación autorizados. No hay páginas individuales de módulos con disponibilidad acreditada ni backend de leads.

## Siguiente paso exacto

1. Publicación de c1b0baf expresamente autorizada; integración por fast-forward y push a feat/brand-foundation con registro documental. Consultar SHA final con git log -1 y git ls-remote de ambas ramas.
2. Comprobar Build de Cloudflare del SHA final: Ready y /version.json con el mismo commit y sourceModified false. af35674 es la copia anterior confirmada; el nuevo push no acredita por sí solo finalización del despliegue.
3. Revisar texto 200% en móvil: portada, contacto, demo, catálogo y admin. Pruebas locales y evidencia de 12 combinaciones en QA.md/qa/reflow-review.json. Dispositivos reales/lector de pantalla siguen pendientes.
4. Continuar en feat/feature-catalog sincronizada y revisar CI. No se creó PR, existentes sin verificar por API. Nuevas publicaciones requieren autorización correspondiente; mantener DNS/noindex y pendientes comerciales/legales.

Agente usado: Codex principal, sin subagentes. Identidad obligatoria: Joel Alejandro Yañez Caballero, joel.yc23@gmail.com. No reescribir commits publicados ni desplegar/cambiar DNS sin autorización. Las autorizaciones previas son entregas concretas.

## Confirmación de versión pública · 4 de noviembre de 2026

El propietario pegó el JSON de /version.json: af3567400d596d0f9e386de1cee47e5297985187, fecha 2026-11-04T21:47:13+00:00, sourceModified false. Coincide con la referencia remota de feat/brand-foundation y fecha de commit en Git. Validación documental/schema/SHA/fecha y diff; sin repetir pruebas de aplicación ni nuevo despliegue. No equivale a auditoría de todas las rutas ni CI remoto aprobado. Solo Codex principal; sin PR creada, existentes sin verificar por API.

## 4 de noviembre de 2026 · Publicación de corrección de reflujo autorizada

El propietario respondió «Sí, autorizo» a integrar c1b0baf en feat/brand-foundation para publicar la corrección de texto ampliado. Fetch confirmó origen c1b0baf y destino af35674 sin cambios concurrentes; destino antecesor. Se agrega solo este registro documental, se integra por fast-forward y se envía mediante push normal, preservando historial. Consultar git log -1 y referencias remotas para SHA final.

Código aprobado sin nuevas modificaciones: check 45 archivos/build 20 páginas; test:ci 20 rutas/69 destinos y axe 44 comprobaciones; reflujo 200% en seis rutas a 390/1280 y pruebas de foco/teclado; Lighthouse local 100 en las tres rutas medidas. Antes del push se recompila con dry-run y se verifica versión contra el nuevo commit y sourceModified false. No se repite la suite por el registro documental.

Última copia pública confirmada por el propietario antes de esta entrega: af35674. El nuevo build/versión activa queda pendiente de comprobar; no se afirma éxito por el push. API/hostname del entorno siguen restringidos. Sin DNS/noindex/bindings nuevos; autor Joel Alejandro Yañez Caballero. Solo Codex principal, sin subagentes. Sin PR creada; existentes sin verificar.

Siguiente paso: comprobar Cloudflare Build/SHA final, Ready y /version.json; comparar commit y sourceModified false. Revisar texto 200% en móvil en contacto/demo/catálogo/admin y portada. Continuar desarrollo en feat/feature-catalog sincronizada; esta aprobación no autoriza otras publicaciones. Pendientes reales: dispositivos/lector, CI remoto actual y evidencia comercial/legal.
