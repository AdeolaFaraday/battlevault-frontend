import { combineReducers, configureStore } from '@reduxjs/toolkit';
import expireReducer from 'redux-persist-expire';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';

const appReducer = combineReducers({
  auth: authReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'ui/resetState') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const persistConfig = {
  transforms: [
    expireReducer('auth', {
      expireSeconds: 60 * 60 * 24,
      autoExpire: true,
    }),
  ],
  key: 'root',
  version: 1,

  // whitelist: ['ui', 'tags', 'auth'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  })

export const makeStore = () => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return makeConfiguredStore()
  } else {
    let store: any = configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [
              FLUSH,
              REHYDRATE,
              PAUSE,
              PERSIST,
              PURGE,
              REGISTER,
            ],
          },
        }),
      devTools: process.env.NODE_ENV !== 'production',
    })
    store.__persistor = persistStore(store)
    return store
  }
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']