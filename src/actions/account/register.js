import jobApi from '../../api'
import { handleApiError } from '../../helpers/api'

export const registerUser = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'REGISTER_LOADING',
      payload: {
        loading: true,
      },
    })
    const response = await jobApi.post('auth/register', payload)
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: {
        message: response.data.message,
        showModal: true,
        modalHeader: 'Success',
      },
    })
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
        showModal: true,
        modalHeader: 'An error occured',
      },
    })
  }
}

export const resetRegisterState = payload => async (dispatch, getState) => {
  dispatch({
    type: 'REGISTER_RESET',
    payload: {
      showModal: false,
    },
  })
}
