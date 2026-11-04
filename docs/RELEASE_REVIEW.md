# Revisión de integración · 4 de noviembre de 2026

Estado: preparada; pendiente de autorización explícita para actualizar el Worker.

## Versión concreta

- Aplicación revisada: cfad1a769d95026fed2d582f3f1066f2ca4ef402.
- Origen: feat/feature-catalog. El commit posterior de esta revisión solo añade documentación; consultar git log -1 para el SHA de entrega.
- Destino: feat/brand-foundation, observado en 9a017af54e5f24367f6261b97c2004435bf2c0fc.
- Worker: https://sistematicando-web.manaturaloso.workers.dev.
- Fetch sin novedades concurrentes; destino antecesor del candidato. Merge-tree sin conflictos. No se ha movido la rama seguida por Cloudflare.

## Qué cambiaría en la web

| Área | Entrega |
| --- | --- |
| Contacto | Nueva /contacto/, WhatsApp comercial y correo/WhatsApp de privacidad; enlace en pie y editor CMS. |
| Administración | Textos dinámicos del buscador y documento/avisos de demo editables; 24 editores y accesos directos en /admin. |
| Marca | Derivados PNG de presentación con srcset, originales intactos; reducción de transferencia medida en DPR1/2. |
| Estabilidad | Menú móvil inicializado antes del render y precarga de fuentes locales; CLS 0 en la última medición de las tres rutas de laboratorio. |
| Accesibilidad | Texto FAQ opaco durante toda la animación; prueba de contraste en estado intermedio. |
| Calidad | Actions comprueba sitio, navegación, marca, textos editoriales y axe; informes de marca/accesibilidad en artefactos. |

20 páginas terminadas en desarrollo: home, contacto, admin, catálogo, precios, guía de demo, privacidad en revisión, índice de soluciones y seis sectores, recursos y tres guías, FAQ y 404.

## Evidencia

- cfad1a7: check 42 archivos sin errores/advertencias; content:check con 14 módulos, tres guías y 24 editores.
- Suite local: 20 rutas/68 destinos, navegación con/sin JS/teclado/200%, marca en seis anchos DPR1/2 y contactos/editorial/descarga TXT; axe 44 comprobaciones sin infracciones detectadas. Incomplete se conserva; no es certificación WCAG.
- En esta revisión: worker:check aprobado. Reconstruyó 20 páginas, leyó 59 archivos de assets y terminó con --dry-run: exiting now. No subió archivos.
- Configuración wrangler.jsonc idéntica a la publicada. No bindings, secretos, DNS ni indexación nuevos.
- Actions verde de 296dc05 confirmado por el propietario. Consulta del candidato cfad1a7 bloqueada con Forbidden; no se afirma verde remoto actual.
- Solo Codex principal, sin subagentes. Autor de la documentación: Joel Alejandro Yañez Caballero. Sin PR creada; existentes no verificables con la API disponible.

## Límites pendientes

Se mantiene noindex/robots. Privacidad requiere revisión/adopción de prácticas reales; módulos del SaaS sin evidencia operativa y tarifas sin aprobar. Sin backend de leads ni reserva automática de demo. Faltan dispositivos reales/lector de pantalla y revisión manual exhaustiva. No se cambia la titularidad histórica de los commits.

## Siguiente paso exacto

1. Obtener autorización de integración de esta entrega en feat/brand-foundation; el push puede activar Workers Builds y actualizar la URL pública.
2. Con autorización, fetch de ambas ramas y revisar cualquier cambio concurrente. Si las puntas siguen como aquí, integrar por fast-forward sin reescribir historial y verificar ambas referencias remotas. Conservar la rama del CMS en feat/feature-catalog y sincronizar documentación.
3. Comprobar Cloudflare Deployments/Build: SHA de integración, estado Ready y versión activa. Un ID de versión de Cloudflare no es el SHA Git.
4. Recorrer /, /contacto/, /admin/, /funcionalidades/, /solicitar-demo/, /legal/privacidad/ y una ruta inexistente. Comprobar logo, canales, menú y 404; no enviar mensajes reales durante pruebas.
5. Si falla el build, leer el error antes de reintentar; no forzar ramas ni modificar DNS. Documentar resultado observado. La aprobación no autoriza otros despliegues futuros ni retirar noindex.
