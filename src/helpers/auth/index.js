import jwt_decode from 'jwt-decode'
import { TOKEN_NAME } from 'app_constants'
import { store } from 'index'

export const checkTokenIsValid = () => {
  const token = localStorage.getItem(TOKEN_NAME)

  if (!token) {
    store.dispatch({ type: 'LOGOUT_SUCCESS' })
    return false
  }

  const decoded = jwt_decode(token)

  // Get seconds current time, needs to be converted to seconds
  const now = Math.floor(new Date().getTime() / 1000)

  // Subtract current time from the expiration time in the future
  const diff = decoded.exp - now

  // Offset by a minute to allow for request to bounce back from api server
  const offset = diff - 300 // 5 minutes
  if (offset > 0) {
    return true
  } else {
    store.dispatch({ type: 'LOGOUT_SUCCESS' })
    return false
  }
}
