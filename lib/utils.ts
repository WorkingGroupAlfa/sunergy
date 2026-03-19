export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(value: number) {
  return `${new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 0 }).format(value)} грн`;
}

export function formatPriceRange(min: number, max: number) {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}
