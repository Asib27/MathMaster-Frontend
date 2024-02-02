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

export async function getAdminHomeStat () {
  await fakeNetwork()

  const courseList = {
    top5: [
      {
        name: 'Algebra 1',
        id: 1,
        count: 100
      },
      {
        name: 'Calculus',
        id: 2,
        count: 80
      },
      {
        name: 'Euclidean Geometry',
        id: 3,
        count: 60
      },
      {
        name: 'Functions and Graph',
        id: 4,
        count: 58
      },
      {
        name: 'Logic',
        id: 5,
        count: 55
      }
    ],
    least5: [
      {
        name: 'Trigonometry 1',
        id: 1,
        count: 10
      },
      {
        name: 'Trigonometry 2',
        id: 2,
        count: 10
      },
      {
        name: 'Mechanics',
        id: 3,
        count: 10
      },
      {
        name: 'Probability',
        id: 4,
        count: 10
      },
      {
        name: '3D Geometry',
        id: 5,
        count: 10
      }
    ]
  }

  const authorlist = {
    top5: [
      {
        name: 'Shrif',
        id: 1,
        count: 100
      },
      {
        name: 'Rahim',
        id: 2,
        count: 80
      },
      {
        name: 'Karim',
        id: 3,
        count: 60
      },
      {
        name: 'Akash',
        id: 4,
        count: 58
      },
      {
        name: 'Batash',
        id: 5,
        count: 55
      }
    ],
    least5: [
      {
        name: 'Like',
        id: 1,
        count: 10
      },
      {
        name: 'Dislike',
        id: 2,
        count: 10
      },
      {
        name: 'Not like',
        id: 3,
        count: 10
      },
      {
        name: 'Ami',
        id: 4,
        count: 10
      },
      {
        name: 'Keu Na',
        id: 5,
        count: 10
      }
    ]
  }

  return {
    newUser: {
      count: 10,
      trend: 'increasing'
    },
    enrollment: {
      count: 3,
      trend: 'decreasing'
    },
    avgLogin: {
      count: 5,
      trend: 'same'
    },
    courseEngagement: courseList,
    likedCourse: courseList,
    completedCourse: courseList,
    mostLikedAuthor: authorlist
  }
}

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}
