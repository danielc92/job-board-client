import jobApi from '../api';

export const getUserDetails = (search) => async (dispatch, getState) => {
    try {   
        const url = `location?id=${search}`
        const response = await jobApi.get(url)
        console.log(response, 'user details')
        // Transform locations for semantic component
        dispatch({
            type: "FETCH_USER_DETAIL_SUCCESS",
            payload: {
                // data,
                error: false,
                search,
            }
        })
    } catch (error) {
        dispatch({
            type: "FETCH_USER_DETAIL_FAILURE",
            payload: {
                error: true,
                errorMessage: error.response.data.error,
                search,
            }
        })
    }
}