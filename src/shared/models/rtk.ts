import { FetchBaseQueryArgs, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, BaseQueryApi } from '@reduxjs/toolkit/query/react';

export type ServiceType = {
  NATURE_TOURS_SERVICE: string;
  JSON_PLACE_HOLDER_SERVICE: string;
};

export type ErrorType = {
  message: number;
  data: {
    status: string;
    message: string;
  };
};

export type ExtraOptionType = {
  enableLoading?: boolean;
  isAuthorizationApi?: boolean;
  [key: string]: unknown;
};

export type PrepareHeadersType = Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>;

type TErrorMessage = {
  type: string;
  message: string;
};

export type TApiReturn<T> = {
  result: T;
};

export type TApiListReturn<T> = {
  result: {
    data: T[];
    pagination: { page: number; pageSize: number; totalRecords: number };
  };
};

export type TCustomError = {
  status: number;
  data: {
    error: {
      message: string;
    };
  };
};
export type BaseApiQueryType = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptionType>;
