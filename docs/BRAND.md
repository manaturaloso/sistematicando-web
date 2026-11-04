# Identidad visual

## Aprobado por el usuario

- Coral: `#ed735f`.
- Tinta: `#2a3139`.
- Eslogan: «Todo tu negocio, bajo control.» (referencia del brief).
- Tipografías entregadas: Gluten variable (wght 100–900, slnt −13–13); Manrope variable (wght 200–800). Metadatos inspeccionados con fontTools.
- Cuatro imágenes oficiales visibles en el mensaje: logo horizontal claro/oscuro, isotipo claro/oscuro. Tres originales están ahora en public/media, cargados desde Pages CMS: horizontales claro/oscuro e isotipo claro. No se han recreado ni transformado.

## Implementado

Originales TTF copiados sin transformación en public/fonts. Estilos CSS y referencia interna en docs/brand-preview.html.

## Propuestas, no reglas de marca aprobadas

Gluten para titulares breves, Manrope para lectura y controles. Blanco y #f5f7f8 como superficies. Radio 1.5rem, ancho máximo 72rem, botones de al menos 48px y foco visible. Composición editorial clara y coral usado con moderación.

Usar tinta sobre coral: blanco sobre coral no alcanza 4.5:1. No aplicar coral a texto pequeño sobre blanco. Ver resultados exactos de contraste en QA.md.

## Pendiente

Confirmar uso final de tipografías y revisar identidad en dispositivos reales. Originales integrados. Los textos completos SIL OFL 1.1 se incluyen junto a cada TTF; los avisos de copyright de los archivos originales se conservan también en NOTICE.md.

## Aplicación en la home

Manrope para contenido y navegación; Gluten en énfasis del eslogan y nota editorial. Colores primarios exactos; superficies crema y coral suave como propuestas secundarias. SVG de interfaz propios, sin alterar la marca. Ver src/styles/home.css.

## Administración de logos

content/site.json controla logoLight/logoDark, dimensiones, alt, favicon y pie oscuro. La marca se renderiza con Brand.astro: original sin recortes ni reconstrucción. Los archivos se suben a public/media desde el CMS. Campos actuales seleccionan logofullclear.png, logofulldark.png y logominiclear.png; dimensiones horizontales 7958 × 2005. Pie claro conservado según selección del propietario. Integridad SHA-256 y render en seis anchos: qa/brand-report.json. Instrucciones en ADMIN.md.

Calidad: enlace de marca toma nombre accesible del texto o alt, sin omitir texto visible. Mientras no exista favicon original configurado se usa una referencia vacía, sin inventar un isotipo.
