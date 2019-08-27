export const authReducer = (state={}, action) => {

    const { type, payload } = action;

    switch(type) {
        case "LOGIN":
            return {
                isAuthenticated: payload.value,
                user: "test-user"
            }
        case "LOGOUT":
            return {
                isAuthenticated: payload.value,
                user: "test-user"
            }
        default:
            return {
                isAuthenticated: false,
                user: "test-user"
            }
    }
}

