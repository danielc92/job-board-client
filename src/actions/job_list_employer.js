import jobApi from '../api'
import { objectToQueryStringParser } from '../helpers/query'
import { handleApiError, getConfig } from '../helpers/api'

export const getJobListForEmployer = object => async (dispatch, getState) => {
  try {
    await new Promise(r => setTimeout(r, 500))
    let queryString = objectToQueryStringParser(object)
    const url = `job/list/employer${queryString}`
    const config = getConfig()
    const response = await jobApi.get(url, config)
    dispatch({
      type: 'GET_JOB_LIST_EMPLOYER_SUCCESS',
      payload: {
        error: false,
        ...response.data.results,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_JOB_LIST_EMPLOYER_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}
