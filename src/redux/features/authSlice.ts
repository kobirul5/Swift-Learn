import { UserState } from '@/type/userState.intercace'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

 

const initialState: UserState = {
  user: typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload))
      }
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    }
  }
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
