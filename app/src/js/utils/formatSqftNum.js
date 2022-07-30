export const formatSqftNum = (price, sqFt) => {
  const priceSqFt = parseInt(sqFt.replace(',', ''), 10);
  const formatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4 });

  return formatter.format(price / priceSqFt);
};
