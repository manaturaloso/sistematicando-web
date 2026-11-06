# Administración con GitHub y Pages CMS

## Actualización vigente: planes propuestos (5/11/2026)

El propietario delegó elegir precios y funciones. Implementada la propuesta Esencial S/99, Gestión S/199 y Multisede S/399 al mes por cuenta, con puesta en marcha S/199, S/399 y S/699 respectivamente. [PRICING_STRATEGY.md](PRICING_STRATEGY.md) contiene módulos, límites, extras, criterios y condiciones pendientes. Sustituye referencias anteriores a no diseñar tarifas o esperar elección entre planes y propuesta personalizada. Sigue siendo borrador sin publicación y sin validar disponibilidad del SaaS. 42 páginas y 34 editores conservados. Fuente única content/pricing.json; editor de planes en /admin. CI añade verify-pricing.mjs y pricing-report.json, incluidos en artefactos.

Siguiente paso: revisar viabilidad económica/tributaria y condiciones de contratación de esta propuesta; incorporar evidencia real de CI y pruebas humanas cuando esté disponible. No pedir otra vez diseñar los planes ni publicar. Agente principal únicamente.

## Qué está implementado

- `/admin/`: panel de acceso y enlaces por sección. **La edición pública autenticada continúa en Pages CMS.** Desde el 6/11 existe además /admin/editor para edición visual en servidor local; no hay API de escritura anónima en el build estático. Ver VISUAL_EDITOR.md.
- `.pages.yml`: configuración de 34 editores, con biblioteca de imágenes. El archivo usa JSON, válido como YAML 1.2.
- Contenido en `content/*.json`, consumido por Astro: marca/SEO, menús, contactos, home, factores comerciales, soluciones, módulos, FAQ, guías y textos por página/componente.
- Los cambios guardados por el CMS son commits en la rama seleccionada. La web estática necesita un nuevo build desde esa rama para reflejarlos. Guardar no implica integrar ni publicar producción.

## Primera conexión del propietario

1. Abrir https://app.pagescms.org e iniciar sesión con una cuenta GitHub que tenga acceso al repositorio.
2. Instalar/autorizar la GitHub App de Pages CMS **solo para manaturaloso/sistematicando-web**, con los permisos que solicite el servicio. Revisarlos antes de aceptar; no proporcionar tokens por chat.
3. Seleccionar el repositorio y la rama **feat/feature-catalog**. El enlace de /admin ya apunta a esa rama (la barra del nombre se codifica en la URL).
4. Comprobar que aparecen Marca, Contactos, Menús, Soluciones, Módulos, FAQ, Guías y los editores por página.
5. Hacer una edición pequeña, guardar y comprobar el commit en GitHub. El propietario ya realizó esta conexión y escritura: commits 1206881, a3803b7, 222f48b y 55f79ee verificados en Git.

Acceso directo al repositorio/branch en el CMS: https://app.pagescms.org/manaturaloso/sistematicando-web/feat%2Ffeature-catalog

No se ha instalado una instancia propia del CMS ni creado contraseñas, bases de datos o credenciales de aplicación en esta web.

## Incorporar los logos originales

1. Abrir **Logos e imágenes** y subir los archivos originales (PNG, JPG, WebP o SVG). Se guardarán bajo public/media; usar nombres simples como logo-horizontal-claro.png.
2. Abrir **Marca, logos y SEO global**. Seleccionar el logo para fondo claro y el logo para fondo oscuro si se dispone de él.
3. Configurar texto alternativo y dimensiones originales. La web mantiene proporciones y no recorta ni redibuja el archivo.
4. El logo claro se usa en cabecera y pie claro. Si se activa el pie oscuro, el pie usa el logo para fondo oscuro. También hay selector de favicon.
5. Guardar, revisar el diff y ejecutar un build. Sin un logo seleccionado, se muestra el nombre con aviso explícito de que el original está por incorporar.

Originales actuales: public/media/logofullclear.png, logofulldark.png y logominiclear.png. Horizontales 7958 × 2005; favicon 1325 × 1325. Selección guardada por el propietario en site.json, sin reconstrucciones. Integridad y render comprobados en seis anchos; ver qa/brand-report.json.

## Qué puede cambiarse sin tocar Astro

- Marca, logos, favicon, colores y SEO global.
- Orden/texto/destino de menús internos.
- Responsable, domicilio, correo, teléfono, mensaje inicial de WhatsApp y fecha de privacidad.
- Textos estáticos y metadatos por página; los campos tienen como etiqueta el texto actual inicial para reconocerlos.
- Sectores, módulos y sus estados/evidencias, respuestas FAQ y guías con secciones/listas. Se pueden añadir elementos a las listas; las plantillas generan nuevas rutas de soluciones y guías.
- Factores de precios y sectores de home. No hay tarifa oficial ni editor de planes contractuales aprobados.

Los cambios de diseño estructural, nuevas integraciones, tipos de contenido o comportamiento requieren desarrollo. No se ofrece un constructor visual arbitrario de bloques. Las opciones de módulos siguen exigiendo evidencia; no llamar «disponible» a una propuesta.

## Publicación y permisos

La rama del Worker sigue siendo feat/brand-foundation según lo informado por el usuario. La integración de ec19bb7 fue autorizada explícitamente en esta entrega. Las futuras integraciones o cambios de rama requieren autorización: Cloudflare puede desplegar al recibir commits en su rama configurada.

Los permisos de edición los controla GitHub/Pages CMS. /admin es una página pública de acceso sin datos secretos ni funciones locales de escritura. Noindex no es una protección de acceso; la protección de edición está en la autenticación y permisos del servicio.

## Mantenimiento y validación

- `npm run content:check`: referencias, campos del editor, contactos, rutas e imágenes. Se ejecuta antes de cada build.
- `npm run cms:config`: regenera .pages.yml desde la estructura de contenido. Úsese al desarrollar cambios de esquema, no después de cada edición editorial; sobrescribe el archivo completo generado.
- `npm run docs:features`: regenera FEATURE_STATUS.md desde el registro de módulos.
- `npm run check` y `npm run build` con ASTRO_TELEMETRY_DISABLED=1 según README.
- `python3 scripts/verify-cms.py`: modifica contenido/imagen de prueba, verifica su renderizado y restaura los originales con rebuild en finally. No ejecutarlo mientras alguien edita los mismos archivos. Usa /tmp para capturas y nunca conserva la imagen de prueba.
- Revisar branch y diff antes de guardar. Cambiar IDs/slugs requiere revisar enlaces y referencias; no renombrarlos a ciegas.

El guardado real por el propietario está confirmado por commits de Pages CMS. El agente no inició sesión en su cuenta; el flujo autenticado no se sustituye por pruebas locales.

## Comprobación automática tras guardar

El workflow Site and CMS quality valida los pushes a feat/feature-catalog y las PR; no publica. Revisar resultado en Actions antes de integrar. Si hay errores de enlaces, contenido o accesibilidad, corregirlos y guardar otro commit. El artefacto con dist no es un preview desplegado. Estado y reproducción en CI.md. La primera ejecución en GitHub aún debe confirmarse.

El usuario confirmó la conexión y los commits reales la corroboran. La integración a la rama seguida por Cloudflare requiere autorización aparte.

## Entrega de imágenes en el sitio

El CMS conserva los originales en public/media. Brand.astro genera PNGs de presentación (256/512/768 px) al compilar y sirve srcset/sizes para reducir descarga según pantalla; nunca reemplaza el archivo fuente. SVG conserva ruta directa y favicon no cambia. Con un nuevo raster o selección de variante oscura, el siguiente build actualiza los derivados automáticamente. Se usa la proporción real del raster importado; los campos de dimensiones siguen aplicándose al fallback directo. No editar ni subir derivados /_astro al CMS: son salida de build.

Prueba actual: npm run test:brand con las selecciones PNG oficiales actuales; hashes originales, seis anchos y DPR1/2. Resumen qa/brand-report.json.

El flujo de calidad también comprueba automáticamente la marca configurada después de guardar en feat/feature-catalog. En Actions → artefacto site-quality-<SHA>, brand-report.json registra hashes originales y entrega por ancho/DPR; los informes de ejecuciones previas se eliminan antes de validar. Usar el informe del commit actual. El flujo no publica.

## Buscador y documento de demo

En **Página: funcionalidades → Buscador y resultados** puedes editar ejemplo y mensajes inicial/singular/plural; conserva exactamente un `{count}` en cada recuento. El build sustituye ese marcador por resultados reales. La validación bloquea una plantilla incorrecta.

En **Página: solicitar-demo → Documento y mensajes de la guía local** puedes editar título, etiquetas, preguntas, aviso final y avisos de generación/descarga. Son texto plano; no se interpreta HTML. Mantén los avisos de generación local: no hay receptor de solicitudes ni reserva de demo. La opción «Otra operación» se edita en los textos de esa misma página y su valor se refleja en la guía.

La nueva prueba editorial se ejecuta dentro de test:ci y comprueba también el TXT descargado. No necesitas regenerar .pages.yml al cambiar estos valores; solo cuando se desarrolla un esquema nuevo. Guardar en el CMS crea un commit en feat/feature-catalog; no publica por sí solo en el Worker actual.

Página: contacto permite cambiar los textos de /contacto/. Los datos del responsable y canales se editan en Contactos y responsable; los del bloque comercial compartido con demo en Componente: WhatsAppContact. /admin incluye acceso directo al nuevo editor y a los textos de catálogo/demo. Son 34 editores actualmente.

## Identificar qué versión estás viendo

/admin incluye una sección de versión de solo lectura y enlace a /version.json. Compara el commit con el SHA de Build en Cloudflare; el ID de versión de Cloudflare es otro identificador. Si aparecen cambios locales, el SHA es la base de esa compilación. Si no hubo Git al compilar, se indica desconocido. La fecha es la del commit, no la de publicación.

El JSON se genera durante build y contiene únicamente schemaVersion, commit, commitDate y sourceModified. No se edita en CMS. Cambiar HEAD exige recompilar para actualizarlo. No demuestra por sí solo si Cloudflare terminó el último despliegue; describe la copia servida. Esta mejora requiere integración/publicación autorizada para aparecer en la URL pública.

## Módulos de la web de lanzamiento

Funcionalidades → módulo → Contenido comercial para lanzamiento edita propuesta, resumen, beneficios, pasos y ámbito de cada una de las 14 páginas. La ruta usa el ID del módulo; cambiarlo puede romper enlaces. Página: feature-detail edita etiquetas/CTA comunes. El contenido y las rutas se generan al compilar; no hay que crear una página de Astro por módulo.

Marca, logos y SEO global incluye launchDraft y su etiqueta/aviso de vista previa. Mantener activo durante preparación. Este interruptor no valida el software, no retira noindex ni autoriza publicación. Estado/evidencia del módulo son campos internos independientes: escribir copy de lanzamiento no los convierte en disponibles. La nueva directiva del propietario es no publicar hasta producto/web al 100% y aprobación final.

## Empresa, ayuda y blog

Cinco editores nuevos, 30 en total: Blog: artículos editoriales y textos de páginas nosotros-index, ayuda-index, blog-index y blog-article. Artículos: título, categoría, introducción, secciones con párrafos/puntos clave, conclusión, moduleId y guideSlugs. Añadir un artículo genera una ruta `/blog/<slug>/` al compilar. No cambiar slugs existentes sin revisar enlaces y redirecciones.

Ayuda permite editar tarjetas (título/texto/href) y seleccionar FAQ por identificador. Nosotros incluye principios editables. Los enlaces de módulos, guías y FAQ deben existir; content:check bloquea referencias inválidas. No introducir autores/fechas, disponibilidad de soporte ni promesas operativas sin confirmación. Estos cambios se guardan en desarrollo; no publicar hasta autorización final.

## Implementación y contacto editable

Dos editores nuevos: Implementación: recorrido y preparación (`implementation`) y Página: implementacion-index. Etapas con título/resumen/texto/acuerdo; preparación con título/texto; responsabilidades con título/lista. Los enlaces desde precios se generan por posición (paso-1, paso-2…); revisar al reordenar. No introducir servicios, fechas o SLA como aprobados sin confirmación del propietario.

El párrafo de WhatsApp es ahora components-WhatsAppContact.text_007. Debe contener exactamente un `{phone}`; se sustituye por contact.phoneLabel. El validador bloquea marcadores ausentes, repetidos o desconocidos. Se mantiene la separación entre contactos centralizados y copy por página.

## Privacidad y términos (borradores)

Legal: términos de uso del sitio (`terms`) permite editar secciones con id, título y párrafos; Página: legal-terminos contiene cabecera/contacto/SEO. Página: legal-privacidad contiene copy de privacidad y administración externa. Los ids generan anclas: usar minúsculas y guiones, no duplicar ni usar ids reservados (contenido, responsable, contacto-legal, contacto-title, o terminados en -title).

Textos de responsable: privacidad text_039 y términos text_007 requieren exactamente un {responsible}, un {ruc} y un {address}, sin otros marcadores. Valores desde Contactos y responsable; nunca pegar HTML. Cambiar contenidos no acredita revisión/adopción legal. Política aún borrador; contrato SaaS y condiciones comerciales siguen pendientes.

## Metadatos y página no encontrada

Página: 404 incluye descripción SEO propia, etiqueta del grupo de enlaces y enlace de Ayuda. Los metadatos generales se editan por página; guías/artículos toman título/introducción del editor estructurado y se identifican técnicamente como OG article. No introducir títulos/descripciones vacíos o duplicados: test:site los detecta tras compilar. El checklist técnico es generado, no un documento editorial del CMS ni permiso de publicar.

El pie conserva los mismos enlaces CMS y los organiza en columnas según ancho/tamaño de texto; no hace falta recrear el menú. La revisión visual local no altera logos ni marca disponibilidad operativa de módulos.

## Textos comunes de guías

Página: recursos-guias-slug incluye text_014 (Guía práctica), text_015 (nombre accesible del índice) y text_016 (soluciones relacionadas). El módulo relacionado se selecciona por el identificador existente en Guías y recursos; la plantilla crea el enlace directo a su ficha y usa su nombre. Cambiar el identificador exige una referencia válida; no pegar enlaces manuales para reconstruir ese recorrido.

### Edición de planes

En «Planes, precios y complementos (propuesta)» editar cuotas, puesta en marcha, cupos, módulos, resúmenes y exclusiones. Mantener moneda PEN y draft activo. Importes positivos con hasta dos decimales y cupos enteros positivos. Ordenar planes de menor a mayor alcance: cada uno incluye módulos del anterior. Solo un destacado. Usar IDs de módulos/planes existentes; sede adicional permanece específica de Multisede. El primer mes se calcula automáticamente. La validación del build rechaza referencias e importes inválidos.

## Planes visibles en fichas de módulos (6/11/2026)

La sección de cada ficha se calcula desde «Planes, precios y complementos (propuesta)»: moduleIds determina inclusión y relación, planIds la aplicabilidad de extras. Cambiar la fuente actualiza precios y fichas juntas en el próximo build. Etiquetas comunes, explicación sin plan base y aviso en Página: feature-detail. No editar nombres/precios duplicados en páginas ni cambiar estados SaaS para modificar esta presentación. 34 editores, sin servicio nuevo.

## 6/11/2026 · Panel administrativo visual

Rediseñado /admin con logo original, navegación por tareas, resumen de inventario, tarjetas de marca/portada/planes desde datos reales y directorio buscable de los 34 editores con Editar/Ver página. Fuente del inventario .pages.yml vía src/data/admin.ts, sin eliminar editores. Móvil/escritorio, teclado, recuentos y vacío; sin JS todos los editores visibles. ADMIN_DESIGN.md explica alcance, reglas y límites.

Se conserva Pages CMS: editor de campos, medios, autenticación y guardado externos, rama feat/feature-catalog. No se ha cambiado el tema del editor externo ni implementado edición embebida/WYSIWYG. Muestras del último build, sin estado de guardado ficticio o actualización en vivo. Sin tokens, backend ni nuevos servicios. 42 páginas / 34 editores; precios y evidencia SaaS intactos.

Check final: 64 archivos sin errores/avisos/hints; build de 42 páginas. verify-admin aprobado con/sin JS, cinco anchos, enlaces de rama, búsqueda/reset/teclado y sin peticiones externas. Capturas 390/1440 revisadas. CI incorpora admin-report.json y la prueba; cierre aprobado: 42 rutas y 176 destinos internos; navegación/200%, marca, editorial, módulos, recursos, versión, legales, precios, panel y compatibilidad Chromium aprobados. Axe inicial detectó nombres no únicos de zonas laterales; corregidas sus etiquetas y repetidas las 88 comprobaciones completas: cero infracciones detectadas. Inventario y guardas de lanzamiento aprobados. Firefox/WebKit siguen no disponibles localmente y CI remota no confirmada. No se repitieron Lighthouse ni runtime Worker. No se guardaron cambios en el servicio externo ni se enviaron mensajes.

Agente: Codex principal sin subagentes; skill digital-design-excellence aplicada. No se publica. Próximo paso exacto: revisar el nuevo /admin y concretar si también se quiere reemplazar el editor externo; no confundir este panel con un reemplazo ya realizado. Continúan costos reales, validación operativa/legal, dispositivos/lectores, CI remoto y autorización de lanzamiento pendientes.

## 6/11/2026 · Edición visual funcional en desarrollo

Autorización expresa del propietario: seleccionar textos/imágenes en una vista previa y ver cambios inmediatamente. Implementado /admin/editor/ con iframe de páginas reales, selección vinculada a JSON, inspector, borrador inmediato, descarte, selección de logos existentes, guardado validado/hash/rollback y revisión explícita de commit/push a feat/feature-catalog. VISUAL_EDITOR.md contiene uso, arquitectura y límites. 43 páginas HTML, 34 editores CMS conservados; sin migrar contenido ni alterar evidencia SaaS.

La API existe solo en el servidor Astro de desarrollo y exige acceso local, Origin y CSRF; no se añade escritura al build estático ni al Worker. Commit bloquea rama distinta, archivos con cambios previos, conflictos e índice ajeno; no hay autocommit al escribir. Pages CMS mantiene edición estructurada y subida de medios. El editor visual alojado con OAuth público sigue pendiente; no presentarlo como servicio ya conectado.

Pruebas funcionales aprobadas: ocho grupos en proyecto/remoto Git bare temporales; UI real de selección/texto/imagen/descarte/guardado/recuperación/diálogo Git/vista móvil, con content/pages.json restaurado exactamente y sin commits/push de prueba al repositorio real. Check 70 archivos sin errores/avisos/hints; build 43 páginas. Cierre estático aprobado: 43 rutas/178 destinos internos, navegación y texto 200% en 32 rutas, marca/editorial/módulos/recursos/versión/legales/precios/admin y Chromium cinco escenarios. Axe inicial detectó zonas de nombres repetidos entre editor e iframe; etiquetas diferenciadas y auditoría completa repetida: 90 comprobaciones, cero infracciones detectadas. Inventario y guardas de lanzamiento aprobados, ocho bloqueos reales conservados (incluye CMS visual alojado). Ajuste posterior solo del inspector activo comprobado con UI real a 320/390/1440; fuente restaurada. Firefox/WebKit no ejecutados localmente. Seis pruebas del calculador económico también aprobadas. No se repitieron Lighthouse ni runtime Worker. CI incorpora ambos recorridos y artefactos; resultado remoto no confirmado.

Siguiente paso exacto: revisar el editor local y configurar una integración alojada con autenticación y permisos GitHub antes de usar escritura desde una URL pública. Los secretos se configuran fuera del chat. No publicar para probar. Agentes: Codex principal, sin subagentes; precios, estados reales y congelación de producción intactos. Sin PR nueva; existentes sin verificar.

## 6/11/2026 · Base de autenticación para edición alojada

Implementados workers/visual-auth.mjs y wrangler.editor-auth.jsonc separados del Worker público: flujo GitHub App, estado OAuth cifrado, sesión AES-GCM HttpOnly/Secure con duración máxima de una hora, comprobación de usuario manaturaloso y permiso push en el repositorio exacto, CSRF/logout y rechazo por defecto. Sin secretos/configuración devuelve 503. No hay endpoints de escritura ni integración todavía con el inspector alojado; contentWritesEnabled false. HOSTED_VISUAL_AUTH.md registra configuración y alcance.

Ocho grupos sintéticos de autenticación/criptografía/permisos aprobados. No hay login GitHub real, App registrada, credenciales configuradas o despliegue. CI incorpora prueba e informe visual-auth-report.json. Web estática, 43 páginas/34 editores, editor local y Pages CMS conservados. No se repite navegación/axe/Lighthouse por código servidor separado sin cambios frontend; la evidencia anterior conserva su identidad.

Siguiente paso exacto: elegir origen HTTPS, registrar/instalar GitHub App solo para sistematicando-web y configurar variables/secretos fuera del chat; revisar y autorizar despliegue de prueba por separado, probar login real y después conectar identidad con guardado remoto validado. El bloqueo visual-cms sigue abierto. Solo Codex principal, sin subagentes; sin publicación, DNS, PR nueva ni cambio en rama Worker. PR existentes y CI remoto sin verificar.
