import { useLoaderData } from 'react-router-dom'
import { getCourses } from '../services/courseService'
import CourseCard from '../components/courseCard'

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
                    <CourseCard key={course.id} course={course} />
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
