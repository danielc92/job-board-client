import jobApi from 'api'
import { handleApiError } from 'helpers/api'

export const loginUser = (email, password) => async (dispatch, getState) => {
  const payload = { email, password }

  try {
    const response = await jobApi.post('auth/login', payload)
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        token: response.data.token['x-auth-token'],
      },
    })
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}

export function logoutUser() {
  return {
    type: 'LOGOUT_SUCCESS',
  }
}

export function loginRefresh() {
  return {
    type: 'LOGIN_REFRESH',
    payload: {
      value: true,
    },
  }
}
