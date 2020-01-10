export const jobStatusUpdateReducer = (state={ error: false, flag: false }, action) => {
    const { payload, type } = action;
    switch(type) {
        case 'JOB_STATUS_UPDATE_SUCCESS':
            return {...payload}
        case 'JOB_STATUS_UPDATE_FAILURE':
            return {...payload}
        case 'JOB_STATUS_UPDATE_RESET':
            return {...payload}
        default:
            return state
    }
}