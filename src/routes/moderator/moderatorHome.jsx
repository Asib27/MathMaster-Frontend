import { redirect, useLoaderData } from 'react-router-dom'
import { getRole, getUserData } from '../../services/authService'
import { getCourses } from '../../services/courseService'
import CourseAccordion from '../../components/courseAccordion'

export async function loader () {
  const role = await getRole()

  if (role !== 'moderator') {
    return redirect('/login')
  }

  const myCourses = await getCourses({ published: 'false' })
  const allCourses = await getCourses()
  const profile = await getUserData()

  return { myCourses, allCourses, profile }
}

export default function ModeratorHome () {
  const { myCourses, allCourses, profile } = useLoaderData()
  return (
    <div className='px-40 py-32'>
      <div className='flex justify-between items-center mb-20'>
        <div className='m-auto'>
          <div className='flex items-center gap-10'>
            <img src={profile.picture} className='w-28 h-28 rounded-full' alt='avatar' />
            <p className='text-2xl text-center'> {profile.name}</p>
          </div>
        </div>
      </div>

      <CourseAccordion courses={myCourses} name='Pending Reviews' link='/author/courses' />
      <CourseAccordion courses={allCourses} name='All Courses' link='/author/courses' />
    </div>
  )
}
