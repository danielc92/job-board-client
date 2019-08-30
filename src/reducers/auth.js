import jwt_decode from 'jwt-decode';

const TOKEN_NAME = 'JOBTOKEN';

export const authReducer = (state={}, action) => {

    const { type, payload } = action;

    switch(type) {
        case "LOGIN_SUCCESS":
            localStorage.setItem(TOKEN_NAME, payload.token)
            const decoded = jwt_decode(payload.token)
            return {
                isAuthenticated: true,
                error: false,
                error_message: null,
                user: { ...decoded }
                
            }

        case "LOGIN_FAILURE":
            return {
                isAuthenticated: false,
                error: true,
                error_message: payload.error,
                user: {}
            }

        case "LOGOUT_SUCCESS":
            localStorage.removeItem(TOKEN_NAME)
            return {
                isAuthenticated: payload.value,
                error: false,
                error_message: null,
                user: {}
            }
            
        default:
            return {
                isAuthenticated: false,
                error: false,
                error_message: null,
                user: {}
            }
    }
}

