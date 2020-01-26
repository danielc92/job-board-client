import jobApi from '../api'
import { TOKEN_NAME } from '../constants'
import { handleApiError } from '../helpers/api'
export const getApplicationEmployerList = query => async (
  dispatch,
  getState
) => {
  try {
    await new Promise(r => setTimeout(r, 500))
    const { job_id } = query
    const token = localStorage.getItem(TOKEN_NAME)
    const config = { headers: { 'x-access-token': token } }
    const url = `application/list/employer?job_id=${job_id}`
    const response = await jobApi.get(url, config)
    dispatch({
      type: 'GET_APPLICATION_LIST_EMPLOYER_SUCCESS',
      payload: {
        error: false,
        ...response.data.results,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_APPLICATION_LIST_EMPLOYER_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}
