import jobApi from '../api';
import { TOKEN_NAME } from '../constants/index';


export const getSkills = () => async (dispatch, getState) => {
    
    const token = localStorage.get(TOKEN_NAME)

    try {
        const response = await jobApi.post('api/skill', 
        { headers={'x-access-token' : token }})

        dispatch({
            type: "GET_SKILLS_SUCCESS",
            payload: {
                data: response.data
            }
        })
    }
    catch(error) {
        dispatch({
            type: "GET_SKILLS_FAILURE",
            payload: {
                error: error.response.data.error
            }
        })
    }

}