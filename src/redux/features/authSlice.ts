import { UserState } from '@/type/userState.intercace';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const getUserFromStorage = () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined') return null;
    try {
        return JSON.parse(user);
    } catch (error) {
        console.error("Error parsing user from localStorage", error);
        return null;
    }
};

const initialState: UserState = {
    user: getUserFromStorage(),
    token: typeof window !== 'undefined' ? Cookies.get('accessToken') || null : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: UserState['user'], accessToken: string }>) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('accessToken', accessToken);
                Cookies.set('accessToken', accessToken, { expires: 7 });
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                Cookies.remove('accessToken');
            }
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
