import jobApi from 'api'
import { handleApiError } from 'helpers/api'

export const sendAccountActivation = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ACTIVATION_LOADING',
      payload: {
        loading: true,
        message: 'Please wait while we try to activate your account.',
        header: 'Processing',
      },
    })
    const response = await jobApi.post(`auth/activate?token=${payload.token}`)
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

export const resetAccountActivation = payload => async (dispatch, getState) => {
  dispatch({
    type: 'ACTIVATION_RESET',
    payload: { error: false, modalIsClosed: true },
  })
}
