export const jobDetailReducer = (state=[], action) => {
    const { type, payload } = action;

    switch(type) {

        case 'JOB_FETCH_SUCCESS':
            return [...state, payload.data]
        case 'JOB_FETCH_FAILURE':
            return [...state, payload.data]
        default:
            return state
    }
}