import { Link, useLoaderData } from 'react-router-dom'
import { getCourses } from '../services/courseService'
import CourseCard from '../components/courseCard'

export async function loader ({ params }) {
  const courses = await getCourses()
  return { courses }
}

export default function Home () {
  const { courses } = useLoaderData()
  return (
    <div>
      Home Page

      <p className='text-3xl'> Continue Learning</p>
      <div className='flex flex-nowrap overflow-x-scroll no-scrollbar'>
        {courses.map(course => {
          return (
            <CourseCard key={course.id} course={course} />
          )
        })}
      </div>

      <p className='text-3xl'> Recommended Course</p>
      <div className='flex flex-nowrap overflow-x-scroll no-scrollbar'>
        {courses.map(course => {
          return (
            <CourseCard key={course.id} course={course} />
          )
        })}
      </div>

      <Link className='w-full text-center'>
        
        <div className='m-4  w-19 bg-blue-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-lg'>Browse All Course</div>
      </Link>
    </div>
  )
}
