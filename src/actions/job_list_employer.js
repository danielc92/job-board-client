import jobApi from '../api';
import { objectToQueryStringParser }  from '../helpers/query';
import { TOKEN_NAME } from '../constants/index';

export const getJobListForEmployer = (object) => async (dispatch, getState) => {
    try {
        let queryString = object ? objectToQueryStringParser(object) : '';
        const token = localStorage.getItem(TOKEN_NAME);
        const url = `job/list/employer${queryString}`;
        const options = { headers : {'x-access-token' : token }};
        const response = await jobApi.get(url, options);
        
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
                error: error.response ? error.response.data.error : '[500] Server Error'
            }

        })
    }
}