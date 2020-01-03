export const applicationReducer = (state={ error: false, flag: false }, action) => {
    const { payload, type } = action;
    switch(type) {
        case 'APPLICATION_SUCCESS':
            return {
                error: payload.error,
                flag: payload.flag,
            }
        case 'APPLICATION_FAILURE':
            return {
                error: payload.error,
                flag: payload.flag,
            }
        case 'APPLICATION_RESET':
            return {
                error: payload.error,
                flag: payload.flag,
            }
        default:
            return state
    }
}