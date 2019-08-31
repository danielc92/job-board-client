export const registerReducer = (state={ error: false, success: false, message: null}, action) => {
    
    const { type, payload } = action

    switch(type) {
        case 'REGISTER_SUCCESS':
            return {
                success: true,
                error: false,
                message: payload.data.message
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