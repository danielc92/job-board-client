import jobApi from '../api'
import { handleApiError } from '../helpers/api'

export const getNewsList = () => async (dispatch, getState) => {
  try {
    const response = await jobApi.get('news/list')
    await new Promise(r => setTimeout(r, 2250))
    dispatch({
      type: 'GET_NEWS_LIST_SUCCESS',
      payload: {
        error: false,
        ...response.data.results,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_NEWS_LIST_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}

export const getNewsDetail = _id => async (dispatch, getState) => {
  try {
    const response = await jobApi.get(`news?_id=${_id}`)
    await new Promise(r => setTimeout(r, 2250))
    dispatch({
      type: 'GET_NEWS_DETAIL_SUCCESS',
      payload: {
        error: false,
        data: response.data.results,
      },
    })
  } catch (error) {
    dispatch({
      type: 'GET_NEWS_DETAIL_FAILURE',
      payload: {
        error: true,
        message: handleApiError(error),
      },
    })
  }
}
