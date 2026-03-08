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

const getAccessTokenFromStorage = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
};

const getRefreshTokenFromStorage = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
};

const initialState: UserState = {
    user: getUserFromStorage(),
    token: getAccessTokenFromStorage(),
    refreshToken: getRefreshTokenFromStorage(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: UserState['user'], accessToken: string, refreshToken: string }>) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.refreshToken = refreshToken;

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                // Also set cookies for Next.js middleware (proxy.ts)
                Cookies.set('accessToken', accessToken, { expires: 7 });
                Cookies.set('refreshToken', refreshToken, { expires: 30 });
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                // Clear cookies
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
            }
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
