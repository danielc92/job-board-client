export const benefitReducer = (state={ error: false, data: []}, action) => {
    const { payload, type } = action;

    switch(type) {
        case 'GET_BENEFIT_SUCCESS':
            return {
                error: false,
                data: payload.data
            }
        case 'GET_BENEFIT_FAILURE':
            return {
                error: true,
                error_message: payload.error
            }
        default:
            return state
    }
}