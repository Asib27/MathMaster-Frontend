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

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}
