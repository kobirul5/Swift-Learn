import { configureStore } from '@reduxjs/toolkit'
import authReducer from "@/redux/features/authSlice"
import { moduleAndLectureAPI } from '@/redux/features/moduleAndLectureAPI'
import { authApi } from '@/redux/api/auth' 
import { userAPI } from './api/userApi'
import { courseAPI } from './api/courseApi'

export const store = () => {
  return configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [courseAPI.reducerPath]: courseAPI.reducer,
        [moduleAndLectureAPI.reducerPath]: moduleAndLectureAPI.reducer,
        [authApi.reducerPath]: authApi.reducer, 
        auth: authReducer
    },
    middleware: (getDefaultMiddleware)=> 
      getDefaultMiddleware().concat(
        userAPI.middleware,
        courseAPI.middleware,
        moduleAndLectureAPI.middleware,
        authApi.middleware // 👈 MUST
      ),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
