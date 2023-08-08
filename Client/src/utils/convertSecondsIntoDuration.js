const convertSecondsToDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)  
    const seconds = Math.floor(totalSeconds % 60)

    if(hours > 0) return `${hours} h ${minutes} min`
    else if(minutes > 0) return `${minutes} min ${seconds} s`
    else  return `${seconds} s`
}

export default convertSecondsToDuration