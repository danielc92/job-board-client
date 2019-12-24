export const objectToQueryStringParser = (queryObject) => {
    let queryString = '';
    const entries = queryObject ? Object.entries(queryObject) : null;
    for (let index = 0; index < entries.length; index ++ ) {
        
        if (index === 0) {
            queryString += `?${entries[index][0]}=${entries[index][1]}`
        } else {
            queryString += `&${entries[index][0]}=${entries[index][1]}`
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