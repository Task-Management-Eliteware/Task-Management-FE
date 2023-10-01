import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { TApiListReturn, TApiReturn, TTask, TTaskUpsert } from 'shared/models';
import { baseApiQuery } from '../interceptor';

type TBody = TTaskUpsert;
export type TUpdate = TTaskUpsert & { _id: string };
type TListReturn = TApiListReturn<TTask>;
type TReturn = TApiReturn<TTask>;

const apiReducerPath = 'tasks';
const baseEndPoint = '/tasks';
const tasks = ['Tasks'];

const api = createApi({
  reducerPath: apiReducerPath,
  baseQuery: baseApiQuery,
  tagTypes: tasks,
  endpoints: (builder) => {
    return {
      get: builder.query<TListReturn, void>({
        providesTags: ['Tasks'],
        query: (body) => ({
          method: 'get',
          url: baseEndPoint,
          body,
        }),
      }),
      post: builder.mutation<TReturn, TBody>({
        invalidatesTags: tasks,
        query: (body) => ({
          method: 'post',
          url: baseEndPoint,
          body,
        }),
      }),
      delete: builder.mutation<TReturn, string>({
        invalidatesTags: tasks,
        query: (taskId) => ({
          method: 'delete',
          url: `${baseEndPoint}/${taskId}`,
        }),
      }),
      update: builder.mutation<TReturn, TUpdate>({
        invalidatesTags: tasks,
        query: (taskId) => ({
          method: 'put',
          url: `${baseEndPoint}/${taskId}`,
        }),
      }),
    };
  },
});

export const {
  useGetQuery: useGetTasksList,
  usePostMutation: useCreateTask,
  useDeleteMutation: useDeleteTask,
  useUpdateMutation: useUpdateTask,
} = api;

export const tasksApi = api;
