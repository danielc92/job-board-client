import jobApi from '../api';

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
                error: error.response.data.error
            }
        })
    }
}