export const accountActivationReducer = (
  state = { error: false, modalIsClosed: true },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case 'ACTIVATION_LOADING':
      return payload
    case 'ACTIVATION_FAILURE':
      return payload
    case 'ACTIVATION_SUCCESS':
      return payload
    case 'ACTIVATION_RESET':
      return payload
    default:
      return state
  }
}
