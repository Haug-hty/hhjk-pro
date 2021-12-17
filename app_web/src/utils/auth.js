import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  // console.log(window.localStorage.getItem(TokenKey))
  // return Cookies.get(TokenKey)

  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  // console.log(window.localStorage.setItem(TokenKey, token))
  // return Cookies.set(TokenKey, token)

  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
