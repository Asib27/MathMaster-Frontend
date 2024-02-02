import { redirect } from 'react-router-dom'
import { getRole } from '../../services/authService'

export async function loader () {
  const role = await getRole()

  if (role !== 'admin') {
    return redirect('/login')
  }

  return {}
}

export default function AdminHome () {
  return (
    <div>
      Home
    </div>
  )
}
