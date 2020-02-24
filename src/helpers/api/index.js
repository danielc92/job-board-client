const { SERVER_500_ERROR_MESAGE } = require('app_constants')
const { TOKEN_NAME } = require('app_constants')

export const handleApiError = error => {
  return error.response ? error.response.data.error : SERVER_500_ERROR_MESAGE
}

export const getConfig = () => {
  const token = localStorage.getItem(TOKEN_NAME)
  return { headers: { 'x-access-token': token } }
}
