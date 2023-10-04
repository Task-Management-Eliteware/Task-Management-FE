import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { screen } from '@testing-library/react';
import { TApiListReturn, TApiReturn, TTask, TTaskUpsert, TTaskList } from 'shared/models';
import { baseApiQuery } from '../interceptor';

export type TUpdate = TTaskUpsert;
type TListReturn = TApiListReturn<TTaskList>;
type TReturn = TApiReturn<TTask>;
export type TPagination = {
  pageNumber: number;
  limit: number;
  sortByField?: 'updatedAt' | 'createdAt';
  taskCategories?: string[];
};

const apiReducerPath = 'tasks';
const baseEndPoint = '/tasks';
const tags = ['Tasks'];

const api = createApi({
  reducerPath: apiReducerPath,
  baseQuery: baseApiQuery,
  tagTypes: tags,
  endpoints: (builder) => {
    return {
      list: builder.query<TListReturn, TPagination>({
        providesTags: tags,
        query: (query) => ({
          method: 'get',
          url: baseEndPoint,
          params: { ...query, taskCategories: JSON.stringify(query.taskCategories) },
        }),
      }),
      post: builder.mutation<TReturn, TUpdate>({
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
      update: builder.mutation<TReturn, TUpdate>({
        invalidatesTags: tags,
        query: (task) => ({
          method: 'put',
          url: `${baseEndPoint}/${task._id}`,
          body: task,
        }),
      }),
      checkedTask: builder.mutation<TReturn, Pick<TTask, '_id' | 'isCompleted'>>({
        invalidatesTags: tags,
        query: (task) => ({
          method: 'put',
          url: `${baseEndPoint}/check/${task._id}`,
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
  useCheckedTaskMutation: useCheckedTask,
} = api;

export const tasksApi = api;
