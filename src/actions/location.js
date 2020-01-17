import jobApi from '../api';
import { handleApiError } from '../helpers/api';

export const getLocationList = (search) => async (dispatch, getState) => {
    try {   
        const url = `location/list?search=${search}`
        const response = await jobApi.get(url)
        
        // Transform locations for semantic component
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
                data,
                error: false,
                search,
            }
        })
    } catch (error) {
        dispatch({
            type: "GET_LOCATION_LIST_FAILURE",
            payload: {
                error: true,
                message: handleApiError(error),
                search,
            }
        })
    }
}