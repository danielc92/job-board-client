import jobApi from '../api';
import { TOKEN_NAME } from '../constants/index';
import { handleApiError } from '../helpers/api';


export const getSkills = () => async (dispatch, getState) => {
    
    const token = localStorage.getItem(TOKEN_NAME)

    try {
        const response = await jobApi.get('skill', 
        { headers : {'x-access-token' : token }})

        // Data needs to be transformed to meet structure from Semantic's <Dropdown>
        let data = response.data.map(record => ({
            text: record.name,
            value: record.name,
            key: record._id
        }))

        dispatch({
            type: "GET_SKILLS_SUCCESS",
            payload: {
                data,
                error: false,
            }
        })
    }
    catch(error) {

        dispatch({
            type: "GET_SKILLS_FAILURE",
            payload: {
                error: true,
                message: handleApiError(error),
            }
        })
    }

}