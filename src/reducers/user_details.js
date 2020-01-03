export const userDetailsReducer = (state=[], action) => {
    const { type, payload } = action;
    switch(type) {
        case 'FETCH_USER_DETAIL_SUCCESS':
            return [...state, payload]
        case 'FETCH_USER_DETAIL_FAILURE':
            return [...state, payload]
        default:
            return state
    }
}