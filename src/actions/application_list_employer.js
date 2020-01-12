import jobApi from '../api';
import { TOKEN_NAME } from '../constants';

export const getApplicationList = (query) => async (dispatch, getState) => {
    try {
        const { job_id } = query;
        const token = localStorage.getItem(TOKEN_NAME)
        const config = { headers: { 'x-access-token' : token } }
        const url = `application/list/employer?job_id=${job_id}`
        const response = await jobApi.get(url, null, config)
        dispatch({
            type: "GET_APPLICATION_LIST_EMPLOYER_SUCCESS",
            payload: {
                error: false,
                data: response.data.results,
            }
        })
    } 
    catch (error) {
        dispatch({
            type: "GET_APPLICATION_LIST_EMPLOYER_FAILURE",
            payload: {
                error: true,
                message: error.response.data.error,
                data: [],
            }
        })
    }
}
