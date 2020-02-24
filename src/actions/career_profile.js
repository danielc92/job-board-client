import jobApi from 'api'
import { handleApiError, getConfig } from 'helpers/api'

export const getCareerProfile = () => async (dispatch, getState) => {
  try {
    await new Promise(r => setTimeout(r, 500))
    const config = getConfig()
    const response = await jobApi.get('career-profile', config)

    dispatch({
      type: 'GET_CAREER_PROFILE_SUCCESS',
      payload: {
        data: response.data.result,
        error: false,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_CAREER_PROFILE_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}

export const getCareerProfileEmployer = _id => async (dispatch, getState) => {
  try {
    await new Promise(r => setTimeout(r, 500))
    const url = `career-profile/employer?_id=${_id}`
    const config = getConfig()
    const response = await jobApi.get(url, config)
    dispatch({
      type: 'GET_CAREER_PROFILE_EMPLOYER_SUCCESS',
      payload: {
        data: response.data.result,
        error: false,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_CAREER_PROFILE_EMPLOYER_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}

export const updateCareerProfile = payload => async (dispatch, getState) => {
  const config = getConfig()
  try {
    const response = await jobApi.patch('career-profile', payload, config)
    dispatch({
      type: 'UPDATE_CAREER_PROFILE_SUCCESS',
      payload: {
        patch: payload,
      },
    })
  } catch (error) {
    dispatch({
      type: 'UPDATE_CAREER_PROFILE_FAILURE',
      payload: {
        updateError: true,
        message: handleApiError(error),
      },
    })
  }
}
