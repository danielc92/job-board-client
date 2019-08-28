export const StringValidator = (string, minLength, maxLength) => {
    
    let errors = []
    let trimmed = string.trim()
    let length = trimmed.length
    
    if (length > maxLength || length < minLength) {
        errors.push(`Value must be between ${minLength} and ${maxLength} characters long.`)
    }

    return errors
}