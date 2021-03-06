export const careerProfileReducer = (state = { error: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_CAREER_PROFILE_SUCCESS':
      return payload
    case 'GET_CAREER_PROFILE_FAILURE':
      return payload
    case 'UPDATE_CAREER_PROFILE_SUCCESS':
      return { ...payload, data: { ...state.data, ...payload.patch } }
    default:
      return state
  }
}

export const careerProfileEmployerReducer = (
  state = { error: false },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_CAREER_PROFILE_EMPLOYER_SUCCESS':
      return payload
    case 'GET_CAREER_PROFILE_EMPLOYER_FAILURE':
      return payload
    default:
      return state
  }
}
