import jobApi from '../api';
import { TOKEN_NAME } from '../constants/index';

export const getLocationList = (searchPhrase) => async (dispatch, getState) => {
    try {   
        const token = localStorage.getItem(TOKEN_NAME)
        const response = await jobApi.get(`location?search=${searchPhrase}`, { headers: { 'x-access-token' : token }})
        dispatch({
            type: "GET_LOCATION_LIST_SUCCESS",
            payload: {
                data: response.data
            }
        })
    } catch (error) {
        dispatch({
            type: "GET_LOCATION_LIST_FAILURE",
            payload: {
                error: error.response.data.error
            }
        })
    }
}