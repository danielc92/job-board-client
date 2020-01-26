export const jobListEmployerReducer = (state = { error: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_JOB_LIST_EMPLOYER_SUCCESS':
      return payload
    case 'GET_JOB_LIST_EMPLOYER_FAILURE':
      return payload
    default:
      return state
  }
}
