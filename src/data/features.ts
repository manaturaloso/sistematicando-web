import type { solutions } from './solutions';

type Sector = (typeof solutions)[number]['slug'];
export type FeatureStatus = 'unverified' | 'proposed' | 'planned' | 'in-development' | 'partial' | 'available';
export type FeatureGroup = 'operacion' | 'administracion' | 'clientes' | 'gestion' | 'eventos';
export interface Feature {
  id: string;
  name: string;
  group: FeatureGroup;
  description: string;
  question: string;
  sectors: Sector[];
  status: FeatureStatus;
  evidence: string;
  dependencies: string;
  limits: string;
}
export const statusLabels: Record<FeatureStatus, string> = {
  unverified: 'No verificada', proposed: 'Propuesta', planned: 'Planificada',
  'in-development': 'En desarrollo', partial: 'Parcialmente implementada', available: 'Verificada y disponible',
};
import data from '../../content/features.json' with { type: 'json' };
export const featureGroups = data.groups.map(group => ({ ...group, id: group.id as FeatureGroup }));
export const features: Feature[] = data.items.map(feature => ({
  ...feature, group: feature.group as FeatureGroup, status: feature.status as FeatureStatus,
}));
