import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        loading: false,
        error: null,
        message: null,
        singleJob: {},
        myJobs: [],
        pageCount: null
    },
    reducers: {
        requestForAllJobs(state, action) {
            state.loading = true;
            state.error = null;
        },
        successForAllJobs(state, action) {
            state.loading = false;
            state.jobs = action.payload;
            state.error = null;

        },
        setPageCount(state, action) {

            state.pageCount = action.payload
        },
        failureForAllJobs(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        /////////////////////////////////////////////
        requestForSingleJob(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        successForSingleJob(state, action) {
            state.loading = false;
            state.error = null;
            state.singleJob = action.payload;
        },
        failureForSingleJob(state, action) {
            state.singleJob = state.singleJob;
            state.error = action.payload;
            state.loading = false;
        },
        ///////////////////// by employer /////////////////////////////
        requestForPostJob(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        successForPostJob(state, action) {
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        failureForPostJob(state, action) {
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        //////////////////////////////////////////////////////
        requestForDeleteJob(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        successForDeleteJob(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        failureForDeleteJob(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        /////////////////// get jobs posted by employer ////////////////
        requestForMyJobs(state, action) {
            state.loading = true;
            state.myJobs = [];
            state.error = null;
        },
        successForMyJobs(state, action) {
            state.loading = false;
            state.myJobs = action.payload;
            state.error = null;
        },
        failureForMyJobs(state, action) {
            state.loading = false;
            state.myJobs = state.myJobs;
            state.error = action.payload;
        },
        //////////////////////////////////////
        clearAllErrors(state, action) {
            state.error = null;
            state.jobs = state.jobs;
        },
        resetJobSlice(state, action) {
            state.error = null;
            state.jobs = state.jobs;
            state.loading = false;
            state.message = null;
            state.myJobs = state.myJobs;
            state.singleJob = {};
        },
    },
});

export const fetchJobs = (city, niche, searchKeyword = "", page) => async (dispatch) => {
    try {
        dispatch(jobSlice.actions.requestForAllJobs());
        let link = `${import.meta.env.VITE_BASE_URL}/api/v1/job/getall?`;

        let queryParams = [];

        if (searchKeyword) {
            queryParams.push(`searchKeyword=${searchKeyword}`);
        }
        if (city && city !== "All") {
            queryParams.push(`city=${city}`);
        }

        /***************************************************/
        /* BUG No.3 */
        if (city && city === "All") {
            queryParams = [];
            if (searchKeyword) {
                queryParams.push(`searchKeyword=${searchKeyword}`);
            }
        }
        /***************************************************/

        if (niche) {
            queryParams.push(`niche=${niche}`);
        }

        /***************************************************/
        /* BUG No.4 */
        if (niche && niche === "All") {
            queryParams = [];
            if (searchKeyword) {
                queryParams.push(`searchKeyword=${searchKeyword}`);
            }
            if (city && city !== "All") {
                queryParams.push(`city=${city}`);
            }
        }
        /***************************************************/

        link += queryParams.join("&");
        const response = await axios.get(
            link,
            {
                withCredentials: true,
                headers: {

                    "page": page,

                }
            }
        );
        dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
        dispatch(jobSlice.actions.setPageCount(response.data.pageCount));

        dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message));
    }
};


// usefull to get job details when job seeker will apply to a particular job using job id
export const fetchSingleJob = (jobId) => async (dispatch) => {
    dispatch(jobSlice.actions.requestForSingleJob());
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/job/get/${jobId}`,
            { withCredentials: true }
        );
        dispatch(jobSlice.actions.successForSingleJob(response?.data?.job));
        console.log("single job", response?.data?.job)

        dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(jobSlice.actions.failureForSingleJob(error?.response?.data?.message));
    }
};

export const postJob = (data) => async (dispatch) => {
    dispatch(jobSlice.actions.requestForPostJob());
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/job/post`,
            data,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(jobSlice.actions.successForPostJob(response.data.message));
        dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(jobSlice.actions.failureForPostJob(error.response.data.message));
    }
};

////////////////// get jobs posted by an employer //////////////////////
export const getMyJobs = (page) => async (dispatch) => {
    dispatch(jobSlice.actions.requestForMyJobs());
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/job/getmyjobs`,
            {
                withCredentials: true,
                headers: {
                    "page": page
                }
            }
        );
        dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
        dispatch(jobSlice.actions.setPageCount(response.data.pageCount));

        dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(jobSlice.actions.failureForMyJobs(error.response.data.message));
    }
};

//////////////////////// only by employer
export const deleteJob = (id) => async (dispatch) => {
    dispatch(jobSlice.actions.requestForDeleteJob());
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_BASE_URL}/api/v1/job/delete/${id}`,
            { withCredentials: true }
        );
        dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
        dispatch(clearAllJobErrors());
    } catch (error) {
        dispatch(jobSlice.actions.failureForDeleteJob(error.response.data.message));
    }
};

export const clearAllJobErrors = () => (dispatch) => {
    dispatch(jobSlice.actions.clearAllErrors());
};

export const resetJobSlice = () => (dispatch) => {
    dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;