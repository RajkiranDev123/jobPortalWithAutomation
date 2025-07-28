import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        applications: [],
        loading: false,
        error: null,
        message: null,
        pageCount: 1
    },
    reducers: {
        // employer will get all application (applied jobs) for jobs he posted
        requestForAllApplications(state, action) {
            state.loading = true;
            state.error = null;
        },
        successForAllApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.applications = action.payload;
        },
        failureForAllApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        // jon seeker will get all only his applied job :my
        requestForMyApplications(state, action) {
            state.loading = true;
            state.error = null;
        },
        successForMyApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.applications = action.payload;
        },
        setPageCount(state, action) {

            state.pageCount = action.payload;
        },
        failureForMyApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        // job seeker with post application (apply to a job)
        requestForPostApplication(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        successForPostApplication(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        failureForPostApplication(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        // delete job by the employer
        requestForDeleteApplication(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        successForDeleteApplication(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        failureForDeleteApplication(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        clearAllErrors(state, action) {
            state.error = null;
            state.applications = state.applications;
        },
        resetApplicationSlice(state, action) {
            state.error = null;
            state.applications = state.applications;
            state.message = null;//imp
            state.loading = false;
        },
    },
});

export const fetchEmployerApplications = (page) => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForAllApplications());
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/application/employer/getall`,
            {
                withCredentials: true,
                headers:{
                    "page":page
                }
            }
        );
        dispatch(applicationSlice.actions.successForAllApplications(response.data.applications));
        dispatch(applicationSlice.actions.setPageCount(response.data.pageCount));

        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            applicationSlice.actions.failureForAllApplications(
                error.response.data.message
            )
        );
    }
};


export const fetchJobSeekerApplications = (page) => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForMyApplications());
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/application/jobseeker/getall`,
            {
                withCredentials: true,
                headers: {
                    "page": page
                }
            }
        );
        dispatch(applicationSlice.actions.successForMyApplications(response.data.applications));
        dispatch(applicationSlice.actions.setPageCount(response.data.pageCount));

        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            applicationSlice.actions.failureForMyApplications(
                error.response.data.message
            )
        );
    }
};

////////////// job seeker with post application (apply to a job) ///////////////////////////////////

export const postApplication = (data, jobId) => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForPostApplication());
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/application/post/${jobId}`,
            data,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(
            applicationSlice.actions.successForPostApplication(response.data.message)
        );
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            applicationSlice.actions.failureForPostApplication(
                error.response.data.message
            )
        );
    }
};

export const deleteApplication = (id) => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForDeleteApplication());
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_BASE_URL}/api/v1/application/delete/${id}`,
            { withCredentials: true }
        );
        dispatch(applicationSlice.actions.successForDeleteApplication(response?.data?.message));
        // dispatch(fetchJobSeekerApplications(1));

        dispatch(clearAllApplicationErrors());
    } catch (error) {
        dispatch(
            applicationSlice.actions.failureForDeleteApplication(
                error.response.data.message
            )
        );
    }
};

export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;