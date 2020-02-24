import jobApi from 'api'
import { handleApiError } from 'helpers/api'

export const sendResetPasswordRequest = payload => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: 'SEND_RESET_PASSWORD_LOADING',
      payload: {
        loading: true,
        header: 'Processing',
        message: 'Please wait while we process your request.',
      },
    })
    const response = await jobApi.post('auth/reset-password', payload)
    dispatch({
      type: 'SEND_RESET_PASSWORD_SUCCESS',
      payload: {
        error: false,
        message: response.data.message,
        header: 'Success',
      },
    })
  } catch (error) {
    dispatch({
      type: 'SEND_RESET_PASSWORD_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
        header: 'An error has occured',
      },
    })
  }
}

export const resetPasswordResetRequest = payload => async (
  dispatch,
  getState
) => {
  dispatch({
    type: 'SEND_RESET_PASSWORD_RESET',
    payload: { error: false, modalIsClosed: true },
  })
}
