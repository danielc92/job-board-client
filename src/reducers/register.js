export const registerReducer = (state = { error: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case 'REGISTER_LOADING':
      return payload
    case 'REGISTER_SUCCESS':
      return payload
    case 'REGISTER_FAILURE':
      return payload
    case 'REGISTER_RESET':
      return payload
    default:
      return state
  }
}
