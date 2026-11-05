# Revisión visual local · 5 de noviembre de 2026

Build de referencia: b6d1d2222034d39da466d19397342621a6c5dfa5; sourceModified True. Instantánea de trabajo, no identidad de un commit posterior ni versión del Worker público.

Se capturaron 42 rutas a 390/1440 px (84 combinaciones), primeras pantallas, página completa y pies. Se revisaron las hojas de primeras pantallas, once estados y cuerpos representativos de módulo, sector, artículo y guía. Las capturas completas permiten continuar la revisión; no se afirma lectura/aprobación exhaustiva de cada texto ni prueba con dispositivos físicos.

## Hallazgos corregidos

- Pie móvil: doce enlaces en columnas adaptables, 857 → 573 px de alto a 390 px/100%; objetivos de al menos 44 px y sin colisiones. A texto ampliado puede volver a una columna.
- Implementación: separación entre aviso introductorio y acciones.
- FAQ de home a 320 px/200%: scrollWidth 346 antes; corregido con mínimos de grid y ajuste de palabras, sin recortar contenido.
- Adorno de home a 900 px/200%: scrollWidth 908 antes; se elimina la rotación decorativa en anchos de tableta. No se modifica el mockup ni el logo.

## Cobertura visual y geométrica

| Ruta | Primera pantalla 390 | Primera pantalla 1440 | Pie / geometría |
| --- | --- | --- | --- |
| / | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /404.html | Revisada | Revisada | Sin pie en esta plantilla |
| /admin/ | Revisada | Revisada | Sin pie en esta plantilla |
| /ayuda/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /blog/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /blog/conectar-pedido-cierre-operacion/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /blog/elegir-que-ordenar-primero/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /blog/estandarizar-al-crecer-en-sedes/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /contacto/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/caja/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/clientes/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/compras-y-proveedores/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/control-de-accesos/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/eventos-y-entradas/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/facturacion-electronica/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/inventarios/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/mesas-y-comandas/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/multisede/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/personal-y-permisos/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/punto-de-venta/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/recetas-y-costos/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/reportes/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /funcionalidades/reservas/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /implementacion/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /legal/privacidad/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /legal/terminos/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /nosotros/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /precios/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /preguntas-frecuentes/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /recursos/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /recursos/guias/evaluar-software-para-tu-negocio/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /recursos/guias/ordenar-inventario-inicial/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /recursos/guias/preparar-cierre-de-caja/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /solicitar-demo/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /soluciones/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /soluciones/bares/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /soluciones/cafeterias/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /soluciones/eventos/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /soluciones/hoteles/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /soluciones/multisede/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |
| /soluciones/restaurantes/ | Revisada | Revisada | Sin colisiones; enlaces ≥44 px |

## Estados y límites

Menú abierto/Escape en móvil; buscador vacío/restaurado a ambos anchos; guía generada, invalidada y reiniciada a ambos anchos: once estados. No se enviaron mensajes ni se abrieron servicios externos. La geometría automatizada no equivale a aprobación humana; tampoco certifica WCAG.

Regresión duradera: home/pie a 320/390/768/900/1440 con texto 100/200%, además de reflujo en 31 rutas a 390/1280 y suite axe. La revisión visual local no cierra las pendientes de lector de pantalla, dispositivos físicos, motores distintos de Chromium, adopción legal/comercial ni producto SaaS.

Galería reproducible: `CHROMIUM_PATH=/usr/bin/chromium npm run review:visual -- /tmp/sistematicando-visual-final`; abrir index.html de esa carpeta. Opcional `--states-only` al final, en otra carpeta. report.json mide geometría/capturas; qa/visual-report.json añade el registro humano de esta entrega. Imágenes completas permanecen fuera del checkout; referencias seleccionadas en LAUNCH_PREVIEW.md.

Siguiente paso exacto: medir rendimiento de home, catálogo, demo, módulo y artículo; optimizar si los resultados lo justifican. Mantener borrador/noindex y Worker intacto. Agente: Codex principal, sin subagentes.
