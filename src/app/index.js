import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'slice/userSlice';
import covidReducer from 'slice/covidSlice';
const rootReducer = {
  user: userReducer,
  covid: covidReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
