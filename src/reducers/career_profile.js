export const careerProfileReducer = (state = { error: false }, action) => {
    
    const { type, payload } = action;
    
    switch (type) {
        case 'GET_CAREER_PROFILE_SUCCESS':
            return payload
        case 'GET_CAREER_PROFILE_FAILURE':
            return payload
        default:
            return state
    }
}