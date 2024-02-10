import axios from 'axios'
import { getObjectFromCookie, saveObjectInCookie } from './cookieService'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function login (loginInfo) {
  console.log(loginInfo)
  const data = await axios.post(
    API_BASE + 'auth/login',
    loginInfo)
  console.log(data)
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

  const auth = getObjectFromCookie('auth')

  return auth && auth.role
}

export async function isAuthenticated () {
  await fakeNetwork()

  const auth = getObjectFromCookie('auth')

  return auth && auth.isAuthenticated
}

export async function logout () {
  saveObjectInCookie('auth', {
    isAuthenticated: false,
    role: ''
  })

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

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}
