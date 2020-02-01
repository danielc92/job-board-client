import jobApi from '../api'
import { handleApiError } from '../helpers/api'
import { objectToQueryStringParser } from '../helpers/query'

export const getNewsList = object => async (dispatch, getState) => {
  try {
    const queryString = objectToQueryStringParser(object)
    const url = `news/list${queryString}`
    await new Promise(r => setTimeout(r, 500))
    const response = await jobApi.get(url)
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
    await new Promise(r => setTimeout(r, 2000))
    const response = await jobApi.get(`news?_id=${_id}`)

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
