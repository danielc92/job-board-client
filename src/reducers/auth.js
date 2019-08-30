import jwt_decode from 'jwt-decode';

const TOKEN_NAME = 'JOBTOKEN';

export const authReducer = (state={}, action) => {

    const { type, payload } = action;

    switch(type) {
        case "LOGIN_SUCCESS":
            localStorage.setItem(TOKEN_NAME, payload.token)
            const decoded = jwt_decode(payload.token)
            return {
                user: { ...decoded },
                error: false,
                isAuthenticated: true
            }
        case "LOGIN_FAILURE":
            return {
                isAuthenticated: false,
                error: true,
                user: {}
            }
        case "LOGOUT_SUCCESS":
            localStorage.removeItem(TOKEN_NAME)
            return {
                isAuthenticated: payload.value,
                error: false,
                user: {}
            }
        default:
            return {
                isAuthenticated: false,
                error: false,
                user: {}
            }
    }
}

