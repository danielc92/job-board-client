export const sendResetPasswordReducer = (
  state = { error: false, flag: true },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case 'SEND_RESET_PASSWORD_LOADING':
      return payload
    case 'SEND_RESET_PASSWORD_SUCCESS':
      return payload
    case 'SEND_RESET_PASSWORD_FAILURE':
      return payload
    case 'SEND_RESET_PASSWORD_RESET':
      return payload
    default:
      return state
  }
}
