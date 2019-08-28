import jobApi from '../api';

export const loginUser = () => async (dispatch, getState) => {
    const data = { 
        email : "test@test.com", 
        password: "12345a678"}
    
    try {
        const response = await jobApi.post('api/auth/login', data)
        dispatch({
            type: "LOGGED IN",
            payload: {
                value: true,
                token: response.data.token
            }
        })
    }
    catch(error) {
        dispatch({
            type: "LOGIN FAILURE",
            payload: {
                message: "Incorrect credentials were supplied."
            }
        })
    }
}

export function logoutUser() {
    return {
        type: 'LOGGED OUT',
        payload: {
            value: false
        }
    }
}