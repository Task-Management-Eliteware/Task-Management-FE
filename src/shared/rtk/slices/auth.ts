import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { string } from 'yup';
import { TLoginReturn } from 'shared/models';
import { localStorageGetItem } from 'shared/utils';

type TAuth = {
  token: string | null;
};

const initialState: TAuth = {
  token: localStorageGetItem('token'),
};

export const slice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
    setToken: (state, action: PayloadAction<TAuth>) => {
      state.token = action.payload.token;
    },
  },
});

export const { logout, setToken } = slice.actions;
export const authSlice = slice;
