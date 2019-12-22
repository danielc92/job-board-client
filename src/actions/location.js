import jobApi from '../api';

export const getLocationList = () => async (dispatch, getState) => {
    try {   
        const response = await jobApi.get('location/list')

        dispatch({
            type: "GET_LOCATION_LIST_SUCCESS",
            payload: {
                data: response.data.results
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