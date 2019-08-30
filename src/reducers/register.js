export const registerReducer = (state={}, action) => {
    
    const { type, payload } = action

    switch(type) {
        case 'REGISTER_SUCCESS':
            return {
                error: false,
                message: "You have successfully registered an account."
            }
        case 'REGISTER_FAILURE':
            return {
                error: true,
                message: payload.error
            }
        default:
            return state
    }
}