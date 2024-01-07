export async function login (loginInfo) {
  await fakeNetwork()

  if (loginInfo.password === 'aaa') {
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
