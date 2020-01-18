import jobApi from '../api';
import { objectToQueryStringParser }  from '../helpers/query';
import { handleApiError } from '../helpers/api';

export const getJobList = (object) => async (dispatch, getState) => {
    try {
        console.log(object, 'obje')
        const queryString = objectToQueryStringParser(object)
        console.log(queryString, 'query')
        const response = await jobApi.get(`job/list${queryString}`)
        dispatch({
            type: "GET_JOB_LIST_SUCCESS",
            payload: {
                error: false,
                data: response.data.results,
                loaded: true,
            }
        })
    }
    catch (error) {
        dispatch({
            type: "GET_JOB_LIST_FAILURE",
            payload: {
                error: true,
                message: handleApiError(error),
            }

        })
    }
}