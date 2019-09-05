export const jobListReducer = (state={ error: false, data: []}, action) => {
    const { type, payload } = action;

    switch(type) {

        case 'GET_JOB_LIST_SUCCESS':
            console.log(payload)
            return {
                error: false,
                data: payload.data
            }
        case 'GET_JOB_LIST_FAILURE':
            return {
                error: true,
                data: [],
                error_message: payload.error
            }
        default:
            return state
    }
}