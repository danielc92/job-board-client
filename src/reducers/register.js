export const registerReducer = (state={ error: false, success: false, message: null}, action) => {
    
    const { type, payload } = action

    switch(type) {
        case 'REGISTER_SUCCESS':
            return {
                flag: true,
                error: false,
                message: payload.data.message
            }
        case 'REGISTER_FAILURE':
            return {
                flag: false,
                error: true,
                message: payload.error
            }
        case 'REGISTER_RESET':
            return {
                flag: false,
                error: false,
            }
        default:
            return state
    }
}