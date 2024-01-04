import { Link, useLoaderData } from 'react-router-dom'
import { getCourses } from '../services/courseService'
import AuthorList from '../components/authorList'

export async function loader ({ params }) {
  const courses = await getCourses()
  console.log(courses)
  return { courses }
}

export default function Courses () {
  const { courses } = useLoaderData()

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
                      <div className='inline-block p-10 basis-1/3 w-96'>
                        <div className='rounded overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out'>
                          <img className='w-full' src={course.image} alt='Course Image' />
                          <AuthorList className='px-6 py-2'>{course.authors}</AuthorList>
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
