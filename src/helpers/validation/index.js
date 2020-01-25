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
    errors.push(`${tag} is required.`)
  }

  return errors
}

// Check illegal chars
// Check length
// Check each section is in range
// Check each section has correct day to month

export const stringDateValidator = (string, dateString) => {
  let allowed = '/0987654321'
  let errors = []
  let uniqueChars = [...new Set(dateString.split(''))]

  for (let i = 0; i < uniqueChars.length; i++) {
    if (!allowed.includes(uniqueChars[i])) {
      return [
        `${string} has an invalid date format, please make sure you have day/month/year in this format.`,
      ]
    }
  }

  const split = dateString.split('/')

  if (split.length !== 3) {
    return [
      `${string} has an invalid date format, please make sure you have day/month/year in this format.`,
    ]
  }

  let dayString = split[0]
  let monthString = split[1]
  let yearString = split[2]

  let dayInteger = parseInt(dayString)
  let monthInteger = parseInt(monthString)
  let yearInteger = parseInt(yearString)

  if (dayInteger < 1 || dayInteger > 31 || dayString.length > 2) {
    return [`${string} has an invalid date format, please check the day.`]
  }

  if (monthInteger < 1 || monthInteger > 12 || monthString.length > 2) {
    return [`${string} has an invalid date format, please check the month.`]
  }

  if (
    yearInteger < 1930 ||
    yearInteger > new Date().getFullYear() ||
    yearString.length !== 4
  ) {
    return [`${string} has an invalid date format, please check the year.`]
  }

  return errors
}

export const SalaryRangeValidator = (lowerSalary, upperSalary) => {
  let errors = []
  let lowerSalaryNum = Number(lowerSalary)
  let upperSalaryNum = Number(upperSalary)

  if (lowerSalaryNum > upperSalaryNum) {
    errors.push('Maximum salary must be greater than minimum salary')
  }

  return errors
}

export const StringValidator = (string, minLength, maxLength, tag) => {
  let errors = []
  let trimmed = string.trim()
  let length = trimmed.length

  if (length > maxLength || length < minLength) {
    errors.push(
      `${tag} must be between ${minLength} and ${maxLength} characters long.`
    )
  }

  return errors
}

export const EmailValidator = (string, minLength, maxLength) => {
  let errors = []
  let trimmed = string.trim()
  let length = trimmed.length

  if (length > maxLength || length < minLength) {
    errors.push(
      `Email must be between ${minLength} and ${maxLength} characters long.`
    )
  }

  //REGEX SOURCE: https://emailregex.com/
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(trimmed)) {
    errors.push('Email must be valid.')
  }

  return errors
}

export const PasswordValidator = (string, minLength, maxLength, minUnique) => {
  let errors = []
  let trimmed = string.trim()
  let length = trimmed.length

  // Check Length
  if (length > maxLength || length < minLength) {
    errors.push(
      `Password must be between ${minLength} and ${maxLength} characters long.`
    )
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
