import { Link } from 'react-router-dom'

export default function Courses () {
  const courses = [
    {
      id: 1,
      name: 'Algebra 1',
      type: 'Algebra',
      estimatedTime: '24hours',
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

  const courseTypes = courses.map(course => course.type)
  const uniqueCourseTypes = [...new Set(courseTypes)]

  return (
    <div className='m-20'>
      {
        uniqueCourseTypes.map((type, index) => {
          return (
            <div key={index}>
              <h3 className='text-3xl'> {type} </h3>
              <div className='flex flex-nowrap overflow-x-scroll no-scrollbar'>

                {courses.filter(course => course.type === type).map(course => {
                  return (
                    <Link key={course.id} to={`/courses/${course.id}`}>
                      <div className='inline-block p-10 basis-1/3 min-w-96'>
                        <div className='rounded overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out'>
                          <img className='w-full' src={course.image} alt='Course Image' />
                          <div className='flex gap-2 px-6 py-2'>
                            {course.authors.map(author => (
                              <Link to={`/authors/${author.id}`} className='underline' key={author.id}>{author.name}</Link>
                            ))}
                          </div>

                          <div className='px-6 py-4'>
                            <div className='font-bold text-xl mb-2'>{course.name}</div>

                            <p className='text-gray-700 text-base'>
                              {course.description}
                            </p>
                          </div>
                          <div className='px-6 pt-4 pb-2'>
                            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>{course.estimatedTime}</span>
                            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>{course.lessonCount + ' lessons'}</span>
                            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>{course.completed + '% completed'}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
