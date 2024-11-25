// 封装和token相关方法 存 取 删
const TOKENKEY = 'token_key'
const setToken = (token) => {
    localStorage.setItem(TOKENKEY, token)
}
const getToken = () => {
    return localStorage.getItem(TOKENKEY)
}
const delToken = () => {
    localStorage.removeItem(TOKENKEY)
}

export {
    setToken, getToken, delToken
}