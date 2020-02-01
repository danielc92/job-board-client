import jobApi from '../api'
import { TOKEN_NAME } from '../constants/index'
import { handleApiError } from '../helpers/api'

export const getCareerProfile = () => async (dispatch, getState) => {
  const token = localStorage.getItem(TOKEN_NAME)

  try {
    await new Promise(r => setTimeout(r, 500))
    const response = await jobApi.get('career-profile', {
      headers: { 'x-access-token': token },
    })

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
  const token = localStorage.getItem(TOKEN_NAME)

  try {
    await new Promise(r => setTimeout(r, 500))
    const url = `career-profile/employer?_id=${_id}`
    const response = await jobApi.get(url, {
      headers: { 'x-access-token': token },
    })
    console.log(response.data.result)
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
  const token = localStorage.getItem(TOKEN_NAME)
  const options = { headers: { 'x-access-token': token } }
  try {
    const response = await jobApi.patch('career-profile', payload, options)
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
