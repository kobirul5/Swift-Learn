import { configureStore } from '@reduxjs/toolkit'
// import authReducer from "@/redux/features/authSlice"
import { authApi } from '@/redux/api/auth'
import { userAPI } from './api/userApi'
import { courseAPI } from './api/courseApi'
import { testimonialApi } from './api/testimonialApi'
import { instructorApi } from './api/instructorApi'

import { faqAPI } from './api/faqApi'
import { contactAPI } from './api/contactApi'

export const store = () => {
  return configureStore({
    reducer: {
      [userAPI.reducerPath]: userAPI.reducer,
      [courseAPI.reducerPath]: courseAPI.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [testimonialApi.reducerPath]: testimonialApi.reducer,
      [instructorApi.reducerPath]: instructorApi.reducer,
      [faqAPI.reducerPath]: faqAPI.reducer,
      [contactAPI.reducerPath]: contactAPI.reducer,
      // auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userAPI.middleware,
        courseAPI.middleware,
        authApi.middleware,
        testimonialApi.middleware,
        instructorApi.middleware,
        faqAPI.middleware,
        contactAPI.middleware
      ),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
