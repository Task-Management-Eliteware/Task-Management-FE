/* eslint-disable valid-typeof */

/* eslint-disable no-prototype-builtins */
import { toast } from 'react-toastify';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseApiQueryType, ExtraOptionType } from 'shared/models';
import { localStorageGetItem, localStorageRemoveItem } from 'shared/utils';
import { logout } from '../slices';

// import { setLoading } from '../slices';
export const pause = (stop: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, stop);
  });

export const baseQuery = (options: ExtraOptionType) => {
  return fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TASK_MANAGEMENT_BASE_URL as string,
    fetchFn: async (...args) => {
      await pause(0);
      return fetch(...args);
    },
    prepareHeaders: (header, { getState }) => {
      const { isAuthorizationApi = true } = options;
      if (!isAuthorizationApi) return header;
      const token = localStorageGetItem('token');
      header.set('Authorization', `Bearer ${token}`);
      return header;
    },
  }) as BaseApiQueryType;
};

export const baseApiQuery: BaseApiQueryType = async (args, api, extraOption = {}) => {
  // const { enableLoading = IS_ENABLE_GLOBAL_LOADER } = extraOption;
  const apiCopy = { ...api };
  const { dispatch, signal, abort } = apiCopy;

  try {
    const query = baseQuery(extraOption);
    const result = await query(args, api, extraOption);
    if (result.error) {
      const { error } = result;
      if (error.status === 401) {
        localStorageRemoveItem('token');
        dispatch(logout());
        toast.error('Your session has expired. please log in again.');
      } else if (error.status === 500) {
        toast.error('Please try after sometimes.');
      }
    }
    return result;
  } catch (error: any) {
    throw error;
  } finally {
    //
  }
};
