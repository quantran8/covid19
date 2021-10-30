export const formatNumber = (num) => {
  if (!num) return 0;
  if (num < 1000) return num;
  else if (num < 1000000) return `${(num * 0.001).toFixed(1)}K`;
  else return `${(num * 0.000001).toFixed(1)}Tr`;
};



export const formatDate = (date) => {
  if (date) return `${date.split('-').reverse().join('/')}`;
};
