import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/setupAxios";


const metaSlice = createSlice({
    name: "meta",
    initialState: {
        metaData: {},
        loading: false,
        error: null,
        message: null,
        monthlyPostedJobs: [],
        metaLoading: false,
        downloading: false,
    

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
        //
        requestForPdf(state, action) {
            state.downloading = true;
            state.error = null;
        },
        successForPdf(state, action) {
            state.downloading = false;
            state.error = null;
       

        },
        failureForPdf(state, action) {
            state.downloading = false;
            state.error = action.payload;
        },
        //jobs count
        requestForMonthlyJobsCounts(state, action) {
            state.metaLoading = true;
            state.error = null;
        },
        successForMonthlyJobsCounts(state, action) {
            state.metaLoading = false;
            state.error = null;
            state.monthlyPostedJobs = action.payload;
        },
        failureForMonthlyJobsCounts(state, action) {
            state.metaLoading = false;
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
        const response = await axiosInstance.get(
            `/api/v1/meta/employer`,
            {
         
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


//meta job-seeker

export const fetchMetaDataJobSeeker = (date) => async (dispatch) => {

    dispatch(metaSlice.actions.requestForMeta());
    try {
        const response = await axiosInstance.get(
            `/api/v1/meta/job-seeker`,
            {
 
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

export const monthlyJobsPostedCounts = () => async (dispatch) => {

    dispatch(metaSlice.actions.requestForMonthlyJobsCounts());
    try {
        const response = await axiosInstance.get(
            `/api/v1/meta/monthly-jobs-posted-counts`,
            {
        
                headers: {
                    // "date-range": date
                }
            }
        );
        dispatch(metaSlice.actions.successForMonthlyJobsCounts(response?.data?.data));
        dispatch(metaSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            metaSlice.actions.failureForMonthlyJobsCounts(
                error.response.data.message
            )
        );
    }
};

//pdf download
export const pdfDownload = (url) => async (dispatch) => {

    dispatch(metaSlice.actions.requestForPdf());
    try {
        const response = await axiosInstance.get(
            `/api/v1/meta/pdf`,
            {
      
                headers: {
                    // "url": url
                }
            }
        );

        window.open(response?.data?.downloadUrl, "blank")

        dispatch(metaSlice.actions.successForPdf());
        dispatch(metaSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            metaSlice.actions.failureForPdf(
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