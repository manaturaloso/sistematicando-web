# Progreso y continuidad

Estado consolidado: 4 de noviembre de 2026 (America/Lima). Este archivo sustituye como resumen activo a [PROGRESS_HISTORY.md](PROGRESS_HISTORY.md), que conserva íntegro el registro anterior.

## Git y estado externo

- Repositorio manaturaloso/sistematicando-web. Desarrollo/CMS feat/feature-catalog; rama seguida por Worker feat/brand-foundation.
- Base Git de esta entrega: c62fcb8 en desarrollo. Rama Worker preservada en 557222e, última integración anterior autorizada. Ahora el propietario confirma producto parcial y pide web de lanzamiento completa, sin nuevas publicaciones hasta preparación al 100% y autorización final.
- Nuevos cambios de esta entrega solo en desarrollo. Consultar git log -1 para SHA final. Fetch sin novedades concurrentes; push/ref se verifican al entregar.
- Worker de revisión existente: https://sistematicando-web.manaturaloso.workers.dev. Última identidad pública aportada por usuario: af35674; el envío posterior 557222e no se ha confirmado desde el entorno. Esta entrega no actualiza el Worker.
- API GitHub y hostname estuvieron bloqueados por Forbidden/CONNECT 403. Verde remoto de 296dc05 confirmado por el propietario; no inferir verde para los nuevos SHA. No se crearon PR; existentes sin verificar.

## Implementado

Astro 7.4.5, TypeScript 6.0.3, Node 24.22.1 y Wrangler 4.157.0 fijados. Sitio estático; no hay integración SaaS ni receptor propio de solicitudes.

40 páginas HTML en desarrollo: 14 páginas individuales de módulos más home, 404, contacto, admin, catálogo, precios informativos, guía de demo, privacidad en revisión, índice de soluciones y seis sectores, recursos y tres guías, FAQ, Nosotros, Ayuda e índice de Blog con tres artículos. Inventario en [SITEMAP.md](SITEMAP.md).

- Catálogo de 14 módulos, cinco áreas y páginas individuales con beneficios/recorrido/ámbito de lanzamiento, todo editable. Búsqueda, recuentos y estado vacío; sin JS se conserva el catálogo. La matriz interna conserva evidencia/estados reales, sin convertir el copy objetivo en validación del SaaS.
- Guía local: tres selecciones, validación, resumen, descarga TXT, reset e invalidación al cambiar opciones. Generar/descargar no envía datos ni reserva una demo.
- WhatsApp comercial autorizado y canales separados de privacidad en contacto/demo. Datos confirmados en `content/contact.json`; política aún para revisión/adopción.
- Pages CMS conectado a GitHub, con guardados reales comprobados (commits `1206881`–`55f79ee`). `/admin/` abre el servicio externo autenticado; 30 editores, medios y contenido `content/*.json`. No es un constructor visual arbitrario.
- Textos dinámicos del buscador y del documento/avisos de demo editables. Recuentos requieren exactamente un `{count}`; validación antes del build.
- Logos originales en `public/media`, hashes conservados. Astro genera PNGs de presentación de 256/512/768 px con srcset; favicon/SVG directos. Fuentes locales Gluten/Manrope y licencias.
- Menú progresivo con teclado/Escape, texto ampliado y navegación sin JS; inicialización temprana y precarga de fuentes. FAQ sin pérdida transitoria de contraste por opacidad.
- `/version.json` y panel de versión en `/admin/`: commit, fecha del commit y cambios locales de fuente. Build estático; sin Git devuelve null. Worker aplica no-store/noindex al JSON. No es un indicador de éxito del despliegue.
- Workflow `Site and CMS quality`: check, dry-run, sitio, navegación, marca, editorial/descarga, versión y axe; artefactos de QA. No despliega.

## Pruebas y evidencia

Resultados finales de la entrega de lanzamiento:

| Comprobación | Resultado observado |
| --- | --- |
| Check/build/content | Sin errores; 40 páginas HTML más JSON de versión, 30 editores. |
| Sitio | 40 rutas y 146 destinos internos. |
| Navegación | Sin JS, teclado/Escape, salto al contenido, texto 200% en 26 rutas a 390/1280 px y scripts externos bloqueados. |
| Marca | Seis anchos a DPR1/2, originales por hash, variantes y transferencia responsive. |
| Editorial/contacto | Canales JS/no-JS sin mensajes reales; copia CMS, descarga TXT e invalidación. |
| Versión | Git limpio/modificado/ausente; JSON/admin coincidentes; Worker no-store/noindex. |
| Axe | 84 comprobaciones, cero infracciones detectadas. Incomplete conservados; no certificación WCAG. |
| Worker local | 51 comprobaciones de rutas más JSON/cabeceras, assets, query, POST 405 y navegador. |
| Etiquetas personalizadas (entrega anterior) | Menú, buscador, campos, botones y opciones editados temporalmente; pruebas aprobadas; fuentes y build restaurados. |

Informes en `docs/qa`. Lighthouse histórico de tres rutas llegó a rendimiento/accesibilidad/buenas prácticas 100 y CLS 0; SEO 66 por noindex. No son métricas de producción ni una auditoría de todas las páginas.

Esta entrega: Nosotros, centro de Ayuda, índice de Blog y tres artículos originales, con rutas relacionadas, tabla de contenidos y FAQ nativa; ampliación de menús/pie y acceso CMS. Se conservan las 14 páginas de módulos y el copy de lanzamiento en home/sectores/FAQ/precios. Vista previa global (launchDraft true), 30 editores y matriz real intacta. Check/build, sitio/navegación/marca/editorial/módulos/versión, nuevos recorridos editoriales, auditoría axe aislada, Worker local y paquete verificados. Lighthouse conserva evidencia histórica y no se repitió en esta entrega. No se publica.

## Fases y pendientes

El plan original numera 0–10: inicialización y base visual completadas; home/soluciones/catálogo/contacto/precios informativos/recursos/CMS implementados. Cierre de QA y verificación del Worker en curso (fases 8–9). Lanzamiento oficial (10) pendiente.

Pendientes reales: CI de los SHA actuales; revisión manual con dispositivos/lector de pantalla; evidencia del SaaS y tarifas; revisión/adopción de privacidad y otros textos legales; dominio/canonicals/sitemap/indexación autorizados. Las páginas de módulos están preparadas como objetivo comercial; su disponibilidad operativa sigue por acreditar. No hay backend propio de leads.

## Siguiente paso exacto

1. Revisar Actions del SHA final y el copy de /nosotros/, /ayuda/ y /blog/ con sus tres artículos. CMS: Blog: artículos editoriales; páginas nosotros-index, ayuda-index, blog-index y blog-article.
2. Completar el recorrido comercial: revisar /precios/ y /solicitar-demo/ para explicar evaluación, alcance e implementación sin prometer condiciones no aprobadas. Empresa, Ayuda y Blog ya están implementados. Preparar la web objetivo completa; no bloquear frontend pidiendo otra vez verificar el producto parcial ya confirmado. No inventar tarifas, certificaciones ni condiciones.
3. Mantener launchDraft/noindex; no publicar, integrar ni pedir despliegue ahora. El propietario confirmará cuando producto y web estén al 100% y autorizará lanzamiento. Rama Worker sigue 557222e.
4. Antes del lanzamiento: confirmar evidencias operativas, precios/condiciones, legal/privacidad, dominio/indexación y pruebas con dispositivos/lector. Fuente actual de implementación/evidencias internas en FEATURE_STATUS.md.
5. Continuidad HANDOFF.md y AGENTS.md. Autor Joel Alejandro Yañez Caballero; Codex principal, sin subagentes. No se creó PR, existentes sin verificar por API.

Agente usado: Codex principal, sin subagentes. Identidad obligatoria: Joel Alejandro Yañez Caballero, joel.yc23@gmail.com. No reescribir commits publicados ni desplegar/cambiar DNS sin autorización. Las autorizaciones previas son entregas concretas.

## Confirmación de versión pública · 4 de noviembre de 2026

El propietario pegó el JSON de /version.json: af3567400d596d0f9e386de1cee47e5297985187, fecha 2026-11-04T21:47:13+00:00, sourceModified false. Coincide con la referencia remota de feat/brand-foundation y fecha de commit en Git. Validación documental/schema/SHA/fecha y diff; sin repetir pruebas de aplicación ni nuevo despliegue. No equivale a auditoría de todas las rutas ni CI remoto aprobado. Solo Codex principal; sin PR creada, existentes sin verificar por API.

## 4 de noviembre de 2026 · Publicación de corrección de reflujo autorizada

El propietario respondió «Sí, autorizo» a integrar c1b0baf en feat/brand-foundation para publicar la corrección de texto ampliado. Fetch confirmó origen c1b0baf y destino af35674 sin cambios concurrentes; destino antecesor. Se agrega solo este registro documental, se integra por fast-forward y se envía mediante push normal, preservando historial. Consultar git log -1 y referencias remotas para SHA final.

Código aprobado sin nuevas modificaciones: check 45 archivos/build 20 páginas; test:ci 26 rutas/69 destinos y axe 44 comprobaciones; reflujo 200% en seis rutas a 390/1280 y pruebas de foco/teclado; Lighthouse local 100 en las tres rutas medidas. Antes del push se recompila con dry-run y se verifica versión contra el nuevo commit y sourceModified false. No se repite la suite por el registro documental.

Última copia pública confirmada por el propietario antes de esta entrega: af35674. El nuevo build/versión activa queda pendiente de comprobar; no se afirma éxito por el push. API/hostname del entorno siguen restringidos. Sin DNS/noindex/bindings nuevos; autor Joel Alejandro Yañez Caballero. Solo Codex principal, sin subagentes. Sin PR creada; existentes sin verificar.

Siguiente paso: comprobar Cloudflare Build/SHA final, Ready y /version.json; comparar commit y sourceModified false. Revisar texto 200% en móvil en contacto/demo/catálogo/admin y portada. Continuar desarrollo en feat/feature-catalog sincronizada; esta aprobación no autoriza otras publicaciones. Pendientes reales: dispositivos/lector, CI remoto actual y evidencia comercial/legal.

Vista previa de lanzamiento preparada según la directiva del propietario; 14 páginas nuevas, pruebas de contenido de módulos y política de no publicación documentadas el 4 de noviembre de 2026 (America/Lima).

## Incidencias de verificación de esta entrega

La primera ejecución test:ci se detuvo porque Playwright no tenía navegador descargado; se usó CHROMIUM_PATH=/usr/bin/chromium, navegador ya instalado. La ejecución siguiente pasó sitio/navegación/marca/editorial/módulos/recursos/versión; su auditoría axe coincidió con el rebuild automático al arrancar worker:dev y analizó una respuesta de error transitoria en punto-de-venta. Se detuvo Worker y se repitió axe aisladamente sobre dist estable. El auditor ahora exige HTTP 200 para no tratar páginas de error como resultados de accesibilidad del producto. No se debilitaron reglas ni se excluyó ninguna ruta. Informes finales en docs/qa; no se infiere CI remoto verde.
