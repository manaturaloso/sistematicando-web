import { writeFileSync } from 'node:fs';
import { features, featureGroups, statusLabels } from '../src/data/features.ts';
const ids = new Set();
for (const feature of features) {
  if (ids.has(feature.id)) throw new Error(`Duplicate feature id: ${feature.id}`);
  ids.add(feature.id);
  if (!featureGroups.some(group => group.id === feature.group)) throw new Error(`Unknown group: ${feature.group}`);
  if (feature.status !== 'unverified' && feature.evidence.includes('Sin evidencia operativa')) {
    throw new Error(`Update evidence before changing status: ${feature.id}`);
  }
}
const rows = features.map(feature => `| ${feature.id} | ${feature.name} | ${featureGroups.find(group => group.id === feature.group).name} | ${statusLabels[feature.status]} | ${feature.sectors.join(', ')} |`).join('\n');
const details = features.map(feature => `### ${feature.name}\n\n- ID: \`${feature.id}\`.\n- Descripción: ${feature.description}\n- Evidencia: ${feature.evidence}\n- Dependencias: ${feature.dependencies}\n- Riesgos / afirmaciones no permitidas: ${feature.limits}\n- Comunicación permitida: presentar como área conceptual a evaluar, con estado ${statusLabels[feature.status].toLowerCase()}; no afirmar disponibilidad ni inclusión comercial.\n`).join('\n');
writeFileSync(new URL('../docs/FEATURE_STATUS.md', import.meta.url), `# Estado funcional\n\nGenerado con \`npm run docs:features\` desde content/features.json a través de src/data/features.ts. No editar esta matriz manualmente: actualizar la fuente y regenerar. El inventario describe el SaaS, no el estado de implementación del sitio.\n\n## Web comercial\n\nHome, soluciones, catálogo, recursos/FAQ y /admin de acceso CMS implementados; CMS conectado a GitHub con guardado real verificado. Página de contacto y metadatos de versión implementados. Planes y precios propuestos por encargo (PRICING_STRATEGY.md), pendientes de validación económica/tributaria, y guía local de demo descargable implementados; sin receptor propio; contacto voluntario externo por WhatsApp y política de privacidad en revisión. La guía no transmite datos. Las 14 páginas de módulos usan contenido de lanzamiento como objetivo completo, por indicación del propietario, mientras el producto sigue parcialmente desarrollado. launchDraft identifica el borrador y no autoriza publicación. Los estados de los módulos SaaS no cambian por implementar estas páginas.\n\n## Matriz SaaS\n\n| ID | Módulo | Grupo | Estado | Sectores |\n|---|---|---|---|---|\n${rows}\n\n## Evidencia y límites\n\n${details}\n## Alcance adicional\n\nPMS completo, dispositivos compartidos/PIN, auditoría y otras capacidades descritas en el brief no están verificados. No se han añadido como módulos disponibles. No se confirma integración SUNAT, pagos ni controles de seguridad operativos. Antes de cambiar un estado se necesita evidencia real del producto y revisar el copy del catálogo.\n`);
console.log(`Updated FEATURE_STATUS.md: ${features.length} modules.`);
