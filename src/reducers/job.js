export const jobReducer = (state={ error: false, data: {}}, action) => {
    const { type, payload } = action;

    switch(type) {

        case 'JOB_CREATE_SUCCESS':
            return {
                error: false,
                data: payload.data
            }
        case 'JOB_CREATE_FAILURE':
            return {
                error: true,
                error_message: payload.error,
                data: {}
            }
        default:
            return state
    }
}