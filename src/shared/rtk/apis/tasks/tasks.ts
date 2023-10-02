import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { TApiListReturn, TApiReturn, TTask, TTaskUpsert, TTaskList } from 'shared/models';
import { baseApiQuery } from '../interceptor';

export type TUpdate = TTaskUpsert;
type TListReturn = TApiListReturn<TTaskList>;
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
      list: builder.query<TListReturn, Record<string, any>>({
        providesTags: ['Tasks'],
        query: (body) => ({
          method: 'get',
          url: baseEndPoint,
          params: {
            taskCategoryIds: body.taskCategoryIds,
          },
        }),
      }),
      post: builder.mutation<TReturn, TUpdate>({
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
  useListQuery: useGetTasksList,
  usePostMutation: useCreateTask,
  useDeleteMutation: useDeleteTask,
  useUpdateMutation: useUpdateTask,
} = api;

export const tasksApi = api;
