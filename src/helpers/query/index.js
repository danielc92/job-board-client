export const objectToQueryStringParser = queryObject => {
  let queryString = ''
  const entries = queryObject ? Object.entries(queryObject) : null
  const filtered_entries = entries.filter(
    set =>
      set[1] &&
      String(set[1])
        .trim()
        .toLowerCase().length !== 0
  )
  for (let i = 0; i < filtered_entries.length; i++) {
    let prefix = i === 0 ? '?' : '&'
    if (filtered_entries[i][0] && filtered_entries[i][1]) {
      let key = String(filtered_entries[i][0])
      let value = String(filtered_entries[i][1])

      if (value.length > 0) {
        queryString += `${prefix}${key}=${value}`
      }
    }
  }
  return queryString
}

export const queryStringToObjectParser = queryString => {
  let step1 = queryString.replace('?', '')
  let items = step1.split('&')
  let obj = {}

  for (let i = 0; i < items.length; i++) {
    if (items[i].length >= 3 && items[i].indexOf('=') > -1) {
      let split = items[i].split('=')
      obj = { ...obj, [split[0]]: split[1] }
    }
  }

  return Object.entries(obj).length > 0 ? obj : null
}
