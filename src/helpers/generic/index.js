export const properCaseTransform = (string) => {
    let split = string.split(' ')
    let items = split.map(item => (item.charAt(0).toUpperCase() + item.substr(1).toLowerCase()))
    let newString = items.join(' ')
    return newString
}

export const dateDiffString = (oldDate) => {
    const minutesPerDay = 1440
    const previous = new Date(oldDate)
    const now = new Date();
    const difference = now - previous;
    const minutes = Math.floor(difference / 1000 / 60)
    if (minutes < 60) {
        return `${minutes} minutes ago`
    }
    else if (minutes < minutesPerDay){
        const hours = Math.floor(minutes / 60)
        return `${hours} hours ago`
    } else {
        const days = Math.floor(minutes/60/24)
        return `${days} days ago`
    }
}