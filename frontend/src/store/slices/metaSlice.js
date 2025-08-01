import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const metaSlice = createSlice({
    name: "meta",
    initialState: {
        metaData: {},
        loading: false,
        error: null,
        message: null,
     
    },
    reducers: {
        // employer will get all application (applied jobs) for jobs he posted
        requestForMeta(state, action) {
            state.loading = true;
            state.error = null;
        },
        successForMeta(state, action) {
            state.loading = false;
            state.error = null;
            state.metaData = action.payload.counts;
        },
        failureForMeta(state, action) {
            state.loading = false;
            state.error = action.payload;
        },


        clearAllErrors(state, action) {
            state.error = null;
            state.metaData = state.metaData;
        },
        resetMetaSlice(state, action) {
            state.error = null;
            state.metaData = state.metaData;
            state.message = null;
            state.loading = false;
        },
    },
});

export const fetchMetaData = (date) => async (dispatch) => {

    dispatch(metaSlice.actions.requestForMeta());
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/meta/applications-stats`,
            {
                withCredentials: true,
                headers: {
                    "date-range": date
                }
            }
        );
        dispatch(metaSlice.actions.successForMeta(response?.data));
        dispatch(metaSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            metaSlice.actions.failureForMeta(
                error.response.data.message
            )
        );
    }
};




export const clearMetaErrors = () => (dispatch) => {
    dispatch(metaSlice.actions.clearAllErrors());
};

export const resetMetaSlice = () => (dispatch) => {
    dispatch(metaSlice.actions.resetMetaSlice());
};

export default metaSlice.reducer;