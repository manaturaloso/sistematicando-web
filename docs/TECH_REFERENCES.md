# Referencias técnicas

- Preferencia del brief: Astro + TypeScript + Cloudflare; pendiente instalación y evaluación. Tailwind es opcional, aún no incorporado.
- Referencia actual: HTML/CSS nativo, sin bibliotecas de terceros ni build.
- Fuentes originales entregadas: Gluten (Etcetera-Type-Co/Gluten) y Manrope (sharanda/manrope). Metadatos internos declaran SIL OFL 1.1. Licencias completas recuperadas por HTTPS de google/fonts, ofl/gluten/OFL.txt y ofl/manrope/OFL.txt; fuentes de usuario sin transformar.
- Verificación disponible en la máquina: Python 3, fontTools, Playwright y Chromium. No son dependencias declaradas de la futura aplicación.

## Adopción técnica

Astro 7.4.5 (MIT), @astrojs/check 0.9.12 y TypeScript 6.0.3 (Apache-2.0). Herramientas instaladas desde npm con lockfile y verificación de integridad; motor Astro consultado antes de instalar. Componentes nativos y SVG propios, sin biblioteca UI. No se ejecutó benchmark comercial ni investigación comparativa de librerías en esta fase.

## Pages CMS

- Fuente consultada: https://raw.githubusercontent.com/pages-cms/pages-cms/main/README.md y archivo oficial https://codeload.github.com/pages-cms/pages-cms/tar.gz/refs/heads/main (2026-11-04). README dirige a app.pagescms.org y al repositorio actual pagescms/pagescms.
- Licencia MIT verificada en LICENSE del archivo. No se vendorea el CMS ni se añaden sus dependencias al sitio.
- Revisados esquema config, registro de campos, formatos JSON, rutas file/media y merge de objetos. Esquema público ejecutado temporalmente para validar .pages.yml.
- Hosting externo elegido para autenticación GitHub, historial y carga de medios sin una implementación propia de usuarios. No se afirma conexión alojada validada; requiere autorización GitHub del propietario.
