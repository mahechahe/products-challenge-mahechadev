export const onFormatCurrencyColombian = (value) => {
  const newValue = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value || '0');
  return newValue ?? 0;
};
