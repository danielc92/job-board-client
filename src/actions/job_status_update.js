import jobApi from 'api'
import { handleApiError, getConfig } from 'helpers/api'

export const updateJobStatus = payload => async (dispatch, getState) => {
  try {
    const { job_id } = payload
    const config = getConfig()
    const url = `job?job_id=${job_id}`
    const response = await jobApi.patch(url, null, config)
    dispatch({
      type: 'JOB_STATUS_UPDATE_SUCCESS',
      payload: {
        error: false,
        flag: true,
        message: response.data.message,
      },
    })
  } catch (error) {
    dispatch({
      type: 'JOB_STATUS_UPDATE_FAILURE',
      payload: {
        error: true,
        flag: false,
        message: handleApiError(error),
      },
    })
  }
}

export const resetJobStatus = () => async (dispatch, getState) => {
  dispatch({
    type: 'JOB_STATUS_UPDATE_RESET',
    payload: {
      error: false,
      flag: false,
    },
  })
}
