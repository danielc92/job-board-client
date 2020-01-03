export const applicationReducer = (state={ error: false, flag: false}, action) => {
    const { payload, type } = action;
    const { flag, error } = payload;
    switch(type) {
        case 'APPLICATION_SUCCESS':
            return {
                flag,
                error,
            }
        case 'APPLICATION_FAILURE':
            return {
                flag,
                error,
            }
        case 'APPLICATION_RESET':
            return {
                error: false,
                flag: false,
            }
        default:
            return state
    }
}