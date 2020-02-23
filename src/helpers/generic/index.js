export const properCaseTransform = string => {
  let split = string.split(' ')
  let items = split.map(item => {
    let last = item[item.length - 1]
    let first = item[0]

    // Handles cases like (nsw) --> (NSW)
    if (first === '(' && last === ')') {
      return item.toUpperCase()
      // Else only capitalize first letter
    } else {
      return item.charAt(0).toUpperCase() + item.substr(1).toLowerCase()
    }
  })
  let newString = items.join(' ')
  return newString
}

export const dateDiffString = oldDate => {
  const minutesPerDay = 1440
  const previous = new Date(oldDate)
  const now = new Date()
  const difference = now - previous
  const seconds = Math.floor(difference / 1000)
  const minutes = Math.floor(seconds / 60)

  if (seconds < 60) {
    return `${seconds} seconds ago`
  } else if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (minutes < minutesPerDay) {
    const hours = Math.floor(minutes / 60)
    return `${hours} hours ago`
  } else {
    const days = Math.floor(minutes / 60 / 24)
    return `${days} days ago`
  }
}
