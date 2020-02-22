export const feedbackReducer = (
  state = { error: false, modalIsClosed: true },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case 'CREATE_FEEDBACK_LOADING':
      return payload
    case 'CREATE_FEEDBACK_SUCCESS':
      return payload
    case 'CREATE_FEEDBACK_FAILURE':
      return payload
    case 'CREATE_FEEDBACK_RESET':
      return payload
    default:
      return state
  }
}
