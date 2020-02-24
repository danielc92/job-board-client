import jobApi from 'api'
import { handleApiError } from 'helpers/api'
import { getConfig } from 'helpers/api'

export const createFeedback = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'CREATE_FEEDBACK_LOADING',
      payload: {
        loading: true,
        header: 'Processing',
        message: 'Please wait while we process your request.',
      },
    })
    const config = getConfig()
    console.log(config)
    const response = await jobApi.post('feedback', payload, config)
    dispatch({
      type: 'CREATE_FEEDBACK_LOADING',
      payload: {
        error: false,
        message: response.data.message,
        header: 'Success',
      },
    })
  } catch (error) {
    dispatch({
      type: 'CREATE_FEEDBACK_LOADING',
      payload: {
        error: true,
        message: handleApiError(error),
        header: 'An error has occured',
      },
    })
  }
}

export const resetCreateFeedback = payload => async (dispatch, getState) => {
  dispatch({
    type: 'CREATE_FEEDBACK_RESET',
    payload: { error: false, modalIsClosed: true },
  })
}
