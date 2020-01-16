export const benefitReducer = (state={ error: false, data: []}, action) => {
    const { payload, type } = action;

    switch(type) {
        case 'GET_BENEFIT_SUCCESS':
            return payload
        case 'GET_BENEFIT_FAILURE':
            return payload
        default:
            return state
    }
}