export const objectToQueryStringParser = (queryObject) => {
    let queryString = '';
    const entries = queryObject ? Object.entries(queryObject) : null;
    entries.map((item, index) => {
        if (index === 0) {
            queryString += `?${item[0]}=${item[1]}`
        } else {
            queryString += `&${item[0]}=${item[1]}`
        }
    })
    return queryString;
}