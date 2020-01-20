export const profileReducer = (state={ error: false, loaded: false}, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'GET_USER_DETAIL_FETCHING':
            return payload
        case 'GET_USER_DETAIL_SUCCESS':
            return payload
        case 'GET_USER_DETAIL_FAILURE':
            return payload
        default:
            return state
    }
}