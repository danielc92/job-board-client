export const locationListReducer = (state=[], action) => {
    const { type, payload } = action;

    switch(type) {
        case 'GET_LOCATION_LIST_SUCCESS':
            return [...state, payload]
        case 'GET_LOCATION_LIST_FAILURE':
            return [...state, payload]
        default:
            return state
    }
}