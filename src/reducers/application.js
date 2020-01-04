export const applicationReducer = (state={ error: false, flag: false }, action) => {
    const { payload, type } = action;
    switch(type) {
        case 'APPLICATION_SUCCESS':
            return {...payload}
        case 'APPLICATION_FAILURE':
            return {...payload}
        case 'APPLICATION_RESET':
            return {...payload}
        default:
            return state
    }
}