const outline =
        [
          {
            id: 2,
            name: 'Topic1',
            description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc. Cras ut lacinia nulla, ut luctus sem. Mauris non pretium tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam dignissim, eros non scelerisque commodo, justo nunc molestie mauris, at aliquet ex nibh quis est. Pellentesque porta dignissim enim viverra feugiat. In hac habitasse platea dictumst. Proin tempor nisi orci, quis cursus ipsum porttitor non. Proin tempor finibus quam, lacinia scelerisque dolor blandit ut. Vivamus vitae elementum enim. Aliquam erat volutpat.',

            completed: true,
            lessons: [
              {
                id: '1',
                name: 'Lesson1',
                completed: true
              },
              {
                id: '2',
                name: 'Lesson2',
                completed: false
              },
              {
                id: '3',
                name: 'Lesson3',
                completed: true
              }
            ],
            quizes: [
              {
                id: '1',
                name: 'Quiz1',
                completed: false
              },
              {
                id: '2',
                name: 'Quiz2',
                completed: true
              }
            ]
          },
          {
            id: 4,
            name: 'Topic2',
            description: 'description2 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc. Cras ut lacinia nulla, ut luctus sem. Mauris non pretium tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam dignissim, eros non scelerisque commodo, justo nunc molestie mauris, at aliquet ex nibh quis est. Pellentesque porta dignissim enim viverra feugiat. In hac habitasse platea dictumst. Proin tempor nisi orci, quis cursus ipsum porttitor non. Proin tempor finibus quam, lacinia scelerisque dolor blandit ut. Vivamus vitae elementum enim. Aliquam erat volutpat.',

            completed: false,
            lessons: [
              {
                id: '2',
                name: 'Lesson1',
                completed: true
              },
              {
                id: '3',
                name: 'Lesson2',
                completed: false
              },
              {
                id: '4',
                name: 'lesson3',
                completed: false
              }
            ],
            quizes: [
              {
                id: '1',
                name: 'Quiz3',
                completed: false
              }
            ]
          }
        ]

const course = {
  id: '1',
  name: 'Course Name 1',
  description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc. Cras ut lacinia nulla, ut luctus sem. Mauris non pretium tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam dignissim, eros non scelerisque commodo, justo nunc molestie mauris, at aliquet ex nibh quis est. Pellentesque porta dignissim enim viverra feugiat. In hac habitasse platea dictumst. Proin tempor nisi orci, quis cursus ipsum porttitor non. Proin tempor finibus quam, lacinia scelerisque dolor blandit ut. Vivamus vitae elementum enim. Aliquam erat volutpat.',
  content: outline,
  authors: [
    {
      id: '1',
      name: 'Shariful Rahi'
    },
    {
      id: '2',
      name: 'Rahi Khan'
    }
  ]
}

const courses = [
  {
    id: 1,
    name: 'Algebra 1',
    type: 'Algebra',
    estimatedTime: '24hours',
    difficulty: 'hard',
    image: '/src/assets/online-course-icon.svg',
    description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc.',
    authors: [
      {
        id: '1',
        name: 'Shariful Rahi'
      },
      {
        id: '2',
        name: 'Rahi Khan'
      }
    ],
    lessonCount: 10,
    quizCount: 4,
    completed: 80
  },
  {
    id: 2,
    name: 'Algebra II',
    type: 'Algebra',
    estimatedTime: '3hours',
    image: '/src/assets/online-course-icon.svg',
    description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc.',
    authors: [
      {
        id: '1',
        name: 'Shariful Rahi'
      },
      {
        id: '2',
        name: 'Rahi Khan'
      }
    ],
    quizCount: 4,
    lessonCount: 10,
    completed: 50
  },
  {
    id: 3,
    name: 'Fractions',
    type: 'Algebra',
    estimatedTime: '4hours',
    image: '/src/assets/online-course-icon.svg',
    description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc.',
    authors: [
      {
        id: '1',
        name: 'Shariful Rahi'
      },
      {
        id: '2',
        name: 'Rahi Khan'
      }
    ],
    lessonCount: 10,
    quizCount: 4,
    completed: 20
  },
  {
    id: 4,
    name: 'Euclidean Geometry',
    type: 'Geometry',
    estimatedTime: '10hours',
    image: '/src/assets/online-course-icon.svg',
    description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc.',
    authors: [
      {
        id: '1',
        name: 'Shariful Rahi'
      },
      {
        id: '2',
        name: 'Rahi Khan'
      }
    ],
    lessonCount: 10,
    quizCount: 4,
    completed: 80
  },
  {
    id: 5,
    name: 'Coordinate Geometry',
    type: 'Geometry',
    estimatedTime: '8hours',
    image: '/src/assets/online-course-icon.svg',
    description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc.',
    authors: [
      {
        id: '1',
        name: 'Shariful Rahi'
      },
      {
        id: '2',
        name: 'Rahi Khan'
      }
    ],
    lessonCount: 10,
    quizCount: 4,
    completed: 100
  },
  {
    id: 6,
    name: 'Basic Counting',
    type: 'Combinatorics and Probability',
    estimatedTime: '9hours',
    image: '/src/assets/online-course-icon.svg',
    description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc.',
    authors: [
      {
        id: '1',
        name: 'Shariful Rahi'
      },
      {
        id: '2',
        name: 'Rahi Khan'
      }
    ],
    lessonCount: 10,
    quizCount: 4,
    completed: 80
  },
  {
    id: 7,
    name: 'statistics',
    type: 'Combinatorics and Probability',
    estimatedTime: '1hours',
    image: '/src/assets/online-course-icon.svg',
    description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc.',
    authors: [
      {
        id: '1',
        name: 'Shariful Rahi'
      },
      {
        id: '2',
        name: 'Rahi Khan'
      }
    ],
    lessonCount: 10,
    quizCount: 4,
    completed: 80
  }
]

export async function getCourse (courseId) {
  await fakeNetwork()
  console.log(courseId)
  return course
}

export async function getCourses (query) {
  await fakeNetwork()
  console.log(courses)
  console.log(courses)
  console.log(courses)
  return courses
}

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}
