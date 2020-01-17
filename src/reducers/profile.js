export const profileReducer = (state={ error: false, loaded: false}, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'FETCH_USER_DETAIL_SUCCESS':
            return payload
        case 'FETCH_USER_DETAIL_FAILURE':
            return payload
        default:
            return state
    }
}