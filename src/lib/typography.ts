// Binds the last two words with a no-break space so headings never end on an orphan.
export function noOrphan(text: string): string {
  const i = text.lastIndexOf(' ');
  return i > 0 ? `${text.slice(0, i)} ${text.slice(i + 1)}` : text;
}
