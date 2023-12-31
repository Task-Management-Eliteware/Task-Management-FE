import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { TApiListReturn, TApiReturn, TCategories, TCategoryUpsert } from 'shared/models';
import { baseApiQuery } from '../interceptor';

type TBody = TCategoryUpsert;
export type TUpdateCategory = TCategoryUpsert & { _id: string };
export type TListReturn = TApiListReturn<TCategories>;
type TReturn = TApiReturn<TCategories>;

const apiReducerPath = 'categories';
const baseEndPoint = '/categories';
const tags = ['Categories'];

const api = createApi({
  reducerPath: apiReducerPath,
  baseQuery: baseApiQuery,
  tagTypes: tags,
  endpoints: (builder) => {
    return {
      get: builder.query<TListReturn, void>({
        providesTags: tags,
        query: (body) => ({
          method: 'get',
          url: baseEndPoint,
          body,
        }),
      }),
      post: builder.mutation<TReturn, TBody>({
        invalidatesTags: tags,
        query: (body) => ({
          method: 'post',
          url: baseEndPoint,
          body,
        }),
      }),
      delete: builder.mutation<TReturn, string>({
        invalidatesTags: tags,
        query: (taskId) => ({
          method: 'delete',
          url: `${baseEndPoint}/${taskId}`,
        }),
      }),
      update: builder.mutation<TReturn, TBody>({
        invalidatesTags: tags,
        query: (task) => ({
          method: 'put',
          url: `${baseEndPoint}/${task._id}`,
          body: task,
        }),
      }),
    };
  },
});

export const {
  useGetQuery: useGetCategoriesList,
  usePostMutation: useCreateCategories,
  useDeleteMutation: useDeleteCategories,
  useUpdateMutation: useUpdateCategories,
} = api;

export const categoriesApi = api;
