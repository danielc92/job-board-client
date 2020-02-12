import jobApi from '../api'
import { handleApiError } from '../helpers/api'

export const sendResetPassword = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'SEND_RESET_PASSWORD_LOADING',
      payload: {
        loading: true,
      },
    })
    const response = await jobApi.post('auth/send-reset-password', payload)
    dispatch({
      type: 'SEND_RESET_PASSWORD_SUCCESS',
      payload: {
        error: false,
        message: response.data.message,
      },
    })
  } catch (error) {
    dispatch({
      type: 'SEND_RESET_PASSWORD_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}

export const resetSendResetPassword = payload => async (dispatch, getState) => {
  dispatch({
    type: 'SEND_RESET_PASSWORD_RESET',
    payload: { error: false, flag: true },
  })
}
