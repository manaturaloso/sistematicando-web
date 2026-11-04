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
