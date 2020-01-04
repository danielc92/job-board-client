export const applicationListReducer = (state={error: false, data: []}, action) => {
    const { payload, type } = action;

    switch(type) {
        case 'GET_APPLICATION_LIST_SUCCESS':
            return payload
        case 'GET_APPLICATION_LIST_FAILURE':
            return payload
        default: 
            return state
    }
}