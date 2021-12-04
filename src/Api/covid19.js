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
  const url = 'https://gw.vnexpress.net/cr/?name=world_coronavirus';
  const { data } = await axios.get(url);
  console.log(data)
  return data;
};

export const getNews = async () => {
  const url =
    'https://gw.vnexpress.net/ar/get_rule_2?category_id=1004765&limit=50&page=1&data_select=title,share_url,thumbnail_url,lead,publish_time';
  const { data } = await axios.get(url);
  return data;
};
