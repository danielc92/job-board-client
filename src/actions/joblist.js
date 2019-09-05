import jobApi from '../api';

export const getJobList = () => async (dispatch, getState) => {
    try {
        const response = await jobApi.get('job/list')
        console.log(response.data)
    }
    catch (error) {
        dispatch({
            type: "GET_JOB_LIST_FAILURE",

        })
    }
}