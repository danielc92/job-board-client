import jwt_decode from 'jwt-decode'
import { TOKEN_NAME } from '../../constants'

export const checkTokenIsValid = () => {
  const token = localStorage.getItem(TOKEN_NAME)

  if (!token) return false

  const decoded = jwt_decode(token)

  // Get seconds current time, needs to be converted to seconds
  const now = Math.floor(new Date().getTime() / 1000)

  // Subtract current time from the expiration time in the future
  const diff = decoded.exp - now

  // Offset by a minute to allow for request to bounce back from api server
  const offset = diff - 60
  console.log(offset)
  if (offset > 0) {
    return true
  }
}
