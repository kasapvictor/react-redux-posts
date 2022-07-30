/**
 * форматирует число в денежный формат
 * @param price
 * @returns {string}
 */
export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // отключает центы .00
  });

  return formatter.format(price); /* $2,500.00 */
};
