export const registerReducer = (state={ error: false, flag: false, message: ''}, action) => {
    
    const { type, payload } = action

    switch(type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                flag: true,
                error: false,
                message: payload.data.message
            }
        case 'REGISTER_FAILURE':
            return {
                ...state,
                flag: false,
                error: true,
                message: payload.error
            }
        case 'REGISTER_RESET':
            return {
                ...state,
                flag: false,
                error: false,
            }
        default:
            return state
    }
}