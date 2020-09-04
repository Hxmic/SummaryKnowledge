// 2020年9月4日

function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};

    if (obj && typeof objClone == 'object') {
        for(key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] == 'object') {
                objClone[key] = deepClone(obj[key])
            } else {
                objClone[key] = obj[key]
            }
        }
    }

    return objClone;
}