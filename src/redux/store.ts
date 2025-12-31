import { configureStore } from '@reduxjs/toolkit'
import { userAPI } from '@/redux/features/userAPI'
import { courseAPI } from '@/redux/features/courseAPI'
import authReducer from "@/redux/features/authSlice"
import { moduleAndLectureAPI } from '@/redux/features/moduleAndLectureAPI'
import { authApi } from '@/redux/api/auth' 

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
