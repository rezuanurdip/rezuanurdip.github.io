import type { WriteUpTag } from '@/types/writeup';

export const TAGS = ['Reflection', 'Poems', 'Short Notes'] as const;

// Maps each tag to a CSS-safe slug.
export const TAG_SLUGS: Record<WriteUpTag, string> = {
  Reflection: 'reflection',
  Poems: 'poems',
  'Short Notes': 'short-notes',
};
