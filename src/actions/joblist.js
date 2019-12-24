import jobApi from '../api';
import { objectToQueryStringParser }  from '../helpers/query';

export const getJobList = (object) => async (dispatch, getState) => {
    try {
        let queryString = object ? objectToQueryStringParser(object) : '';

        const response = await jobApi.get(`job/list${queryString}`)
        console.log(response.data.results, 'action')
        dispatch({
            type: "GET_JOB_LIST_SUCCESS",
            payload: {
                data: response.data.results
            }
        })
    }
    catch (error) {
        dispatch({
            type: "GET_JOB_LIST_FAILURE",
            payload: {
                // error: error.response.data.error
                error: "Failed to fetch job list"
            }

        })
    }
}