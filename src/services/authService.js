import axios from 'axios'
import { getObjectFromCookie, saveObjectInCookie } from './cookieService'
import Cookies from 'js-cookie'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function login (loginInfo) {
  console.log(loginInfo)
  const data = await axios.post(
    API_BASE + 'auth/login',
    loginInfo)
  saveObjectInCookie('user', data.data.user)
  return data.data

  // if (loginInfo.password === 'aaa') {
  //   saveObjectInCookie('auth', {
  //     isAuthenticated: true,
  //     role: 'user'
  //   })

  //   return {
  //     status: 'success',
  //     message: 'success'
  //   }
  // } else if (loginInfo.password === 'bbb') {
  //   saveObjectInCookie('auth', {
  //     isAuthenticated: true,
  //     role: 'author'
  //   })

  //   return {
  //     status: 'success',
  //     message: 'success'
  //   }
  // } else if (loginInfo.password === 'ccc') {
  //   saveObjectInCookie('auth', {
  //     isAuthenticated: true,
  //     role: 'admin'
  //   })

  //   return {
  //     status: 'success',
  //     message: 'success'
  //   }
  // } else {
  //   return {
  //     status: 'failed',
  //     message: 'wrong password'
  //   }
  // }
}

export async function signup (signupInfo) {
  await fakeNetwork()

  return {
    status: 'success',
    message: 'success'
  }
}

export async function getRole () {
  await fakeNetwork()

  const auth = getObjectFromCookie('user')

  return auth && auth.role.name
}

export async function isAuthenticated () {
  const auth = getObjectFromCookie('user')
  return auth && auth.name
}

export async function logout () {
  Cookies.remove('token')
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
