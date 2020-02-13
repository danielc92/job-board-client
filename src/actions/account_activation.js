import jobApi from '../api'
import { handleApiError } from '../helpers/api'

export const sendResetPasswordEmail = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ACTIVATION_LOADING',
      payload: {
        loading: true,
        header: 'Please wait while we try to activate your account.',
      },
    })
    const response = await jobApi.post('auth/send-reset-password', payload)
    dispatch({
      type: 'ACTIVATION_SUCCESS',
      payload: {
        error: false,
        message: response.data.message,
        header: 'Success',
      },
    })
  } catch (error) {
    dispatch({
      type: 'ACTIVATION_FAILURE',
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
    type: 'ACTIVATION_RESET',
    payload: { error: false, modalIsClosed: true },
  })
}
