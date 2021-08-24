import axios from 'axios';

export const covidCasesHanoi = async () => {
  const url = `https://api.zingnews.vn/public/v2/corona/getChart?loc=hanoi`;
  const { data } = await axios.get(url);
  return data;
};

export const covidCasesHoChiMinh = async () => {
  const url = `https://api.zingnews.vn/public/v2/corona/getChart?loc=hochiminh`;
  const { data } = await axios.get(url);
  return data;
};

export const covidCasesProvince = async () => {
  const url = 'https://api.zingnews.vn/public/v2/corona/getChart?type=province';
  const { data } = await axios.get(url);
  return data;
};

export const covidCasesVN = async () => {
  const url = 'https://api.zingnews.vn/public/v2/corona/getChart';
  const { data } = await axios.get(url);
  return data;
};

export const vaccinationVN = async () => {
  const url =
    'https://api.zingnews.vn/public/v2/corona/getChart?type=vaccination';
  const { data } = await axios.get(url);
  return data;
};

export const casesWorld = async () => {
  const url = 'https://api.covid19api.com/summary';
  const { data } = await axios.get(url);
  return data;
};
