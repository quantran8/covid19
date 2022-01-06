import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import covidReducer from 'features/covid/covidSlice';
const rootReducer = {
  user: userReducer,
  covid: covidReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
