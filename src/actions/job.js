import jobApi from '../api'
import { handleApiError, getConfig } from '../helpers/api'

export const createJob = payload => async (dispatch, getState) => {
  try {
    const config = getConfig()
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
    dispatch({
      type: 'RESET_JOB_DETAIL',
      payload: {
        error: false,
      },
    })
    await new Promise(r => setTimeout(r, 500))
    const config = getConfig()
    const response = await jobApi.get(`job?id=${id}`, null, config)
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
