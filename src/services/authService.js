const auth = {
  isAuthenticated: false,
  role: ''
}

export async function login (loginInfo) {
  await fakeNetwork()

  if (loginInfo.password === 'aaa') {
    auth.isAuthenticated = true
    auth.role = 'user'

    return {
      status: 'success',
      message: 'success'
    }
  } else if (loginInfo.password === 'bbb') {
    auth.isAuthenticated = true
    auth.role = 'author'
    return {
      status: 'success',
      message: 'success'
    }
  } else if (loginInfo.password === 'ccc') {
    auth.isAuthenticated = true
    auth.role = 'moderator'
    return {
      status: 'success',
      message: 'success'
    }
  } else {
    return {
      status: 'failed',
      message: 'wrong password'
    }
  }
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

  return auth.role()
}

export async function isAuthenticated () {
  await fakeNetwork()

  return auth.isAuthenticated
}

export async function logout () {
  auth.isAuthenticated = false
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
