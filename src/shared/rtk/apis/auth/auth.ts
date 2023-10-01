import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { TApiReturn, TLogin, TLoginReturn } from 'shared/models';
import { baseApiQuery } from '../interceptor';

type TMutation = TLogin;
type TReturn = TApiReturn<TLoginReturn>;

const apiReducerPath = 'auth';

const api = createApi({
  reducerPath: apiReducerPath,
  baseQuery: baseApiQuery,
  endpoints: (builder) => {
    return {
      post: builder.mutation<TReturn, TMutation>({
        query: (body) => ({
          method: 'post',
          url: '/login',
          body,
        }),
        extraOptions: {
          isAuthorizationApi: false,
        },
      }),
    };
  },
});

export const { usePostMutation: useLogin } = api;

export const authApi = api;
