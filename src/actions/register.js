import jobApi from '../api';

export const registerUser = (email, password, first_name, last_name) => async (dispatch, getState) => {
    
    const payload = { email, password, first_name, last_name }

    try {
        const response = await jobApi.post('api/auth/register', payload)
        console.log(response)
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