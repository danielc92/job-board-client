export const jobDetailReducer = (
  state = { error: false, data: null },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case 'JOB_FETCH_SUCCESS':
      return payload
    case 'JOB_FETCH_FAILURE':
      return payload
    default:
      return state
  }
}
