const THRESHOLDS: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: 'year',   ms: 365 * 24 * 60 * 60 * 1000 },
  { unit: 'month',  ms: 30  * 24 * 60 * 60 * 1000 },
  { unit: 'week',   ms: 7   * 24 * 60 * 60 * 1000 },
  { unit: 'day',    ms: 24  * 60 * 60 * 1000 },
  { unit: 'hour',   ms: 60  * 60 * 1000 },
  { unit: 'minute', ms: 60  * 1000 },
  { unit: 'second', ms: 1000 },
];

// Returns a relative string: "2 hours ago", "in 3 days".
// Use for: activity feeds, notifications, comment timestamps.
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const diffMs = d.getTime() - Date.now();
  const absMs = Math.abs(diffMs);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

  for (const { unit, ms } of THRESHOLDS) {
    if (absMs >= ms) {
      return rtf.format(Math.round(diffMs / ms), unit);
    }
  }
  return rtf.format(0, 'second');
}
