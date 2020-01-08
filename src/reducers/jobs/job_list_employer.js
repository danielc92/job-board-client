export const jobListEmployerReducer = (state={ error: false, data: {}}, action) => {
    const { type, payload } = action;

    switch(type) {

        case 'GET_JOB_LIST_EMPLOYER_SUCCESS':
            return {
                error: false,
                data: payload,
            }
        case 'GET_JOB_LIST_EMPLOYER_FAILURE':
            return {
                error: true,
                data: {},
                error_message: payload.error,
            }
        default:
            return state
    }
}