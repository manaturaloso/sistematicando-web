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

## 2026-11-04 · Fallo de Actions en FAQ abiertas: contraste transitorio

Evidencia remota aportada por el propietario: workflow Site and CMS quality #9, commit dd113be, falló en Check pages, navigation and accessibility. Resumen 41 comprobaciones y una infracción en expanded-menu-and-faq; no se recibió el detalle de regla del artefacto. La captura confirma fallo alojado, no fallo del despliegue Cloudflare.

Reproducción local: la animación appear aplicaba opacity 0→1 a los párrafos de details. Detenida al 25% mediante Web Animations, axe detecta color-contrast en cinco respuestas FAQ (1.9:1 frente al mínimo 4.5:1); al terminar la animación el mismo estado pasa. Es una causa reproducida compatible con el fallo dependiente del momento de medición; no se atribuye una regla al log remoto que no la muestra.

Corrección: retirar solo la interpolación de opacidad y conservar el desplazamiento suave de 3px y prefers-reduced-motion. Texto siempre opaco; sin desactivar color-contrast, exclusiones ni esperas para esconder el problema. Control negativo: reintroducir CSS anterior solo en página de prueba vuelve a detectar la infracción; CSS corregido pasa con las mismas cinco animaciones pausadas.

Auditoría ampliada a 42 estados/rutas con expanded-faq-animation-quarter en no-preference; conserva estado abierto normal y resto de pruebas. Logs ahora imprimen regla, selector, ayuda y causa, además del informe JSON del artefacto. Build 19 páginas/content:check y prueba de reproducción aprobados; resultado final de test:ci registrado al completar esta entrega. No repetir Lighthouse: no se cambia geometría ni carga de recursos.

Agente: Codex principal, sin subagentes. Identidad Git: Joel Alejandro Yañez Caballero. Solo rama feat/feature-catalog; sin despliegue ni push a feat/brand-foundation (publicado 9a017af). Siguiente paso exacto: revisar nueva ejecución de Actions del commit de esta entrega; debe mostrar 42 comprobaciones y cero infracciones. Si falla, abrir validate y copiar AXE + selector + causa o descargar accessibility-report.json del artefacto. API GitHub del entorno sigue sin acceso; no afirmar CI alojado verde hasta observarlo. Sin PR creada; PR existentes sin verificar.

## 2026-11-04 · Entrega responsive del logo, originales preservados

Brand.astro usa Image de Astro para generar PNGs de presentación a 256/512/768 px durante el build, con srcset y sizes acordes al clamp del CSS. Selección de logo y variante oscura siguen en content/site.json/Pages CMS; el raster activo se detecta con import.meta.glob de public/media. No se sobrescriben, recortan, reconstruyen ni cambian los originales; favicon y SVG conservan entrega directa. Metadatos reales del raster determinan proporción y reserva de espacio; dimensiones CMS siguen para fallback directo. Derivados estáticos bajo /_astro, sin endpoint de transformación en producción ni nueva dependencia.

Test:brand comprueba hashes de los tres originales, render/proporción/object-fit y selección de derivados con menor transferencia en seis anchos (320–1440), DPR 1 y 2, cabecera/pie y favicon. Datos en qa/brand-report.json: original claro 301321 bytes; navegador usa 13651 bytes en DPR1 y 31241 en DPR2, reducción 95.5%/89.6% en los casos medidos. Candidato 768 también generado para densidades mayores, no se afirma prueba de DPR3. Captura móvil revisada: marca sin recorte ni distorsión visible.

Check (40 archivos) y build (19 páginas) aprobados. Suite de sitio/accesibilidad y Lighthouse se registran al terminar esta entrega. La consulta de Actions de 8f6f44a sigue bloqueada por Forbidden; no afirmar CI remoto aprobado. Solo Codex principal, sin subagentes. Autor Joel Alejandro Yañez Caballero. Sin publicación ni push a rama seguida; Worker permanece en 9a017af. Sin PR creada; PR existentes no verificadas por API.

Siguiente paso exacto: comprobar Actions del commit de esta entrega; si falla revisar líneas AXE y artefacto, sin desactivar reglas. Después revisión manual de catálogo/demo/privacidad/admin en móvil y lector de pantalla y definición comercial/legal. Para reflejar correcciones en el Worker debe autorizarse una integración concreta; mantener DNS/noindex.

## 2026-11-04 · Validación de marca incorporada a CI

El flujo test:ci ahora ejecuta verify-brand junto a sitio, navegación y axe. Workflow adjunta brand-report.json al artefacto y elimina los tres informes anteriores antes de comenzar para no reutilizar evidencia vieja si falla el build. Sin deploy, cambios de permisos ni secretos.

La prueba de marca sigue las selecciones actuales del CMS: verifica hashes de cada original configurado, el logo claro u oscuro correspondiente a cabecera/pie, o el nombre textual si el campo queda vacío, y favicon opcional. Proporción contrastada con dimensiones reales del original, no con el raster claro compartido; permite SVG/directos y archivos pequeños sin imponer una reducción artificial. En raster grande compatible exige srcset y derivados; para originales >100 KB verifica menor transferencia. Recorre seis anchos a DPR1/2. No cambian componentes, contenido ni originales de marca.

Reproducción: CHROMIUM_PATH=/usr/bin/chromium npm run test:ci. Sitio 19 páginas/66 destinos, navegación y marca configurada aprobados; axe final registrado al completar. No repetir build/Lighthouse porque esta entrega cambia solo pruebas/workflow y usa el mismo build verificado de 296dc05. Comportamientos de fallback se codifican en la prueba; la ejecución de esta entrega usa los PNG oficiales seleccionados, no se afirma prueba alojada ni una edición CMS nueva.

Agente Codex principal, sin subagentes; autor Joel Alejandro Yañez Caballero. Rama feat/feature-catalog; no se crea PR ni despliega Worker. Publicado sigue 9a017af. PR existentes y Actions remoto sin verificar por API Forbidden; se solicitó al propietario el resultado observado de 296dc05. Siguiente paso exacto: revisar Actions del nuevo SHA de entrega y descargar brand-report.json si falla marca, accessibility-report.json/líneas AXE si falla accesibilidad; tras verde revisar manualmente y autorizar cualquier integración concreta al Worker. Quedan verificación comercial, tarifas, privacidad y revisión con dispositivos/lector de pantalla.

## 2026-11-04 · Textos dinámicos editables desde el CMS

Implementado: en Página: funcionalidades → Buscador y resultados se editan ejemplo de búsqueda, recuento inicial/singular/plural y etiqueta accesible de áreas. En Página: solicitar-demo → Documento y mensajes de la guía local se editan encabezado, etiquetas del documento, lista de preguntas, aviso de alcance, nombre accesible y mensajes de generación/descarga. Fuente content/pages.json; .pages.yml regenerado, conserva 23 editores y los contenidos existentes. Opción «Otra operación» usa ahora el texto editorial como valor en el documento.

Los recuentos exigen exactamente un {count}; content:check rechaza marcador ausente/duplicado/desconocido y guía con campos/preguntas vacíos. Texto compartido con el navegador en atributos escapados por Astro y mostrado con textContent, sin ejecutar HTML ni enviar solicitudes. La guía continúa siendo local, descargable como TXT y se invalida al cambiar opciones. Los avisos editoriales deben conservar esa realidad; las descripciones del CMS lo explican.

Pruebas: check/build aprobados (19 páginas, 14 módulos, 3 guías y 23 editores). test:ci ampliado incluye verify-editorial.mjs: ejemplo/recuentos/etiquetas, documento generado, descarga real con bytes coincidentes y mensajes/invalidación; también sitio 19 rutas/66 destinos, navegación, marca y axe 42 comprobaciones sin infracciones. Prueba negativa rechazó marcadores ausentes, duplicados y ajenos, restaurando contenido. Prueba con copia editorial temporal se documenta al completar y restaura contenido/build. Sin nuevas páginas ni capacidades SaaS.

Estado remoto conocido: el propietario confirmó Actions verde para 296dc05; ese dato no confirma 7537903 ni este nuevo SHA. API del entorno no permite consultar Actions/PR. Publicado sigue 9a017af; esta entrega solo feat/feature-catalog. Autor Joel Alejandro Yañez Caballero. Agente Codex principal, sin subagentes. Sin PR creada; existentes sin verificar. No se publica ni cambia DNS/indexación.

Siguiente paso exacto: revisar Actions del commit de esta entrega; después abrir los dos editores citados en Pages CMS de feat/feature-catalog y revisar sus campos nuevos. La configuración del CMS llega con el commit, no requiere crear otra cuenta. Para ver estas mejoras en el Worker se necesita una integración autorizada de la versión concreta. Quedan revisión manual con dispositivos/lector y definición comercial/legal; no inventar tarifas ni marcar módulos disponibles sin evidencia.

## 2026-11-04 · Página de contacto y acceso editorial

Implementado /contacto/: WhatsApp comercial confirmado reutilizando el componente existente; bloque distinto de privacidad con mailto y WhatsApp sin mensaje comercial, responsable/RUC/domicilio/canales leídos de content/contact.json. No se añade formulario, backend ni promesa de atención inmediata/presencial. Se explica que abrir un canal no envía solicitud ni reserva y que correo/WhatsApp son externos; política sigue en revisión. Enlaces a guía local y FAQ. No se enviaron mensajes reales.

Textos de la nueva página en content/pages.json, editor Página: contacto, .pages.yml regenerado (24 editores). Footer incluye Contacto; /admin tiene accesos directos a contacto, textos del catálogo y guía de demo. CSS propio reutiliza la identidad existente y mantiene proporción de logos. Empaquetador exige contacto/index.html y deriva resto de rutas.

Pruebas: check 42 archivos, cero errores/advertencias; content:check 14 módulos/3 guías/24 editores; build 20 páginas. Test editorial comprueba destinos exactos de WhatsApp comercial/privacidad y correo, sin navegar a terceros, tanto con JS como sin JS; cero formularios y responsable correcto. Comprueba overflow en cinco anchos y genera capturas móvil/escritorio. Suite completa y paquete registrados al finalizar. No se repite Lighthouse histórico de tres páginas ni se atribuyen sus métricas a esta página nueva.

Agente Codex principal, sin subagentes. Autor Joel Alejandro Yañez Caballero. Rama feat/feature-catalog; publicado sigue 9a017af, sin deploy/DNS/indexación nuevos ni PR creada. PR existentes y Actions nuevo sin verificar por API Forbidden; propietario confirmó verde 296dc05, no los SHA posteriores. Siguiente paso exacto: comprobar Actions del commit de esta entrega y revisar contacto/privacidad/canales; luego revisión manual con dispositivos/lector y definición comercial/legal. Cualquier integración al Worker requiere autorización de una versión concreta.

## 2026-11-04 · Entrega preparada para integración, sin publicación

Revisión concreta en RELEASE_REVIEW.md: aplicación cfad1a7 contra Worker 9a017af, contacto/CMS/marca/estabilidad/accesibilidad acumulados. Fetch sin cambios nuevos; destino antecesor e integración simulada sin conflictos. Worker dry-run repetido y aprobado (20 páginas, 59 archivos, sin carga); wrangler.jsonc idéntico. Se mantienen los resultados locales previos del mismo código: 20 rutas/68 destinos y axe 44 comprobaciones. No se repite toda la suite para una entrega solo documental.

Consulta Actions del candidato cfad1a7 bloqueada por Forbidden; verde de 296dc05 confirmado por el propietario no prueba este último. Candidato de entrega añade solo este registro y revisión sobre cfad1a7. Rama feat/feature-catalog; objetivo feat/brand-foundation sigue 9a017af, sin merge/push/deploy a esa rama. Sin PR creada, existentes sin verificar. Autor Joel Alejandro Yañez Caballero; agente Codex principal, sin subagentes.

Siguiente paso exacto: autorización explícita para integrar la entrega descrita y actualizar el Worker público; después fetch, integración segura, push y verificación de build/SHA/versión activa y rutas. Esta confirmación se necesita por la instrucción del propietario de no publicar sin autorización; la aprobación anterior correspondía a 9a017af. Mantener DNS/noindex y pendientes comerciales/legales/dispositivos.
