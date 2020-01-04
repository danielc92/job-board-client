export const applicationUpdateReducer = (state={ error: false, flag: false }, action) => {
    const { payload, type } = action;
    switch(type) {
        case 'APPLICATION_UPDATE_SUCCESS':
            return {...payload}
        case 'APPLICATION_UPDATE_FAILURE':
            return {...payload}
        case 'APPLICATION_UPDATE_RESET':
            return {...payload}
        default:
            return state
    }
}