export const formatPrice = (price, currency, locale) => {
  const formatOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  if (locale === 'fr') {
    // French Canadian format: "12,99 $"
    return new Intl.NumberFormat('fr-CA', formatOptions).format(price);
  } else {
    // English format: "$12.99"
    return new Intl.NumberFormat('en-CA', formatOptions).format(price);
  }
};

export const convertCurrency = (price, fromCAD, rate) => {
  return fromCAD ? price * rate : price;
};

export const getChartColors = (index) => {
  const colors = [
    { bg: 'rgba(239, 68, 68, 0.8)', border: 'rgb(239, 68, 68)' },    // Red
    { bg: 'rgba(59, 130, 246, 0.8)', border: 'rgb(59, 130, 246)' },  // Blue
    { bg: 'rgba(16, 185, 129, 0.8)', border: 'rgb(16, 185, 129)' },  // Green
    { bg: 'rgba(245, 158, 11, 0.8)', border: 'rgb(245, 158, 11)' },  // Orange
    { bg: 'rgba(139, 92, 246, 0.8)', border: 'rgb(139, 92, 246)' },  // Purple
    { bg: 'rgba(236, 72, 153, 0.8)', border: 'rgb(236, 72, 153)' },  // Pink
    { bg: 'rgba(6, 182, 212, 0.8)', border: 'rgb(6, 182, 212)' },    // Cyan
    { bg: 'rgba(34, 197, 94, 0.8)', border: 'rgb(34, 197, 94)' }     // Emerald
  ];
  return colors[index % colors.length];
};