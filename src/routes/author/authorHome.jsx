import { Link, redirect } from 'react-router-dom'
import { getRole } from '../../services/authService'

export async function loader () {
  const role = await getRole()

  if (role !== 'author') {
    return redirect('/login')
  }

  return {}
}

export default function AuthorHome () {
  // const _ = useLoaderData()

  return (
    <div>
      <p>Author Home</p>
      <Link
        to='/courses/1/lessons/1/edit'
        className='cursor-pointer underline text-blue-600'
      >Edit Lesson
      </Link>
    </div>
  )
}
