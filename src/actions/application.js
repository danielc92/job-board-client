import jobApi from 'api'
import { handleApiError, getConfig } from 'helpers/api'
import { objectToQueryStringParser } from 'helpers/query'

export const updateApplicationStatus = object => async (dispatch, getState) => {
  try {
    const queryString = objectToQueryStringParser(object)
    const config = getConfig()
    const url = `application${queryString}`
    const response = await jobApi.patch(url, null, config)
    dispatch({
      type: 'APPLICATION_UPDATE_SUCCESS',
      payload: {
        error: false,
        flag: true,
      },
    })
  } catch (error) {
    dispatch({
      type: 'APPLICATION_UPDATE_FAILURE',
      payload: {
        error: true,
        flag: false,
        message: handleApiError(error),
      },
    })
  }
}

export const createApplication = payload => async (dispatch, getState) => {
  try {
    const config = getConfig()
    const response = await jobApi.post('application', payload, config)
    dispatch({
      type: 'APPLICATION_SUCCESS',
      payload: {
        error: false,
        flag: true,
        message: response.data.message,
      },
    })
  } catch (error) {
    dispatch({
      type: 'APPLICATION_FAILURE',
      payload: {
        error: true,
        flag: false,
        message: handleApiError(error),
      },
    })
  }
}

export const resetApplication = () => async (dispatch, getState) => {
  dispatch({
    type: 'APPLICATION_RESET',
    payload: {
      error: false,
      flag: false,
    },
  })
}

export const resetApplicationUpdate = () => async (dispatch, getState) => {
  dispatch({
    type: 'APPLICATION_UPDATE_RESET',
    payload: {
      error: false,
      flag: false,
    },
  })
}
