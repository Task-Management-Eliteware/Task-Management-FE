import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { string } from 'yup';
import { TLoginReturn } from 'shared/models';
import { localStorageGetItem } from 'shared/utils';

// const initialState: AuthType = {
//   accessToken: JSON.parse(localStorage.getItem('user') || '{"accessToken":null,"user":null}').accessToken,
//   user: JSON.parse(localStorage.getItem('user') || '{"accessToken":null,"user":null}').user,
// };
const token = localStorageGetItem('token');
console.log('token', token);
const initialState: TLoginReturn = {
  token: '',
};

export const slice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state, action: PayloadAction<TLoginReturn>) => {
      state.token = '';
    },
    setToken: (state, action: PayloadAction<TLoginReturn>) => {
      state.token = action.payload.token;
      // state.user = action.payload.user;
    },
  },
});

export const { logout, setToken } = slice.actions;
export default slice;
