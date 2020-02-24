import jobApi from 'api'
import { objectToQueryStringParser } from 'helpers/query'
import { handleApiError } from 'helpers/api'

export const getJobList = object => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'RESET_JOB_LIST',
      payload: {
        error: false,
      },
    })
    await new Promise(r => setTimeout(r, 1000))
    const queryString = objectToQueryStringParser(object)
    console.log('REQUEST FOR', queryString, object)
    const response = await jobApi.get(`job/list${queryString}`)
    dispatch({
      type: 'GET_JOB_LIST_SUCCESS',
      payload: {
        error: false,
        data: response.data.results,
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
