import jobApi from '../api';
import { TOKEN_NAME } from '../constants/index';

export const getLocationList = (searchPhrase) => async (dispatch, getState) => {
    try {   
        const token = localStorage.getItem(TOKEN_NAME)
        const url = `location?search=${searchPhrase}`
        const response = await jobApi.get(
            url, 
            { 
                headers: { 'x-access-token' : token }
            }
        )
        
        const data = response.data.map((item, index) => {
            return {
                key: index.toString(),
                text: item.location_string,
                value: item
            }
        })
        dispatch({
            type: "GET_LOCATION_LIST_SUCCESS",
            payload: {
                data
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