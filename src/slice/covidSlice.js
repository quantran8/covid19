import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as get from 'Api/covid19';
export const getCovidData = createAsyncThunk('covid/data', async () => {
  const VN = await get.covidCasesVN();
  const HN = await get.covidCasesHanoi();
  const HCM = await get.covidCasesHoChiMinh();
  const Province = await get.covidCasesProvince();
  const vaccin = await get.vaccinationVN();
  const world = await get.casesWorld();
  const data = await get.getNews();

  const  Global  = world.data.data.table_world;
  const { first, second } = vaccin.data;
  const hndata = HN.data.data;
  const hcmdata = HCM.data.data;
  const { cases } = Province.data;
  const daily = VN.data.vnSeason4CommunityDaily.data;
  const time = VN.data.lastUpdated;
  const News = data.data['1004765'].data;

  return {
    VietNam: daily,
    HaNoi: hndata,
    HoChiMinh: hcmdata,
    Province: cases,
    Vaccin: { first, second },
    World: {...Global,Date:world.data.updated_at},
    News,
    Time:time
  };
});

const initialState = {
  VietNam: [],
  HaNoi: [],
  HoChiMinh: [],
  Province: [],
  Vaccin: { first: '', second: '' },
  World: {},
  News:[],
  Time:'',
  Loading: false,
};
const covidData = createSlice({
  name: 'covidData',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getCovidData.pending]: (state, action) => {
      state.Loading = true;
    },
    [getCovidData.fulfilled]: (state, action) => {
      state.VietNam = action.payload.VietNam;
      state.HaNoi = action.payload.HaNoi;
      state.HoChiMinh = action.payload.HoChiMinh;
      state.Province = action.payload.Province;
      state.Vaccin = action.payload.Vaccin;
      state.Loading = false;
      state.World = action.payload.World;
      state.News = action.payload.News;
      state.Time = action.payload.Time;
      return state;
    },
    [getCovidData.rejected]: (state, action) => {
      state.Loading = false;
      console.log('err');
    },
  },
});

const { reducer } = covidData;
export default reducer;
