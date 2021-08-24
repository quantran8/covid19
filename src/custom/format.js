export const formatNumber = (num) => {
  if (num) return num < 1000 ? num : `${num * 0.001}K`;
  else return 0;
};
export const formatDate = (date) => {
  if (date) return `${date.split('-').reverse().join('/')}`;
};
