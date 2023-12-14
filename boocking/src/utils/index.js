
export const getAccessToken = () => {
    try {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken === null) {
            return undefined
        }
        return accessToken
    } catch (error) {
        return undefined
    }
}

export const setAccessToken = (access_token) => {
    localStorage.setItem('access_token', access_token)
}


export const declOfNum = (number, titles) => {
    number = Math.abs(number)
    if (Number.isInteger(number)) {
        const cases = [2, 0, 1, 1, 1, 2]
        return titles[
            number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
            ]
    }
    return titles[1]
}