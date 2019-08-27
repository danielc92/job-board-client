export const authReducer = (state={}, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                isAuthenticated: action.payload.value,
                user: "test-user"
            }
        case "LOGOUT":
            return {
                isAuthenticated: action.payload.value,
                user: "test-user"
            }
        return state
    }
}

