import jobApi from '../api'
import { TOKEN_NAME } from '../constants'
import { handleApiError } from '../helpers/api'

export const createJob = payload => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem(TOKEN_NAME)
    const config = { headers: { 'x-access-token': token } }
    const response = await jobApi.post('job', payload, config)
    dispatch({
      type: 'JOB_CREATE_SUCCESS',
      payload: {
        data: response.data,
      },
    })
  } catch (error) {
    dispatch({
      type: 'JOB_CREATE_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}

export const resetJob = () => async (dispatch, getState) => {
  dispatch({
    type: 'JOB_CREATE_RESET',
    payload: null,
  })
}

export const getJob = id => async (dispatch, getState) => {
  try {
    await new Promise(r => setTimeout(r, 500))
    const token = localStorage.getItem(TOKEN_NAME)
    const config = { headers: { 'x-access-token': token } }
    const response = await jobApi.get(`job?id=${id}`, null, config)
    console.log('JOB_DETAIL: ', response.data.results)
    dispatch({
      type: 'GET_JOB_DETAIL_SUCCESS',
      payload: {
        error: false,
        data: response.data.results,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_JOB_DETAIL_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}
