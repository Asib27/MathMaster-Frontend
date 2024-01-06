const userStats = {
  totalXp: 510,
  dailyXp: [
    10, 10, 16, 0, 10, 15
  ],
  enrolled: 3,
  problemSolved: 64,
  lessonsCompleted: 4
}

export async function getUserStat (userId) {
  await fakeNetwork()
  return userStats
}

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}
