import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'auth/slice';
import covidReducer from 'auth/covid';
const rootReducer = {
  user: userReducer,
  covid: covidReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
