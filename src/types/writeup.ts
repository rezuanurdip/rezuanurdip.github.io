export type WriteUpTag = 'Reflection' | 'Poems' | 'Short Notes';

export interface WriteUpMeta {
  id: string;
  slug: string;
  title: string;
  date: string;
  tag: WriteUpTag;
  excerpt: string;
  contentFile: string;
  readingTime?: string;
  featured?: boolean;
}

export interface WriteUp extends Omit<WriteUpMeta, 'contentFile'> {
  content: string;
}
