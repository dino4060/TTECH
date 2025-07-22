// formatPercent //
export function formatPercent(value: number | string, withMinus = true): string {
  const number = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(number)) return '-0%';

  return withMinus ? `-${number}%` : `${number}%`;
}

// formatCurrency //
export function formatCurrency(
  value: number | string | null | undefined,
  isSinglePrice = true,
  withSymbol = true
): string {
  if (!value) return '0₫';

  const number: number = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(number)) return '0₫';

  let result: string = number.toLocaleString('vi-VN');

  if (withSymbol) result = `${result}₫`;

  if (!isSinglePrice) result = `từ ${result}`

  return result;
}