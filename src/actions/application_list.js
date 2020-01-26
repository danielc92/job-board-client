import jobApi from '../api'
import { TOKEN_NAME } from '../constants'
import { handleApiError } from '../helpers/api'
import { objectToQueryStringParser } from '../helpers/query'

export const getApplicationList = object => async (dispatch, getState) => {
  try {
    await new Promise(r => setTimeout(r, 500))
    const queryString = objectToQueryStringParser(object)
    const token = localStorage.getItem(TOKEN_NAME)
    const config = { headers: { 'x-access-token': token } }
    const response = await jobApi.get(`application/list${queryString}`, config)

    dispatch({
      type: 'GET_APPLICATION_LIST_SUCCESS',
      payload: {
        error: false,
        ...response.data.results,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_APPLICATION_LIST_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}
