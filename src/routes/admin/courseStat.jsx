import { redirect, useLoaderData } from 'react-router-dom'
import { getRole } from '../../services/authService'
import { getCourses } from '../../services/courseService'
import CourseCardShort from '../../components/courseCardShort'
import SerachBar from '../../components/searchBar'

export async function loader ({ params, request }) {
  const role = await getRole()

  if (role !== 'admin') {
    return redirect('/login')
  }

  const url = new URL(request.url)
  const search = url.searchParams.get('search')
  console.log(search)

  const courseType = params.courseType
  const courses = await getCourses('type=courseType')

  return { courseType, courses, search }
}

export default function AdminCourseStat () {
  const { courses, search } = useLoaderData()

  return (
    <div className='w-full'>
      <SerachBar search={search} />
      <div className='flex flex-nowrap gap-5 overflow-x-scroll no-scrollbar'>
        {courses.map(course => {
          return (
            <CourseCardShort key={course.id} course={course} />
          )
        })}
      </div>
    </div>
  )
}
