export const objectToQueryStringParser = (queryObject) => {
    let queryString = '';
    const entries = queryObject ? Object.entries(queryObject) : null;
    for (let i = 0; i < entries.length; i ++ ) {
        
        let prefix = (i === 0) ? '?' : '&'
        let key = entries[i][0]
        let value = String(entries[i][1])
        if (value.length > 0) {
            queryString += `${prefix}${key}=${value}`
        }
        
    }
    return queryString;
}

export const queryStringToObjectParser = (queryString) => {
    let step1 = queryString.replace('?','')
    let items = step1.split('&')
    let obj = {}

    for (let i = 0; i < items.length ; i ++) {
        if (items[i].length >= 3 && items[i].indexOf('=') > -1 ) {
            let split = items[i].split('=');
            obj = {...obj, [split[0]] : split[1]}
        }
    }

    return Object.entries(obj).length > 0 ? obj : null;
}