export const documentationReducer = (state = { error: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_DOCUMENTATION_LOADING':
      return payload
    case 'GET_DOCUMENTATION_SUCCESS':
      return payload
    case 'GET_DOCUMENTATION_FAILURE':
      return payload
    default:
      return state
  }
}
