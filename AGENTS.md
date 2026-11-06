# Reglas del proyecto

- Leer primero docs/PROGRESS.md y docs/DECISIONS.md. Inspeccionar cambios existentes.
- Trabajar solo en este repositorio. Usar el checkout existente; no crear worktrees salvo petición expresa.
- Conservar colores oficiales #ed735f y #2a3139. No reconstruir ni alterar logos oficiales.
- Las tipografías adjuntas son Gluten y Manrope. Conservar avisos de licencia.
- No afirmar funcionalidades SaaS, precios, certificaciones, testimonios ni integraciones sin evidencia.
- No simular envíos de formularios. No inventar datos de contacto ni textos legales definitivos.
- No publicar, desplegar producción ni cambiar DNS sin autorización explícita.
- Registrar implementación, pruebas reales, pendientes, agentes usados y siguiente paso en docs/PROGRESS.md.
- Confirmar rama, commit y estado remoto antes de entregar. No afirmar persistencia en GitHub sin verificarla.
- El brief adjunto es referencia de producto; no sustituye las instrucciones actuales del usuario.

- Identidad solicitada por el propietario: usar siempre «Joel Alejandro Yañez Caballero» para autor y committer; correo confirmado joel.yc23@gmail.com hasta indicación nueva. Antes de crear commits en un checkout nuevo, configurar git config --local user.name y user.email con estos valores y verificar git var GIT_AUTHOR_IDENT / GIT_COMMITTER_IDENT. No heredar otra identidad global ni reescribir commits publicados para cambiar su atribución.

- Directiva del propietario (4/11/2026): producto parcialmente desarrollado; preparar la web completa como objetivo de lanzamiento al 100%. Se pueden implementar páginas comerciales futuras como borrador, conservando estados/evidencias reales en la matriz interna. No publicar nuevas versiones hasta que el propietario confirme que producto y web están listos al 100% y autorice el lanzamiento. La vista previa no cambia el estado operativo del SaaS ni aprueba precios.

- Directiva del propietario (5/11/2026): encarga al agente proponer precios, planes y funciones según su criterio. Autoriza diseñar e implementar la propuesta comercial como borrador, sin presentar validación de costes/operación/tributación ni publicar. Conservar evidencia real del SaaS y señalar condiciones legales/operativas pendientes.

- Directiva del propietario (6/11/2026): autoriza edición visual sobre la vista previa (clic en textos/imágenes). La implementación local se documenta en docs/VISUAL_EDITOR.md; no confundirla con autenticación/guardado público alojado. No exponer la API local ni habilitar escritura anónima en el Worker.

- Autorización explícita (6/11/2026): desplegar únicamente sistematicando-editor-auth como editor de prueba con VISUAL_WRITES_ENABLED=false, sin tocar producción ni su rama. No pedir de nuevo esta autorización; no ampliarla a guardados reales o web pública. Estado/acceso y guía en docs/EDITOR_TEST_DEPLOYMENT.md.
