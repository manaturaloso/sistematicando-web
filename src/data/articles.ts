import data from '../../content/articles.json';
export interface Article {
  slug: string;
  title: string;
  category: string;
  intro: string;
  takeaway: string;
  moduleId: string;
  guideSlugs: string[];
  sections: { title: string; paragraphs: string[]; points: string[] }[];
}
export const articles: Article[] = data.items;
