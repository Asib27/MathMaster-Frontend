import { redirect, useLoaderData } from 'react-router-dom'
import { getRole } from '../../services/authService'

export async function loader ({ params }) {
  const role = await getRole()

  if (role !== 'admin') {
    return redirect('/login')
  }

  const courseType = params.courseType

  return { courseType }
}

export default function AdminCourseStat () {
  const { courseType } = useLoaderData()

  return (
    <div>
      {courseType}
    </div>
  )
}
