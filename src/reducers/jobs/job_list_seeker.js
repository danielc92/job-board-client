export const jobListReducer = (state = { error: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_JOB_LIST_SUCCESS':
      return payload
    case 'GET_JOB_LIST_FAILURE':
      return payload
    case 'RESET_JOB_LIST':
      return payload
    default:
      return state
  }
}
