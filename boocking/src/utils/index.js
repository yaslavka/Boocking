
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