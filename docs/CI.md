# Validación automática de ediciones del CMS

## Implementado

Workflow `.github/workflows/quality.yml`, nombre **Site and CMS quality**.

- Push a feat/feature-catalog: comprueba los commits, incluidos los que guarde Pages CMS en esa rama.
- Pull requests: ejecuta la misma validación.
- workflow_dispatch declarado; la disponibilidad del botón manual depende de que GitHub reconozca el workflow en la rama predeterminada.
- Permisos contents:read, sin secretos, tokens de Cloudflare, publicación, merges ni commits automáticos.
- Tiempo máximo 20 minutos; nuevas ejecuciones sustituyen las anteriores del mismo ref.

## Pasos

1. Checkout sin conservar credenciales.
2. Eliminar informes de ejecuciones anteriores para no adjuntarlos como si fueran evidencia actual.
3. Node de .nvmrc y npm ci --include=dev desde el lockfile.
4. Astro check y Worker dry-run; este último incluye el build y content:check.
5. Instalación del Chromium de Playwright en el runner.
6. npm run test:ci: todas las rutas/enlaces, navegación y auditoría axe.
7. Guardar dist y los informes de esta ejecución como artefacto con retención de siete días. Descargar un artefacto no publica una web. Un artefacto de un job fallido no significa que el build esté aprobado.

Las acciones oficiales checkout/setup-node/upload-artifact usan v7 según sus README públicos consultados durante la implementación. No se usan pull_request_target ni tareas de despliegue.

## Pruebas

- verify-site.mjs recorre las rutas compiladas de forma dinámica: títulos únicos, H1, descripción, noindex, IDs, overflow móvil, imágenes y destinos internos/anclas. No visita servicios externos ni inicia sesiones.
- verify-navigation.mjs comprueba menú sin JS, foco, Escape y texto al 200%.
- audit-accessibility.mjs cubre 19 páginas a dos anchos y tres estados interactivos actualmente. Los resultados incomplete se conservan y necesitan revisión aparte.
- CHROMIUM_PATH selecciona un navegador explícito. En Actions, test:ci utiliza el browser descargado por Playwright; en la validación local se usó /usr/bin/chromium.

Para repetir localmente, con dist construido:

```sh
CHROMIUM_PATH=/usr/bin/chromium npm run test:ci
```

El wrapper borra y regenera site-report.json/accessibility-report.json. Revisar su diff antes de guardar. No tocar esos archivos durante otra auditoría. Lighthouse no corre en cada edición: sus resultados históricos son de laboratorio y la variabilidad no se usa como puerta artificial de aprobación.

## Estado comprobado y pendiente

Instalación limpia, check, dry-run y suite equivalente **aprobados localmente**. YAML parseado y estructura/acciones/permisos comprobados; no se ha confirmado todavía una ejecución exitosa del workflow alojado. GitHub puede requerir que el propietario habilite Actions o apruebe una ejecución de un colaborador.

Después de guardar el workflow, revisar **Actions → Site and CMS quality** y comprobar el SHA concreto y el resultado. La API GitHub no está disponible para consultar esos resultados desde esta sesión. No dar por aprobado un job solo porque existe el archivo.

Guardado real de CMS y subida/selección de logos confirmados por commits 1206881–55f79ee. Pruebas locales aprobadas; Actions alojado sigue sin verificar. No se hizo push a la rama del Worker; el propietario añadió allí .pages.yml vacío en ed7227d.

## 2026-11-04 · Fallo de Actions en FAQ abiertas: contraste transitorio

Evidencia remota aportada por el propietario: workflow Site and CMS quality #9, commit dd113be, falló en Check pages, navigation and accessibility. Resumen 41 comprobaciones y una infracción en expanded-menu-and-faq; no se recibió el detalle de regla del artefacto. La captura confirma fallo alojado, no fallo del despliegue Cloudflare.

Reproducción local: la animación appear aplicaba opacity 0→1 a los párrafos de details. Detenida al 25% mediante Web Animations, axe detecta color-contrast en cinco respuestas FAQ (1.9:1 frente al mínimo 4.5:1); al terminar la animación el mismo estado pasa. Es una causa reproducida compatible con el fallo dependiente del momento de medición; no se atribuye una regla al log remoto que no la muestra.

Corrección: retirar solo la interpolación de opacidad y conservar el desplazamiento suave de 3px y prefers-reduced-motion. Texto siempre opaco; sin desactivar color-contrast, exclusiones ni esperas para esconder el problema. Control negativo: reintroducir CSS anterior solo en página de prueba vuelve a detectar la infracción; CSS corregido pasa con las mismas cinco animaciones pausadas.

Auditoría ampliada a 42 estados/rutas con expanded-faq-animation-quarter en no-preference; conserva estado abierto normal y resto de pruebas. Logs ahora imprimen regla, selector, ayuda y causa, además del informe JSON del artefacto. Build 19 páginas/content:check y prueba de reproducción aprobados; resultado final de test:ci registrado al completar esta entrega. No repetir Lighthouse: no se cambia geometría ni carga de recursos.

Agente: Codex principal, sin subagentes. Identidad Git: Joel Alejandro Yañez Caballero. Solo rama feat/feature-catalog; sin despliegue ni push a feat/brand-foundation (publicado 9a017af). Siguiente paso exacto: revisar nueva ejecución de Actions del commit de esta entrega; debe mostrar 42 comprobaciones y cero infracciones. Si falla, abrir validate y copiar AXE + selector + causa o descargar accessibility-report.json del artefacto. API GitHub del entorno sigue sin acceso; no afirmar CI alojado verde hasta observarlo. Sin PR creada; PR existentes sin verificar.

Resultado final local: test:ci aprobado (19 páginas, 66 destinos, navegación sin JS/teclado/200% y menú con scripts externos bloqueados); axe 42 comprobaciones, cero infracciones. Informe accessibility-report.json regenerado. Incomplete conservados, no equivalen a aprobación WCAG completa.
