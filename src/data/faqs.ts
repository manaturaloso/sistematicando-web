export interface FAQ { id: string; category: 'producto' | 'comercial' | 'privacidad'; question: string; answer: string; home?: boolean; pricing?: boolean; }
import data from '../../content/faqs.json';
export const faqCategories=data.groups;
export const faqs: FAQ[] = data.items.map(item => ({ ...item, category: item.category as FAQ['category'] }));
