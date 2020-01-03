import jobApi from '../api';
import { TOKEN_NAME } from '../constants';

export const createApplication = (payload) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem(TOKEN_NAME)
        const config = { headers: { 'x-access-token' : token } }
        const response = await jobApi.post('application', payload, config)
        dispatch({
            type: "APPLICATION_SUCCESS",
            payload: {
                error: false,
                flag: true,
            }
        })
    } 
    catch (error) {
        dispatch({
            type: "APPLICATION_FAILURE",
            payload: {
                error: true,
                flag: false,
                errorMessage: error.response.data.error
            }
        })
    }
}

export const resetApplication = () => async (dispatch, getState) => {
    dispatch({
        type: "APPLICATION_RESET",
        payload: {
            error: false,
            flag: false,
        }
    })
}