import jobApi from '../api';
import { TOKEN_NAME } from '../constants';

export const createJob = (payload) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem(TOKEN_NAME)
        const config = { headers: { 'x-access-token' : token } }
        const response = await jobApi.post('job', payload, config)
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