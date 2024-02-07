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

export async function getAdminHomeStat () {
  await fakeNetwork()

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

export async function getDataForChart (chartName) {
  await fakeNetwork()

  const data =
    [
      { x: '2024-02-03', y: 71 },
      { x: '2024-02-02', y: 55 },
      { x: '2024-02-01', y: -5 },
      { x: '2024-01-31', y: 65 },
      { x: '2024-01-30', y: 71 },
      { x: '2024-01-29', y: 68 },
      { x: '2024-01-28', y: 38 },
      { x: '2024-01-27', y: 92 },
      { x: '2024-01-26', y: 54 },
      { x: '2024-01-25', y: 60 },
      { x: '2024-01-24', y: 21 },
      { x: '2024-01-23', y: 49 },
      { x: '2024-01-22', y: 36 }
    ]

  return data
}

export async function getAdminUserStat () {
  await fakeNetwork()

  return {
    newUser: {
      count: 10,
      trend: 'increasing'
    },
    onlineUser: {
      count: 21,
      trend: 'decreasing'
    },
    completion: {
      count: '31%',
      trend: 'same'
    },
    avgLogin: {
      count: '-9%',
      trend: 'same'
    },
    avgStreak: {
      count: '-9%',
      trend: 'same'
    },
    avgTime: {
      count: '31min',
      trend: 'same'
    }
  }
}

export async function getOverallCourseStat () {
  await fakeNetwork()

  return {
    enrollment: {
      count: 12,
      trend: 'increasing'
    },
    avgTimeSpent: {
      count: 21,
      trend: 'decreasing'
    },
    progressRate: {
      count: '31%',
      trend: 'same'
    },
    upVote: {
      count: '-9%',
      trend: 'same'
    },
    downVote: {
      count: '-9%',
      trend: 'same'
    },
    problemSolved: {
      count: '31',
      trend: 'same'
    },
    courseEngagement: courseList
  }
}

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}
