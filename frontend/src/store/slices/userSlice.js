import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: null,
        message: null,
    },
    reducers: {
        registerRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message;
        },
        registerFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
            state.message = null;
        },
        ///////////////////////////////////////
        loginRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
            state.message = null;
        },
        fetchUserRequest(state, action) {
            state.loading = true;
            state.isAuthenticated =action.payload==true?true: false;
            state.user = {};
            state.error = null;
        },
        fetchUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        fetchUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },
        logoutSuccess(state, action) {
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        logoutFailed(state, action) {
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.error = action.payload;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.user = state.user;
        },
        clearMessage(state, action) {
      
            state.message = null;
        },
    },
});

export const register = (data) => async (dispatch) => {
    dispatch(userSlice.actions.registerRequest());
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/user/register`,
            data,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(userSlice.actions.registerSuccess(response.data));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.registerFailed(error.response.data.message));
    }
};

export const login = (data) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/user/login`,
            data,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        dispatch(userSlice.actions.loginSuccess(response.data));
        // dispatch(userSlice.actions.clearMessage());

        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
};

export const getUser = (isAuthenticationToggle) => async (dispatch) => {
    dispatch(userSlice.actions.fetchUserRequest(isAuthenticationToggle));
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/user/getuser`,
            {
                withCredentials: true,
                // is used to send cookies and authentication headers along with cross-origin requests. 5173 to 3000
                // frontend and backend are on different domains
            }
        );
        dispatch(userSlice.actions.fetchUserSuccess(response?.data?.user));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {

        dispatch(userSlice.actions.fetchUserFailed(error?.response?.data?.message));
        dispatch(userSlice.actions.clearAllErrors());

    }
};
export const logout = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/user/logout`,
            {
                withCredentials: true,
            }
        );
        dispatch(userSlice.actions.logoutSuccess());
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    }
};

export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;