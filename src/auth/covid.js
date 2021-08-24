import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as get from 'Api/covid19';
export const getCovidData = createAsyncThunk('covid/data', async () => {
  const VN = await get.covidCasesVN();
  const HN = await get.covidCasesHanoi();
  const HCM = await get.covidCasesHoChiMinh();
  const Province = await get.covidCasesProvince();
  const vaccin = await get.vaccinationVN();
  const world = await get.casesWorld();

  const { Global } = world;
  const { first, second } = vaccin.data;
  const hndata = HN.data.data;
  const hcmdata = HCM.data.data;
  const { cases } = Province.data;
  const { data } = VN.data.vnSeason4CommunityDaily;

  return {
    VietNam: data,
    HaNoi: hndata,
    HoChiMinh: hcmdata,
    Province: cases,
    Vaccin: { first, second },
    World: Global,
  };
});

const initialState = {
  VietNam: [],
  HaNoi: [],
  HoChiMinh: [],
  Province: [],
  Vaccin: { first: '', second: '' },
  World: {},
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
      return state;
    },
    [getCovidData.rejected]: (state, action) => {
      state.loading = false;
      console.log('err');
    },
  },
});

const { reducer } = covidData;
export default reducer;
