export const skillReducer = (state={ error: false, data: []}, action) => {
    const { payload, type } = action;

    switch(type) {
        case 'GET_SKILLS_SUCCESS':
            return {
                error: false,
                data: payload.data
            }
        case 'GET_SKILLS_FAILURE':
            return {
                error: true,
                error_message: payload.error
            }
        default:
            return state
    }
}