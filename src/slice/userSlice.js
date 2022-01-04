import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseUser } from 'Api/user';
import fireBase from '../firebase';
export const getUser = createAsyncThunk(
  'getuser/firebase',
  async (p, { dispatch }) => {
    const user = await firebaseUser();
    return user;
  },
);

const auth = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
    helperInfo:(state, action) => {
      state.HelperInfo = action.payload;
      return state;
   }
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
export const { setUser,helperInfo } = actions;
export default reducer;
