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
