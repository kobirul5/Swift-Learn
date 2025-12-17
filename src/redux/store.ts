import { configureStore } from '@reduxjs/toolkit'
import { userAPI } from '@/redux/features/userAPI'
import { courseAPI } from '@/redux/features/courseAPI'
import authReducer from "@/redux/features/authSlice"
import { moduleAndLectureAPI } from '@/redux/features/moduleAndLectureAPI'

export const store = () => {
  return configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [courseAPI.reducerPath]: courseAPI.reducer,
        [moduleAndLectureAPI.reducerPath]: moduleAndLectureAPI.reducer,
        auth: authReducer

    },
    middleware: (getDefaultMiddleware)=> 
      getDefaultMiddleware().concat(
        userAPI.middleware,
        courseAPI.middleware,
        moduleAndLectureAPI.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']