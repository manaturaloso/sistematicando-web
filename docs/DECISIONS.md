# Decisiones

## 2026-11-03 · Base de marca y continuidad

- Se respetan los valores exactos de color enviados y se conservan los TTF originales.
- El brief recibido se guarda íntegro en PROJECT_BRIEF.md como referencia; no se ejecutan automáticamente sus instrucciones de agentes, investigación o publicación.
- Se limita esta entrega a identidad y documentación: el checkout carece de commits y archivos, y el acceso de red inicial estaba bloqueado por el sandbox. No se presenta una nueva aplicación como terminada ni se elige silenciosamente otro stack.
- Se mantiene Astro + TypeScript como preferencia pendiente de validar; la referencia HTML/CSS permite revisar la identidad sin paquetes de red.
- No se reconstruyen los logos a partir de imágenes del chat. Se necesitan originales accesibles para integrarlos fielmente.
- Se propone Gluten para titulares y Manrope para cuerpo. Ninguna fuente se usa para fabricar un reemplazo del logotipo.
- La referencia es interna y noindex. No se realiza despliegue ni se habilita indexación.
- No se crean funcionalidades comerciales ni formularios sin evidencia y receptor configurado.
- Solo participa el agente principal Codex. No hay agentes especializados configurados en AGENTS.md previo ni delegación solicitada en el mensaje directo.
- Rama de entrega: feat/brand-foundation. Se comprobó con éxito que el remoto no devolvía referencias HEAD/main. La API de PR devuelve Forbidden; no se fuerza ningún push.

- Diagnóstico corregido: los fallos de conexión iniciales ocurrían dentro del sandbox. La ejecución con permiso de red sí permite Git y descargar licencias oficiales con TLS verificado.

## 2026-11-03 · Home Astro

- Astro 7.4.5 compatible con Node 24.22.1; salida estática, TypeScript estricto y lockfile. CSS nativo evita añadir herramientas sin necesidad; Tailwind queda sin adoptar.
- Se conserva la rama de la primera entrega para dar continuidad. No se cambia main ni se fuerza historial.
- Página orientada a presentar la propuesta; textos distinguen áreas conceptuales de funciones disponibles. Mockup propio sin cifras de rendimiento ni datos comerciales ficticios, etiquetado como conceptual.
- La sección de demo explica cómo preparar una conversación y el estado real del canal. No existe botón de envío ni formulario ficticio.
- Nombre del proyecto en texto con etiqueta de desarrollo; no constituye logo alternativo. Los originales siguen pendientes.
- Estilos de home separados de la referencia de marca anterior para conservar su servidor independiente. En Astro las fuentes se resuelven en /fonts.
- Noindex y bloqueo de rastreo hasta aprobación. No se inventa hostname para canonicals, sitemap o metadatos absolutos.
- Desactivar telemetría de Astro con variable de comando resuelve el intento de escritura fuera del workspace, sin ampliar permisos de archivos.
- Se corrigió una forma decorativa rotada que provocaba desbordamiento a 320px. Iconos SVG propios evitan glifos ausentes o emojis dependientes del dispositivo.

## 2026-11-03 · Soluciones sectoriales

- Se implementan índice y seis sectores del brief usando datos tipados y una plantilla estática común; cada sector tiene necesidades, preguntas y límites propios.
- Header, Footer y home enlazan rutas reales. No se añaden páginas vacías, librerías ni formularios.
- Las páginas describen enfoques por evaluar, no capacidades contratables confirmadas. Hoteles declara explícitamente que no hay evidencia de PMS ni conectividad OTA; eventos no promete QR, pagos u operación offline.
- Cada página conserva noindex, metadatos propios, breadcrumbs y contexto sobre el canal comercial pendiente. No se crean precios, datos legales ni dominios ficticios.
- Se conserva feat/brand-foundation para continuidad; no se publica producción ni se fuerza historial. Solo trabaja Codex principal.

## 2026-11-04 · Paquete para revisión en Cloudflare

- El usuario autorizó una vista compartible en Cloudflare Pages. Se prepara un ZIP de dist, sin desplegar por falta de acceso a la cuenta.
- Se conserva noindex/robots. No se aprueba producción oficial, dominio personalizado, DNS ni indexación.
- Carga directa en proyecto exclusivo de revisión como alternativa manual; distinguir ese proyecto de un deployment Preview estricto y del sitio comercial oficial. No se inventa hostname.
- Solo agente principal. Script de empaquetado reproducible versionado; binario generado fuera del checkout.

## 2026-11-04 · Catálogo de funcionalidades

- Registro tipado de 14 módulos con cinco grupos. Estado predeterminado no verificada; conservar evidencia, dependencias y límites. FEATURE_STATUS.md se genera con npm run docs:features para evitar divergencias con la web.
- Búsqueda progresiva en cliente, sin servicio externo ni envío de datos: tildes, mayúsculas, varias palabras, contador aria-live, vacío y reset. Sin JS todo el catálogo permanece disponible.
- No se generan 14 páginas vacías ni se afirman integraciones SUNAT, pagos, PMS o seguridad operativa. Cada módulo incluye límites y soluciones relacionadas.
- Se conserva CSS/identidad, noindex y bloqueo de rastreo. Menú y pie enlazan catálogo; home incorpora acceso contextual.
- El usuario reportó despliegue en Worker conectado a feat/brand-foundation. Se abre feat/feature-catalog para guardar sin actualizar esa rama ni ejecutar un nuevo despliegue. Revisar automatización antes de integrar.
- No se usa cuenta Cloudflare, DNS ni repositorio SaaS. Solo Codex principal; no subagentes.

## 2026-11-04 · Precios y preparación de demo

- Página /precios/ sin importes, planes o condiciones ficticias: explica factores de alcance, qué confirmar y preguntas comerciales.
- /solicitar-demo/ contiene una herramienta explícitamente local, no un formulario de captación: tres selectores sin datos de contacto, validación nativa, resumen en textContent y descarga TXT con Blob. Sin API, almacenamiento persistente ni envíos. La vista sin JS conserva instrucciones útiles.
- Al cambiar una selección se invalida el resumen para evitar descargar un contexto desactualizado. Reset limpia resultado y devuelve foco. El resultado recibe foco al generarse.
- No se redactan términos legales ni consentimiento como si existiera recepción. Canal y privacidad se preguntaron al usuario; no se asumen ante ausencia de respuesta.
- CTA de navegación, home y soluciones enlazan páginas reales. Se actualizan pruebas de home para comprobar navegación a precios y volver a home antes de sus FAQ.
- Se conserva feat/feature-catalog y la rama del Worker sin modificar. Solo Codex principal, sin subagentes ni despliegue.

## 2026-11-04 · Borrador de privacidad solicitado

- El usuario autorizó redactar una política y señaló WhatsApp como canal. Se prepara documento completo interno con campos pendientes visibles; no se presume identidad jurídica a partir de cuentas del proyecto.
- El teléfono recibido no incluye código de país inequívoco. Se pide confirmación antes de construir wa.me para evitar dirigir consultas a un destinatario distinto.
- El borrador separa web, hosting técnico, guía local y contacto voluntario por WhatsApp. No afirma que el hosting carezca de logs ni autoriza marketing por contactar.
- Sin enlace externo activo, política pública definitiva o mensajes enviados hasta resolver datos esenciales. El borrador se guarda junto a la continuidad en GitHub.

- Respuesta aplicada: teléfono de Perú confirmado y responsable/RUC incorporados. No volver a pedirlos. Se pidió únicamente domicilio y canal de privacidad aún faltantes; no se activa recepción como si la política estuviera cerrada.

## 2026-11-04 · Contactos completos y enlace WhatsApp

- Se incorporan domicilio y correo aportados; usuario confirma WhatsApp también para derechos de privacidad. Datos centralizados en contact.ts para cambios posteriores.
- /legal/privacidad/ es versión para revisión, sin placeholders, conservando de forma explícita la revisión de prácticas operativas antes del lanzamiento; no es texto definitivo inventado ni certificación legal.
- WhatsApp solo se abre por acción del visitante, con mensaje genérico y aviso de tercero. La guía no se inserta en el enlace. No se llama a la API ni se envían mensajes desde herramientas o código.
- Se actualizan copys que decían canal pendiente y enlace de privacidad del pie. Correo y WhatsApp son alternativas para consultas, no automatizaciones.
- No se realizan cambios en Worker, DNS, producción o rama desplegada. Solo Codex principal.

## 2026-11-04 · CMS GitHub y acceso /admin

- El usuario aclaró que necesita administración completa y eligió CMS conectado a GitHub con interfaz en /admin. Se usa Pages CMS alojado para no implementar usuarios/contraseñas ni guardar tokens en frontend. /admin es panel de acceso; el editor autenticado se abre fuera del sitio, sin iframe ni simulación de login.
- 23 editores en .pages.yml (JSON válido como YAML), medios en public/media y merge por campo para que editores por página compartan pages.json sin eliminar otros apartados.
- Fuente editorial en content/*.json. Adaptadores TS mantienen las plantillas; copia y metadatos de páginas también son editables. Navegación y medios/configuración de marca son explícitos.
- El CMS no convierte el sitio en un constructor visual arbitrario. Diseño estructural, nuevas integraciones/tipos y lógica requieren desarrollo; el alcance de edición está explicado en ADMIN.md.
- Originales del logo no disponibles como archivos; se implementa selección/render preservando proporciones en lugar de reconstruir imágenes del chat. Campos vacíos hasta carga real. Favicon/pie oscuro opcionales.
- Verificación local de ediciones con imagen temporal y restauración; no se confunde con una carga del logo oficial ni con una escritura remota autenticada.
- Requiere autorización de la GitHub App por el propietario. Configuración y prueba local no prueban autenticación alojada. Ediciones van a feat/feature-catalog; rama de Worker sin cambios.

## 2026-11-04 · Recursos y FAQ compartidas

- Tres guías editoriales originales sin promesas ni métricas ficticias. No son manual del producto; contenidos se adaptan a la operación y distinguen capacidades no verificadas.
- Fuente FAQ común para home, precios y directorio, con componentes nativos accesibles sin JS. Sin marcado FAQPage promocional ni sitemap indexable mientras el sitio esté en revisión.

## 2026-11-04 · Auditoría local de calidad

- Añadidas dependencias de desarrollo fijadas para Playwright, axe y Lighthouse; no se incorporan al JS de la web estática.
- Se auditan todas las rutas y tres estados interactivos, incluyendo WCAG 2.1 A para detectar discrepancias entre etiqueta visible y nombre accesible.
- El menú móvil es mejora progresiva: enlaces disponibles sin JS; botón oculto hasta inicialización. main tiene tabindex=-1 para el salto accesible.
- Navegación envuelve líneas al ampliar texto; se acota adorno del hero. Marca usa texto/alt visible como nombre y favicon vacío evita pedir un recurso inexistente mientras se carga el original.
- Se conservan resultados incomplete de contraste y evaluación manual, sin declarar conformidad completa. Noindex/robots no se retiran para maquillar puntuaciones SEO.
- Resultados Lighthouse son laboratorio local con simulación móvil, no usuarios reales ni producción. Se guardan resúmenes y comandos reproducibles.
- Solo Codex principal. Sin cambios de contenido comercial, CMS alojado, DNS o rama del Worker.

## 2026-11-04 · Worker reproducible sin despliegue

- Wrangler 4.157.0 fijado y configuración de assets estáticos solo dist. Sin main/SSR o bindings innecesarios: la web no necesita backend para este flujo.
- Rutas con barra final y 404-page; no se usa fallback SPA que convierta rutas inexistentes en éxitos 200.
- Build previo versionado ejecuta Astro y content:check con telemetría desactivada, propaga errores y evita depender de dist persistido. Observación local de src/content/public.
- Se ofrecen comandos de dry-run/dev/test; no script de publicación automática ni cambios del Worker/DNS.
- Runtime local verificado con estado HTTP, fuentes por hash, rutas internas excluidas y navegador móvil. Warning de Request.cf predeterminado documentado, sin relevancia funcional para assets estáticos; no equivale a validación de producción.
- DEPLOYMENT.md se reescribe para priorizar el Worker real y separar Pages histórico, configuración preparada y publicación no realizada.
- Solo Codex principal; rama desplegada sin cambios.

## 2026-11-04 · Control automático para ediciones editoriales

- Ante confirmación de CMS aún sin conectar, se completa trabajo independiente: workflow de validación en GitHub, sin integración ni publicación.
- Instala desde lockfile y ejecuta check/dry-run y pruebas de todo el sitio, navegación y axe. Permisos de lectura, sin credenciales de despliegue; artefactos solo para revisión.
- Informes viejos se eliminan antes de validar para no atribuir evidencia pasada a un job que falló antes de generar resultados.
- Navegador configurable mediante CHROMIUM_PATH: sistema local o distribución Playwright en CI. No se depende de una ruta de Chromium exclusiva del entorno actual.
- No se cambian contenido comercial, estilos ni rama del Worker. No se afirma una ejecución alojada exitosa ni conexión CMS por pasar localmente.
- Solo Codex principal; el siguiente paso externo sigue siendo autorización de la GitHub App por el propietario.

## 2026-11-04 · Guardado real de CMS y marca oficial

El propietario guardó tres imágenes originales y su selección de marca en cuatro commits (1206881, a3803b7, 222f48b, 55f79ee). Se incorporaron con fast-forward, sin sobrescribir trabajo. Dimensiones horizontales corregidas a 7958 × 2005; bytes originales preservados. Cabecera/pie/fav probados en seis anchos con test:brand; hashes versionados. /admin deja de afirmar conexión pendiente. Adorno del hero desplazado 1.5rem para corregir overflow a 900 px.

Check 40 archivos y build 19 páginas aprobados; test:ci local 19 rutas/66 destinos, navegación y axe 41 comprobaciones sin infracciones automáticas. Lighthouse local 100/96/100 rendimiento y SEO 66 por noindex; CLS catálogo 0.119 y peso de PNG quedan pendientes. No certificación WCAG ni métricas de producción. Guardado CMS comprobado mediante Git, sin login del agente. Solo Codex principal.

Rama seguida feat/brand-foundation observada en ed7227d con .pages.yml vacío agregado por el propietario. Simulación de integración sin conflictos conserva el esquema completo; no se hizo integración, push a esa rama, deploy ni cambio DNS. Siguiente paso: autorización explícita para integrar versión validada; antes fetch/revisar cambios concurrentes. Actions alojado y PR existentes sin verificar por API Forbidden.

## 2026-11-04 · Integración autorizada para Worker

El usuario respondió «Sí. autorizo.» a integrar ec19bb7 en feat/brand-foundation para actualizar el Worker público. Fetch confirmó ambas puntas sin cambios nuevos; merge sin conflictos sobre ed7227d conserva el .pages.yml completo, originales y commits del propietario. Integración directa mediante push normal; sin force-push, DNS, secretos nuevos ni retirada de noindex. No se crea PR. Solo Codex principal.

Pruebas funcionales de ec19bb7 siguen vigentes porque no cambia el árbol de aplicación integrado; se repite worker:check del merge como comprobación de paquete. Comprobación remota: curl al Worker bloqueado por proxy (CONNECT 403), consulta Actions por gh bloqueada (Forbidden). No afirmar publicación exitosa ni CI remoto verde. Siguiente paso exacto: comprobar build de este commit en Cloudflare Deployments y recorrer rutas/logo/admin en el hostname; después continuar desarrollo en feat/feature-catalog sincronizada, sin más publicaciones implícitas.

## 2026-11-04 · Identidad Git y despliegue confirmado por captura

El propietario solicita usar siempre Joel Alejandro Yañez Caballero. Configuración local del repositorio aplicada: user.name con ese nombre, user.email joel.yc23@gmail.com (correo previamente confirmado). Verificados autor y committer efectivos con git var; ambos correctos. La configuración local prevalece sobre la identidad global heredada del entorno. AGENTS.md registra cómo replicarla en futuros checkouts; .git/config no se versiona. No se reescribe el historial publicado.

La captura aportada por el propietario muestra build Cloudflare #7b8076e1 exitoso, rama feat/brand-foundation, commit 9a017af, mensaje de integración y todas las etapas verdes. Confirma el build/despliegue en el dashboard, sin afirmar recorrido funcional remoto por el agente. ID de versión de la captura anterior: f53f452e; diferente del SHA Git.

Entrega solo de configuración/documentación en feat/feature-catalog, sin nueva publicación. Verificación: identidad efectiva y git diff --check; no se repiten pruebas de aplicación porque su código no cambia. Agente: Codex principal, sin subagentes. Siguiente paso exacto: recorrer el Worker publicado (logo, /admin, catálogo, demo, privacidad y 404); luego resolver CLS del catálogo y revisión comercial/legal. Consultar git log -1 para el commit documental y git ls-remote para persistencia. No se creó PR; PR existentes sin verificar por limitación API ya documentada.

## 2026-11-04 · Estabilidad de cabecera y carga de fuentes

Implementado: menú móvil inicializado durante el parsing con script inline encapsulado tras la cabecera; evita que el nav expandido aparezca y desplace todo main antes de cargar el módulo externo. Conserva enlaces sin JS y eventos de teclado/Escape. Precarga explícita de Manrope y Gluten originales locales, sin cambiar fuentes ni logos. Prueba de navegación extendida para bloquear scripts externos y verificar que el menú siga operativo. Una futura CSP debe autorizar el script mediante hash/nonce.

Pruebas: check 40 archivos sin errores/advertencias, build 19 páginas y content:check aprobados. Suite test:ci después de adelantar menú: 19 rutas/66 destinos, navegación y 41 comprobaciones axe sin infracciones automáticas; incomplete de contraste separado, no certificación completa. Después de precargar fuentes: check/build y Lighthouse final tres rutas aprobados; rendimiento/accesibilidad/buenas prácticas 100, SEO 66 por noindex. CLS home/catálogo/demo 0 en laboratorio; catálogo previo 0.119. LCP final aproximadamente 0.90 s; sin afirmar métricas de producción. test:navigation final incluye scripts externos bloqueados.

Persistencia solo en feat/feature-catalog, con identidad Joel Alejandro Yañez Caballero. Sin push a rama del Worker ni despliegue nuevo; publicado sigue 9a017af. Agente: Codex principal. Quedan peso de PNG, revisión manual/dispositivos y pendientes comerciales/legales. Siguiente paso: revisión de esta corrección y optimización de entrega de imágenes preservando originales; publicación posterior requiere autorización explícita. Sin PR creada; las existentes no se pueden verificar con la API disponible.
