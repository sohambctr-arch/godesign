// Truncates to maxLength characters at a word boundary.
// Prevents words being cut in half unlike CSS text-overflow alone.
export function truncate(text: string, maxLength: number, suffix = '…'): string {
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength - suffix.length);
  const wordBoundary = trimmed.lastIndexOf(' ');
  return (wordBoundary > 0 ? trimmed.slice(0, wordBoundary) : trimmed) + suffix;
}
