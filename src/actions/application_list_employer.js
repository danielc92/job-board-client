import jobApi from 'api'
import { handleApiError, getConfig } from 'helpers/api'
export const getApplicationEmployerList = query => async (
  dispatch,
  getState
) => {
  try {
    await new Promise(r => setTimeout(r, 500))
    const { job_id } = query
    const config = getConfig()
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
