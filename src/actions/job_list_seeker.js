import jobApi from '../api'
import { objectToQueryStringParser } from '../helpers/query'
import { handleApiError } from '../helpers/api'

export const getJobList = object => async (dispatch, getState) => {
  try {
    await new Promise(r => setTimeout(r, 500))
    const queryString = objectToQueryStringParser(object)
    const response = await jobApi.get(`job/list${queryString}`)
    dispatch({
      type: 'GET_JOB_LIST_SUCCESS',
      payload: {
        error: false,
        data: response.data.results,
        loaded: true,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_JOB_LIST_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}
