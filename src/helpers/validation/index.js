export const ListValidator = (list, minItems, listTag) => {
    
    let errors = []

    if (list.length === 0) {
        errors.push(`${listTag} list must contain at least ${minItems} item.`)
    }

    return errors
}

export const IsEmptyValidator = (string, tag) => {
    let errors = []
    
    if (string.length === 0) {
        errors.push(`${tag} must not be empty`)
    }

    return errors
}

export const SalaryRangeValidator = (lowerSalary, upperSalary) => {
    let errors = []
    let lowerSalaryNum = Number(lowerSalary)
    let upperSalaryNum = Number(upperSalary)

    if (lowerSalaryNum > upperSalaryNum) {
        errors.push("Maximum salary must be greater than minimum salary")
    }

    return errors
}

export const StringValidator = (string, minLength, maxLength, tag) => {
    
    let errors = []
    let trimmed = string.trim()
    let length = trimmed.length
    
    if (length > maxLength || length < minLength) {
        errors.push(`${tag} must be between ${minLength} and ${maxLength} characters long.`)
    }

    return errors
}

export const EmailValidator = (string, minLength, maxLength) => {

    let errors = []
    let trimmed = string.trim()
    let length = trimmed.length
    
    if (length > maxLength || length < minLength) {
        errors.push(`Email must be between ${minLength} and ${maxLength} characters long.`)
    }

    //REGEX SOURCE: https://emailregex.com/
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(trimmed)) {
        errors.push('Email provided must be a valid email address.')
    }

    return errors
}

export const PasswordValidator = (string, minLength, maxLength, minUnique) => {
    
    let errors = []
    let trimmed = string.trim()
    let length = trimmed.length
    
    // Check Length
    if (length > maxLength || length < minLength) {
        errors.push(`Password must be between ${minLength} and ${maxLength} characters long.`)
    }

    // Check unique chars for user security
    let split = trimmed.split('')
    let unique_count = [...new Set(split)].length
    if (unique_count < minUnique) {
        errors.push(`Passwords must have at least ${minUnique} unique characters.`)
    }

    return errors
}

export const PasswordMatcher = (string, string2) => {
    
    let errors = []
    
    if (string !== string2) {
        errors.push('Passwords must match.')
    }

    return errors
}