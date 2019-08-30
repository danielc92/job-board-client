import jobApi from '../api';

export const loginUser = (email, password) => async (dispatch, getState) => {
    
    const payload = { email, password }
    
    try {
        const response = await jobApi.post('api/auth/login', payload)
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
                token: response.data.token['x-auth-token']
            }
        })
    }
    catch(error) {
        dispatch({
            type: "LOGIN_FAILURE",
            payload: {
                error: error.response.data.error
            }
        })
    }
}

export function logoutUser() {
    return {
        type: 'LOGOUT_SUCCESS',
        payload: {
            value: false
        }
    }
}

export const registerUser = (email, password, first_name, last_name) => async (dispatch, getState) => {
    
    const payload = { email, password, first_name, last_name }

    try {
        const response = await jobApi.post('api/auth/register', payload)
        dispatch({
            type: "REGISTER_SUCCESS",
            payload: {
                value: true
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