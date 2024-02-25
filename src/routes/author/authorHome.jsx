import { Link, redirect, useLoaderData } from 'react-router-dom'
import { getRole, getUserData } from '../../services/authService'
import { getCourses } from '../../services/courseService'
import CourseAccordion from '../../components/courseAccordion'

export async function loader () {
  const role = await getRole()

  if (role !== 'author') {
    return redirect('/login')
  }

  const myCourses = await getCourses({ author: 'me' })
  const allCourses = await getCourses()
  const profile = await getUserData()

  console.log(profile)

  return { myCourses, allCourses }
}

export default function AuthorHome () {
  const { myCourses, allCourses } = useLoaderData()

  return (
    <div className='p-20'>
      <p>Author Home</p>

      <CourseAccordion courses={myCourses} name='My Courses' />
      <CourseAccordion courses={allCourses} name='All Courses' />

      <Link
        to='/courses/1/lessons/1/edit'
        className='cursor-pointer underline text-blue-600'
      >Edit Lesson
      </Link>
    </div>
  )
}
