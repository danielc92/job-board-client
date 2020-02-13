import jobApi from '../api'
import { handleApiError } from '../helpers/api'

export const sendResetPasswordEmail = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'SEND_RESET_PASSWORD_EMAIL_LOADING',
      payload: {
        loading: true,
        header: 'Processing',
        message: 'Please wait while we process your request.',
      },
    })
    const response = await jobApi.post('auth/send-reset-password', payload)
    dispatch({
      type: 'SEND_RESET_PASSWORD_EMAIL_SUCCESS',
      payload: {
        error: false,
        message: response.data.message,
        header: 'Success',
      },
    })
  } catch (error) {
    dispatch({
      type: 'SEND_RESET_PASSWORD_EMAIL_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
        header: 'An error has occured',
      },
    })
  }
}

export const resetSendPasswordEmail = payload => async (dispatch, getState) => {
  dispatch({
    type: 'SEND_RESET_PASSWORD_EMAIL_RESET',
    payload: { error: false, modalIsClosed: true },
  })
}
