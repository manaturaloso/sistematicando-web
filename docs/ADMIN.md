# Administración con GitHub y Pages CMS

## Qué está implementado

- `/admin/`: panel de acceso y enlaces por sección. **La edición y autenticación ocurren en Pages CMS, fuera del sitio.** No es un editor embebido ni una API de escritura anónima.
- `.pages.yml`: configuración de 23 editores, con biblioteca de imágenes. El archivo usa JSON, válido como YAML 1.2.
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
