import jobApi from '../api';
import { TOKEN_NAME } from '../constants';
import { handleApiError } from '../helpers/api';


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
                error: true,
                message: handleApiError(error),
            }
        })
    }
}

export const resetJob = () => async (dispatch, getState) => {
    dispatch({
        type: "JOB_CREATE_RESET",
        payload: null
    })
}

export const getJob = (id) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem(TOKEN_NAME)
        const config = { headers: { 'x-access-token' : token } }
        const response = await jobApi.get(`job?id=${id}`, null, config)
        console.log(response)
        dispatch({
            type: "JOB_FETCH_SUCCESS",
            payload: {
                error: false,
                data: response.data.results,
            }
        })
    } 
    catch (error) {
        console.log(error)
        dispatch({
            type: "JOB_FETCH_FAILURE",
            payload: {
                error: true,
                message: handleApiError(error),
            }
        })
    }
}