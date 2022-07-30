/**
 * возвращает объект с датой в формате SAT Jul 30
 * @param number
 * @returns string
 */
export const getDate = (number = 1) => {
  const now = new Date();
  const tomorrow = new Date(now);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };

  tomorrow.setDate(now.getDate() + number);
  const will = tomorrow.toLocaleDateString('en-US', options).replace(',', '').split(' ');

  const date = will[2];
  const month = will[1];
  const day = will[0].toUpperCase();

  return `${day} ${month} ${date}`;
};
