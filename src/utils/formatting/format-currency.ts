// Locale-aware currency formatting via Intl.NumberFormat.
// Defaults to user locale and USD.
export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale?: string,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}
