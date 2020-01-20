import jobApi from '../api';
import { handleApiError } from '../helpers/api';

export const getUserDetails = (search) => async (dispatch, getState) => {
    try {   
        const url = `auth/?id=${search}`
        const response = await jobApi.get(url)

        // Transform locations for semantic component
        dispatch({
            type: "GET_USER_DETAIL_SUCCESS",
            payload: {
                data: response.data.results,
                loaded: true,
                error: false,
            }
        })
    } catch (error) {
        dispatch({
            type: "GET_USER_DETAIL_FAILURE",
            payload: {
                error: true,
                message: handleApiError(error),
            }
        })
    }
}