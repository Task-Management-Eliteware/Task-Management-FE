import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi, tasksApi, categoriesApi } from './apis';
import { authSlice, logout } from './slices';

const combinedReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
});

export const store = configureStore({
  reducer: (rootState, action) => {
    let state = rootState;
    // clear all api cached data on logout
    if (logout.match(action)) {
      state = undefined;
    }
    return combinedReducer(state, action);
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([authApi.middleware, tasksApi.middleware, categoriesApi.middleware]);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './apis';
export * from './slices';
