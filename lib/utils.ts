export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function compareStableText(a: string, b: string) {
  const left = a.normalize('NFKD').toLowerCase();
  const right = b.normalize('NFKD').toLowerCase();

  if (left < right) return -1;
  if (left > right) return 1;
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export const inquiryPriceLabel = 'Ціну уточнюйте';

export function isInquiryPrice(value: number) {
  return !Number.isFinite(value) || value <= 0;
}

export function formatPrice(value: number) {
  if (isInquiryPrice(value)) return inquiryPriceLabel;

  return `${new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 0 }).format(value)} грн`;
}

export function formatPriceRange(min: number, max: number) {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

export function formatOrderTotal(total: number, hasInquiryItems: boolean) {
  if (!hasInquiryItems) return formatPrice(total);
  return total > 0 ? `${formatPrice(total)} + товари з уточненням ціни` : inquiryPriceLabel;
}
