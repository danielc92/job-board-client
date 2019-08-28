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
                isAuthenticated: true
            }
        case "LOGOUT_SUCCESS":
            localStorage.removeItem(TOKEN_NAME)
            return {
                isAuthenticated: payload.value,
                user: {
                    email: null,
                    exp: null,
                    iat: null,
                    _id: null
                }
            }
        default:
            return {
                isAuthenticated: false,
                user: {
                    email: null,
                    exp: null,
                    iat: null,
                    _id: null
                }
            }
    }
}

