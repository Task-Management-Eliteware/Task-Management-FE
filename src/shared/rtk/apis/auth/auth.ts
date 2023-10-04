import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { TApiReturn, TLogin, TSignUP, TLoginReturn, TUser } from 'shared/models';
import { baseApiQuery } from '../interceptor';

type TReturn = TApiReturn<TLoginReturn>;
type TUserReturn = TApiReturn<TUser>;

const apiReducerPath = 'auth';

const api = createApi({
  reducerPath: apiReducerPath,
  baseQuery: baseApiQuery,
  endpoints: (builder) => {
    return {
      login: builder.mutation<TReturn, TLogin>({
        query: (body) => ({
          method: 'post',
          url: '/login',
          body,
        }),
        extraOptions: {
          isAuthorizationApi: false,
        },
      }),
      signup: builder.mutation<void, TSignUP>({
        query: (body) => ({
          method: 'post',
          url: '/signup',
          body,
        }),
        extraOptions: {
          isAuthorizationApi: false,
        },
      }),
      get: builder.query<TUserReturn, void>({
        query: () => ({
          method: 'get',
          url: '/user',
        }),
      }),
    };
  },
});

export const { useLoginMutation: useLogin, useSignupMutation: useSignUp, useGetQuery: useGetUser } = api;

export const authApi = api;
