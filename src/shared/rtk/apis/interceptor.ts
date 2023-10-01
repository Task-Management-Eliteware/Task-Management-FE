import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { IS_ENABLE_GLOBAL_LOADER } from 'shared/constant';
import { BaseApiQueryType, ExtraOptionType } from 'shared/models';
import { localStorageGetItem } from 'shared/utils';

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

      // const {
      //   authSlice: { accessToken },
      // } = getState() as any;

      const token = localStorageGetItem('token');

      header.set('Authorization', `Bearer ${token}`);
      return header;
    },
  }) as BaseApiQueryType;
};

export const baseApiQuery: BaseApiQueryType = async (args, api, extraOption = {}) => {
  // const { enableLoading = IS_ENABLE_GLOBAL_LOADER } = extraOption;
  const apiCopy = { ...api };
  const { dispatch } = apiCopy;
  // signal.onabort(() => {

  // })
  try {
    // if (enableLoading) dispatch(setLoading(true));
    const query = baseQuery(extraOption);
    const result = await query(args, api, extraOption);

    // if (result.data) {
    //   // success handler
    // }
    // if (result.error) {
    //   // error handler
    //   const { data, status } = result.error;
    //   if (typeof status === 'number') {
    //     // if (status === 401) { }
    //     // if (status === 409) { }
    //     if (status === 404) {
    //       console.log('404', data);
    //     }

    //     if (status === 400) {
    //       //   const {
    //       //     error: { details },
    //       //   } = data;

    //       //   if (details.length > 0) {
    //       //     details.forEach((er) => console.log('api error =>', er.message));
    //       //   }
    //       // }

    //       // const isExpectedClientError = status >= 400 && status < 500;
    //       // if (!isExpectedClientError) console.log('Unexpected Error Occurred!');
    //       console.error('Bed request');
    //     }
    //   }
    // }
    return result;
  } catch (error: unknown) {
    throw error;
  } finally {
    // if (enableLoading) dispatch(setLoading(false));
  }
};
