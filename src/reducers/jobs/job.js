export const jobReducer = (state = { error: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case 'JOB_CREATE_LOADING':
      return payload
    case 'JOB_CREATE_SUCCESS':
      return payload
    case 'JOB_CREATE_RESET':
      return payload
    case 'JOB_CREATE_FAILURE':
      return payload

    default:
      return state
  }
}
