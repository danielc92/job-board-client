const { SERVER_500_ERROR_MESAGE } = require('../../constants/')

export const handleApiError = (error) => {
    return error.response ? error.response.data.error : SERVER_500_ERROR_MESAGE
}