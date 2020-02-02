import jobApi from '../api'
import { handleApiError, getConfig } from '../helpers/api'

export const getSkills = () => async (dispatch, getState) => {
  const config = getConfig()

  try {
    const response = await jobApi.get('skill/list', config)

    // Data needs to be transformed to meet structure from Semantic's <Dropdown>
    let data = response.data.map(record => ({
      text: record.name,
      value: record.name,
      key: record._id,
    }))

    dispatch({
      type: 'GET_SKILLS_SUCCESS',
      payload: {
        data,
        error: false,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_SKILLS_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}
