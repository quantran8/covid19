import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseUser } from 'Api/user';
import { getAllRequest } from 'Api/firebasedb';
import fireBase from '../../firebase';
export const getUser = createAsyncThunk(
  'getuser/firebase',
  async (p, { dispatch, getState }) => {
    const user = await firebaseUser();
    const userAllRequest = await getAllRequest('userEmail', '==', user.email);
    const userInteresed = await getAllRequest(
      'userInteresed',
      '==',
      user.email,
    );
    const requestOfAllUser = await getAllRequest();
    return {
      ...getState().user,
      userInfo: user,
      userAllRequest,
      userInteresed,
      requestOfAllUser,
    };
  },
);
const initialState = {
  userInfo: {},
  userAllRequest: [],
  userInteresed: [],
  requestOfAllUser: [],
  requestInfo: {},
};
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
    setRequest: (state, action) => {
      state.requestInfo = action.payload;
      return state;
    },
    updateRequest: (state, action) => {
      const index = state.userAllRequest.findIndex(
        (item) => item.id == action.payload.id,
      );
      state.userAllRequest[index] = action.payload;
      const index2 = state.requestOfAllUser.findIndex(
        (item) => item.id == action.payload.id,
      );
      state.requestOfAllUser[index2] = action.payload;
    },
    deleteRequest: (state, action) => {
      state.userAllRequest = state.userAllRequest.filter(
        (item) => item.id != action.payload,
      );
      state.requestOfAllUser = state.requestOfAllUser.filter(
        (item) => item.id != action.payload,
      );
      return state;
    },
    addRequest: (state, action) => {
      state.userAllRequest.push(action.payload);
      state.requestOfAllUser.push(action.payload);
    },
    updateInteresedRequest: (state, action) => {
      console.log(action.payload);
      const index = state.userInteresed.findIndex(
        (item) => item.id == action.payload.id,
      );
      state.userInteresed[index] = action.payload
      const index2 = state.requestOfAllUser.findIndex(
        (item) => item.id == action.payload.id,
      );
      state.requestOfAllUser[index] = action.payload;
    },
    deleteInteresedRequest: (state, action) => {
      state.userInteresed = state.userInteresed.filter(
        (item) => item.id != action.payload,
      );
      const index = state.requestOfAllUser.findIndex(
        (item) => item.id == action.payload,
      );
      state.requestOfAllUser[index] = {
        ...state.requestOfAllUser[index],
        userInteresed: '',
      };
    },
    addInteresedRequest: (state, action) => {
      const existed = state.userInteresed.some(
        (item) => item.id == action.payload.id,
      );
      if (!existed) state.userInteresed.push(action.payload);
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      console.log('loading......');
    },
    [getUser.fulfilled]: (state, action) => {
      console.log('fulfilled......');
      return (state = action.payload);
    },
    [getUser.rejected]: (state, action) => {
      console.log('errr');
    },
  },
});

const { actions, reducer } = auth;
export const {
  setUser,
  setRequest,
  updateRequest,
  deleteRequest,
  addRequest,
  updateInteresedRequest,
  deleteInteresedRequest,
  addInteresedRequest,
} = actions;
export default reducer;
