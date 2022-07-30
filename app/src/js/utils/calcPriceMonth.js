export const calcPriceMonth = (price) => {
  const params = {
    value: 14500000,
    'down-payment': 20,
    interest: 3.15,
    term: 30,
  };

  const downPayment = (price / 100) * params['down-payment'];
  const cost = price - downPayment;
  const rate = params.interest / 1200;
  const term = params.term * 12;
  let result = 0;

  result = (cost * (rate * (1 + rate) ** term)) / ((1 + rate) ** term - 1);
  result = result === 0 || Number.isNaN(result) ? '$0' : result.toFixed(0);

  if (result <= 0) {
    result = 0;
  }

  return result;
};
