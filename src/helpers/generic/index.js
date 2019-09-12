export const properCaseTransform = (string) => {
    let split = string.split(' ')
    let items = split.map(item => (item.charAt(0).toUpperCase() + item.substr(1).toLowerCase()))
    let newString = items.join(' ')
    return newString
}