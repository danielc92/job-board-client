import jobApi from '../api';
import { handleApiError } from '../helpers/api';
import { properCaseTransform } from '../helpers/generic';


export const getCategories = () => async (dispatch, getState) => {
    
    try {
        const response = await jobApi.get('category/list')

        // Data needs to be transformed to meet structure from Semantic's <Dropdown>
        const data = response.data.map(record => ({
            text: properCaseTransform(record.name),
            value: record.name,
            key: record._id
        }))

        dispatch({
            type: "GET_CATEGORIES_SUCCESS",
            payload: {
                data,
                error: false,
            }
        })
    }
    catch(error) {

        dispatch({
            type: "GET_CATEGORIES_FAILURE",
            payload: {
                message: handleApiError(error),
                error: true,
            }
        })
    }

}