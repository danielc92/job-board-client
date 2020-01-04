import jobApi from '../api';
import { TOKEN_NAME } from '../constants';

export const updateApplicationStatus = (payload) => async (dispatch, getState) => {
    try {
        const { job_id, applicant_id, status } = payload; 
        const token = localStorage.getItem(TOKEN_NAME);
        const config = { headers: { 'x-access-token' : token } };
        const url = `application?job_id=${job_id}&applicant_id${applicant_id}&status=${status}`;
        const response = await jobApi.patch(url, null, config)
        console.log('Response from application update ', response)
        dispatch({
            type: "APPLICATION_UPDATE_SUCCESS",
            payload: {
                error: false,
                flag: true,
            }
        })
    } 
    catch (error) {
        dispatch({
            type: "APPLICATION_UPDATE_FAILURE",
            payload: {
                error: true,
                flag: false,
                errorMessage: error.response.data.error
            }
        })
    }
}

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

export const resetApplicationUpdate = () => async (dispatch, getState) => {
    dispatch({
        type: "APPLICATION_UPDATE_RESET",
        payload: {
            error: false,
            flag: false,
        }
    })
}