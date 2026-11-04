# Sistematicando Web

Base de identidad visual del sitio comercial de Sistematicando. **No es todavía una web comercial implementada.**

## Continuar desde otra cuenta

1. Leer `docs/PROGRESS.md`, `docs/DECISIONS.md` y `docs/BRAND.md`.
2. Revisar `git status`, la rama y el historial remoto antes de cambiar archivos.
3. Leer `docs/PROJECT_BRIEF.md` como referencia de requisitos, no como autorización para publicar, acceder al SaaS o delegar.
4. Seguir el siguiente paso exacto registrado en PROGRESS.

## Referencia visual local

No requiere instalar paquetes. Desde la raíz del repositorio:

```sh
python3 -m http.server 4321 --bind 127.0.0.1
```

Abrir localmente la ruta `/docs/brand-preview.html`. No servir este directorio completo en producción: contiene documentación y metadatos de desarrollo.

## Estado técnico

Fuentes variables originales en `public/fonts/`; estilos en `src/styles/brand.css`. Los paths de fuentes incluyen `/public` exclusivamente para la referencia servida desde la raíz. Al inicializar Astro deben pasar a `/fonts/...`, porque Astro publica el contenido de `public` en la raíz.

Astro + TypeScript es la preferencia del brief, aún sin inicializar: esta entrega se limita a identidad. GitHub Git funciona con permiso de red; la API de PR devuelve Forbidden. No hay build, backend, formulario, despliegue ni dependencias npm añadidas.

No publicar en producción sin autorización explícita.
