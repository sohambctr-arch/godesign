// Locale-aware number formatting with optional compact notation.
// compact: true → "1.2M", "4.5K". Use for metric cards and dashboards.
export function formatNumber(
  value: number,
  options: { compact?: boolean; decimals?: number; locale?: string } = {},
): string {
  const { compact = false, decimals, locale } = options;
  return new Intl.NumberFormat(locale, {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}
