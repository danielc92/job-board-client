export const resetPasswordEmailReducer = (
  state = { error: false, modalIsClosed: true },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case 'SEND_RESET_PASSWORD_EMAIL_LOADING':
      return payload
    case 'SEND_RESET_PASSWORD_EMAIL_SUCCESS':
      return payload
    case 'SEND_RESET_PASSWORD_EMAIL_FAILURE':
      return payload
    case 'SEND_RESET_PASSWORD_EMAIL_RESET':
      return payload
    default:
      return state
  }
}
