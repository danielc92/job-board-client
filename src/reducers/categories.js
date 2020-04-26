export const categoryReducer = (state = { error: false }, action) => {
  const { payload, type } = action
  switch (type) {
    case 'GET_CATEGORIES_SUCCESS':
      return payload
    case 'GET_CATEGORIES_FAILURE':
      return payload
    default:
      return state
  }
}
