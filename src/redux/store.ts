import { configureStore } from '@reduxjs/toolkit'
import { userAPI } from '@/features/userAPI'
import authReducer from "@/features/authSlice"

export const store = () => {
  return configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        auth: authReducer

    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(userAPI.middleware)
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']