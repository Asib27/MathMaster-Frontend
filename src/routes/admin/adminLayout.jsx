import { Link, Outlet, redirect } from 'react-router-dom'
import { getRole } from '../../services/authService'

export async function loader () {
  const role = await getRole()
  console.log(role)

  if (role !== 'admin') {
    return redirect('/login')
  }

  return {}
}

export default function AdminLayout () {
  return (
    <div className='flex '>
      <div className=''>
        <Link to='home'>Home</Link>
        <Link to='stat/algebra'>Algebra</Link>
        <Link to='stat/geometry'>Geometry</Link>
        <Link to='stat/calculus'>Calculus</Link>
        <Link to='users'>Users</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
