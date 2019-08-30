import jobApi from '../api';

export const loginUser = (email, password) => async (dispatch, getState) => {
    const data = { email, password }
    
    try {
        const response = await jobApi.post('api/auth/login', data)
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
                message: "Incorrect credentials were supplied."
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