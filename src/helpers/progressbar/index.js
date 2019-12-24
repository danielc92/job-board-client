export const calculateProgress = (errors) => {
    let max = 6;
    let numErrors = errors.length;

    if (numErrors === max)
       return 0
    else if (numErrors === 0) {
        return 100
    } 
    else {
        return ((max - numErrors)/max * 100)
    }
}