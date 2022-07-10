import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import layoutReducer from './features/layout/layoutSlice';
import featuresReducer from './features/features/featuresSlice';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

const production = process.env.NODE_ENV === 'production';

const rootReducer = combineReducers({
  layout: layoutReducer,
  features: featuresReducer,
});

const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
  production ? getDefaultMiddleware() : getDefaultMiddleware().concat(logger);

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: !production,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
