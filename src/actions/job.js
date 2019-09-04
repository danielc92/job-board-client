import jobApi from '../api';

export const createJob = (payload) => async (dispatch, getState) => {
    try {
        const response = await jobApi.post('job', payload)
        dispatch({
            type: "JOB_CREATE_SUCCESS",
            payload: {
                data: response.data
            }
        })
    } 
    catch (error) {
        dispatch({
            type: "JOB_CREATE_FAILURE",
            payload: {
                error: error.response.data.error
            }
        })
    }
}