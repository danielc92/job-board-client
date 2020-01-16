import jobApi from '../api';
import { TOKEN_NAME } from '../constants/index';


export const getBenefits = () => async (dispatch, getState) => {
    
    const token = localStorage.getItem(TOKEN_NAME)

    try {
        const response = await jobApi.get('benefit', 
        { headers : {'x-access-token' : token }})

        // Data needs to be transformed to meet structure from Semantic's <Dropdown>
        const data = response.data.map(record => ({
            text: record.name,
            value: record.name,
            key: record._id
        }))

        dispatch({
            type: "GET_BENEFIT_SUCCESS",
            payload: {
                data
            }
        })
    }
    catch(error) {
        dispatch({
            type: "GET_BENEFIT_FAILURE",
            payload: {
                error: error.response.data.error
            }
        })
    }

}