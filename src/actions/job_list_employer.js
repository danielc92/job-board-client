import jobApi from '../api';
import { objectToQueryStringParser }  from '../helpers/query';

export const getJobListForEmployer = (object) => async (dispatch, getState) => {
    try {
        let queryString = object ? objectToQueryStringParser(object) : '';

        const response = await jobApi.get(`job/list/employer${queryString}`)
        dispatch({
            type: "GET_JOB_LIST_EMPLOYER_SUCCESS",
            payload: {
                data: response.data.results
            }
        })
    }
    catch (error) {
        dispatch({
            type: "GET_JOB_LIST_EMPLOYER_FAILURE",
            payload: {
                error: error.response.data.error
            }

        })
    }
}