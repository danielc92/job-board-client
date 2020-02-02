const { SERVER_500_ERROR_MESAGE } = require('../../constants/')
const { TOKEN_NAME } = require('../../constants')

export const handleApiError = error => {
  return error.response ? error.response.data.error : SERVER_500_ERROR_MESAGE
}

export const getConfig = () => {
  const token = localStorage.getItem(TOKEN_NAME)
  return { headers: { 'x-access-token': token } }
}
