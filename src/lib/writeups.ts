import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import writeupsIndex from '../../data/writeups.json';
import type { WriteUp, WriteUpMeta } from '@/types/writeup';

export { TAGS, TAG_SLUGS } from './writeupTags';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'writeups');

function sortByDateDesc(a: WriteUpMeta, b: WriteUpMeta) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllWriteUpsMeta(): WriteUpMeta[] {
  return [...(writeupsIndex as WriteUpMeta[])].sort(sortByDateDesc);
}

export async function getWriteUpBySlug(slug: string): Promise<WriteUp | null> {
  const meta = (writeupsIndex as WriteUpMeta[]).find((w) => w.slug === slug);
  if (!meta) return null;

  const filePath = path.join(CONTENT_DIR, meta.contentFile);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { content: markdown } = matter(raw);
  const processed = await remark().use(html).process(markdown);

  const { contentFile: _contentFile, ...rest } = meta;
  return {
    ...rest,
    content: processed.toString(),
  };
}

export function getAllWriteUpSlugs(): string[] {
  return (writeupsIndex as WriteUpMeta[]).map((w) => w.slug);
}
