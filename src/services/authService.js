import axios from 'axios'
import { getObjectFromCookie, saveObjectInCookie } from './cookieService'
import Cookies from 'js-cookie'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function login (loginInfo) {
  const data = await axios.post(
    API_BASE + 'auth/login',
    loginInfo)
  saveObjectInCookie('user', data.data.user)
  return data.data
}

export async function signup (signupInfo) {
  const data = await axios.post(
    API_BASE + 'auth/signup',
    signupInfo
  )

  return data.data
}

export async function getRole () {
  await fakeNetwork()

  const auth = getObjectFromCookie('user')

  return auth && auth.role && auth.role.name
}

export async function isAuthenticated () {
  const auth = getObjectFromCookie('user')
  return auth && auth.name
}

export async function logout () {
  // Cookies.remove('token', { path: '', domain: 'math-master.azurewebsites.net'})
  Cookies.set('token', null, { path: '/', domain: 'math-master.azurewebsites.net' })
  saveObjectInCookie('user', {})

  return {
    status: 'success',
    message: 'success'
  }
}

export async function isUniqueUsername (username) {
  await fakeNetwork()

  return {
    isUnique: username !== 'aaaa'
  }
}

export async function getUserData () {
  const auth = getObjectFromCookie('user')
  return auth
}

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}
