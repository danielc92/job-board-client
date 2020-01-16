import jobApi from '../api';
import { handleApiError } from '../helpers/api';

export const registerUser = (payload) => async (dispatch, getState) => {

    try {
        const response = await jobApi.post('auth/register', payload)
        dispatch({
            type: "REGISTER_SUCCESS",
            payload: {
                data: response.data
            }
        })
    }
    catch (error) {
        dispatch({
            type: "REGISTER_FAILURE",
            payload: {
                error: true,
                message: handleApiError(error),
            }
        })
    }
}

export const resetRegisterState = (payload) => async (dispatch, getState)  => {
    dispatch({
        type: "REGISTER_RESET"
    })
}