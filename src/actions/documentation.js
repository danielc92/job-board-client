import jobApi from 'api'
import { handleApiError, getConfig } from 'helpers/api'

export const getDocumentation = () => async (dispatch, getState) => {
  const config = getConfig()
  dispatch({
    type: 'GET_DOCUMENTATION_LOADING',
    payload: {
      loading: true,
      error: false,
    },
  })
  await new Promise(r => setTimeout(r, 250))
  try {
    const response = await jobApi.get('documentation/list', config)

    dispatch({
      type: 'GET_DOCUMENTATION_SUCCESS',
      payload: {
        data: response.data.results,
        error: false,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_DOCUMENTATION_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}
