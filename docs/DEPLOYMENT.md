# Despliegue

No se ha desplegado. Producción requiere autorización explícita.

## Build real

Node 24.22.1; `npm ci`; `ASTRO_TELEMETRY_DISABLED=1 npm run check`; `ASTRO_TELEMETRY_DISABLED=1 npm run build`. Salida estática: dist. Probar con `ASTRO_TELEMETRY_DISABLED=1 npm run preview`. Publicar solo dist, nunca el checkout completo.

## Cloudflare pendiente

Cloudflare Pages con build npm run build, variable ASTRO_TELEMETRY_DISABLED=1 y salida dist es una opción para evaluar cuando se autorice. No se creó proyecto, pipeline, Worker ni DNS. No hay hostname confirmado; pages.dev y workers.dev no son intercambiables. Configurar comportamiento 404 y comprobar rutas en el hosting elegido.

## Antes de indexar o publicar

Resolver identidad y contenido comercial, canal de contacto y privacidad. Aprobar dominio real; entonces añadir canonical/sitemap/metadatos absolutos y retirar noindex/Disallow únicamente con autorización. El build actual bloquea indexación deliberadamente y no contiene formulario ni rastreadores.

## Vista compartible en Cloudflare Pages (autorizada, pendiente de subida)

El usuario aprobó una vista compartible en Cloudflare Pages. Esto no autoriza conectar el dominio oficial ni lanzar el sitio comercial definitivo. No hay acceso Cloudflare configurado en esta sesión, por lo que no se ha creado ningún proyecto ni deployment y no existe URL verificada.

### Paquete de revisión

Después del build ejecutar `python3 scripts/package-preview.py`. Genera `/workspace/sistematicando-preview.zip`, fuera del checkout, con el contenido de dist en la raíz del ZIP. Comprueba nueve páginas con noindex, robots, ausencia de archivos ocultos, integridad ZIP y exclusión de docs/src/Git. El ZIP es generado, no se versiona: se reproduce con el commit y el lockfile. Noindex y robots evitan indexación cooperativa, no restringen acceso ni convierten el sitio en privado.

### Subida desde la cuenta del usuario

1. En Cloudflare, abrir Workers & Pages y elegir crear una aplicación Pages con carga directa de archivos (los nombres de controles pueden variar).
2. Usar un proyecto separado de revisión, por ejemplo `sistematicando-revision`, sujeto a disponibilidad; no reutilizar producción ni asociar dominio personalizado.
3. Subir el ZIP generado o extraerlo y subir su contenido. `index.html` debe estar en la raíz, sin una carpeta dist adicional.
4. Cloudflare asigna el hostname real; no se anticipa ni se inventa una URL. La primera carga directa puede llamarse producción dentro de ese proyecto: debe ser exclusivamente el proyecto de revisión, nunca el proyecto oficial. Para un deployment de tipo Preview en sentido estricto, usar posteriormente la opción de preview si está disponible o Wrangler con una rama no productiva y autenticación autorizada.
5. Compartir la URL asignada para verificar home, soluciones, 404, fuentes y noindex. No retirar robots/noindex ni configurar DNS.

El acceso a la cuenta se realiza en Cloudflare. No compartir contraseñas ni tokens por chat. La carga directa y la integración con Git son modalidades distintas; confirmar la elegida antes de preparar automatización futura.
