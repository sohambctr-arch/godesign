const FORMAT_OPTIONS: Record<'short' | 'medium' | 'long', Intl.DateTimeFormatOptions> = {
  short:  { year: 'numeric', month: 'numeric', day: 'numeric' },
  medium: { year: 'numeric', month: 'short',   day: 'numeric' },
  long:   { year: 'numeric', month: 'long',    day: 'numeric' },
};

// Formats a Date or ISO string via Intl.DateTimeFormat.
export function formatDate(
  date: Date | string,
  format: 'short' | 'medium' | 'long' = 'medium',
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(undefined, FORMAT_OPTIONS[format]).format(d);
}
