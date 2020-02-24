import jwt_decode from 'jwt-decode'
import { TOKEN_NAME } from '../app_constants'

export const authReducer = (
  state = {
    isAuthenticated: false,
    error: false,
    user: {},
  },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem(TOKEN_NAME, payload.token)
      let decoded = jwt_decode(payload.token)
      return {
        isAuthenticated: true,
        error: payload.error,
        user: { ...decoded },
      }

    case 'LOGIN_REFRESH':
      let token = localStorage.getItem(TOKEN_NAME)
      let decoded_token = jwt_decode(token)
      return {
        isAuthenticated: true,
        error: false,
        user: { ...decoded_token },
      }

    case 'LOGIN_FAILURE':
      return {
        isAuthenticated: false,
        error: payload.error,
        message: payload.message,
        user: {},
      }

    default:
      return state
  }
}
