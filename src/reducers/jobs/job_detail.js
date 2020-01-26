export const jobDetailReducer = (state = { error: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_JOB_DETAIL_SUCCESS':
      return payload
    case 'GET_JOB_DETAIL_FAILURE':
      return payload
    default:
      return state
  }
}
