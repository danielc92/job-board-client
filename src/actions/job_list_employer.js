import jobApi from '../api'
import { objectToQueryStringParser } from '../helpers/query'
import { TOKEN_NAME } from '../constants/index'
import { handleApiError } from '../helpers/api'

export const getJobListForEmployer = object => async (dispatch, getState) => {
  try {
    let queryString = objectToQueryStringParser(object)
    const token = localStorage.getItem(TOKEN_NAME)
    const url = `job/list/employer${queryString}`
    console.log('Fire off:: ', url)
    const options = { headers: { 'x-access-token': token } }
    const response = await jobApi.get(url, options)
    console.log(response.data.results)
    dispatch({
      type: 'GET_JOB_LIST_EMPLOYER_SUCCESS',
      payload: {
        error: false,
        data: response.data.results,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_JOB_LIST_EMPLOYER_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
        data: {},
      },
    })
  }
}
