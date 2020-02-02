export const newsDetailReducer = (state = { error: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_NEWS_DETAIL_SUCCESS':
      return payload
    case 'GET_NEWS_DETAIL_FAILURE':
      return payload
    case 'RESET_NEWS_DETAIL':
      return payload
    default:
      return state
  }
}

export const newsListReducer = (state = { error: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_NEWS_LIST_SUCCESS':
      return payload
    case 'GET_NEWS_LIST_FAILURE':
      return payload
    case 'RESET_NEWS_LIST':
      return payload
    default:
      return state
  }
}
