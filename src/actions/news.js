import jobApi from 'api'
import { handleApiError } from 'helpers/api'
import { objectToQueryStringParser } from 'helpers/query'

export const getNewsList = object => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'RESET_NEWS_LIST',
      payload: {
        error: false,
      },
    })
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

export const getNewsDetail = slug => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'RESET_NEWS_DETAIL',
      payload: {
        error: false,
      },
    })
    await new Promise(r => setTimeout(r, 500))
    const response = await jobApi.get(`news?slug=${slug}`)

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
