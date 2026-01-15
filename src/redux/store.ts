import { configureStore } from '@reduxjs/toolkit'
import authReducer from "@/redux/features/authSlice"
import { authApi } from '@/redux/api/auth'
import { userAPI } from './api/userApi'
import { courseAPI } from './api/courseApi'
import { testimonialApi } from './api/testimonialApi'

export const store = () => {
  return configureStore({
    reducer: {
      [userAPI.reducerPath]: userAPI.reducer,
      [courseAPI.reducerPath]: courseAPI.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [testimonialApi.reducerPath]: testimonialApi.reducer,
      auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userAPI.middleware,
        courseAPI.middleware,
        authApi.middleware,
        testimonialApi.middleware
      ),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
