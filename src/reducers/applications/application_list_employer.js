export const applicationListEmployerReducer = (state={error: false, data: []}, action) => {
    const { payload, type } = action;

    switch(type) {
        case 'GET_APPLICATION_LIST_EMPLOYER_SUCCESS':
            return payload
        case 'GET_APPLICATION_LIST_EMPLOYER_FAILURE':
            return payload
        default: 
            return state
    }
}