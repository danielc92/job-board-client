export const registerReducer = (state={ error: false, success: false, message: null}, action) => {
    
    const { type, payload } = action

    switch(type) {
        case 'REGISTER_SUCCESS':
            return {
                success: true,
                error: false,
                message: "You have successfully registered an account."
            }
        case 'REGISTER_FAILURE':
            return {
                success: false,
                error: true,
                message: payload.error
            }
        default:
            return state
    }
}