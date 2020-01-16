export const skillReducer = (state={ error: false, data: []}, action) => {
    const { payload, type } = action;

    switch(type) {
        case 'GET_SKILLS_SUCCESS':
            return payload
        case 'GET_SKILLS_FAILURE':
            return payload
        default:
            return state
    }
}