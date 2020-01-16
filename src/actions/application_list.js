import jobApi from '../api';
import { TOKEN_NAME } from '../constants';
import { handleApiError } from '../helpers/api';

export const getApplicationList = (query) => async (dispatch, getState) => {
    try {
        const { applicant_id } = query;
        const token = localStorage.getItem(TOKEN_NAME)
        const config = { headers: { 'x-access-token' : token } }
        const url = `application/list?applicant_id=${applicant_id}`
        const response = await jobApi.get(url, null, config)
        dispatch({
            type: "GET_APPLICATION_LIST_SUCCESS",
            payload: {
                error: false,
                data: response.data.results,
            }
        })
    } 
    catch (error) {
        dispatch({
            type: "GET_APPLICATION_LIST_FAILURE",
            payload: {
                error: true,
                message: handleApiError(error),
                data: [],
            }
        })
    }
}
