import jobApi from '../api';

export const getJobList = () => async (dispatch, getState) => {
    try {
        const response = await jobApi.get('job/list')

        dispatch({
            type: "GET_JOB_LIST_SUCCESS",
            payload: {
                data: response.data.results
            }
        })
    }
    catch (error) {
        dispatch({
            type: "GET_JOB_LIST_FAILURE",
            payload: {
                error: error.response.data.error
            }

        })
    }
}