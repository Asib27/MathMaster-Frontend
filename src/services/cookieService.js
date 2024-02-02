import Cookies from 'js-cookie'

export function saveObjectInCookie (name, value) {
  const valueJson = JSON.stringify(value)
  Cookies.set(name, valueJson)
}

export function getObjectFromCookie (name) {
  const valueJson = Cookies.get(name)
  if (valueJson) {
    try {
      return JSON.parse(valueJson)
    } catch (error) {
      return null
    }
  }
  return valueJson
}
