export const formatPrice = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 2,
}).format(Number(value) || 0);

export const titleCase = (value = '') => value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
