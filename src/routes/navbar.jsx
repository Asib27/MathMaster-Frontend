import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { getRole, isAuthenticated, logout } from '../services/authService'

export async function loader ({ params }) {
  const authenticated = await isAuthenticated()
  const role = await getRole()
  return { authenticated, role }
}

export default function Navbar () {
  const location = useLocation()
  const navigate = useNavigate()
  const { authenticated, role } = useLoaderData()
  console.log(role)

  return (
    <header className='w-full flex items-center justify-between bg-zinc-700 text-white p-2'>
      <div className='flex items-center gap-6'>
        <Link to='/' className='text-2xl'>MathMaster</Link>
        <Link to='home'> Home</Link>
        <Link to='courses'> Courses </Link>
        {location.pathname === '/' && <a href='/#features'> Features </a>}
        <Link to='definitions'>Definitions</Link>
      </div>
      {authenticated
        ? (
          <div>
            <div
              className='cursor-pointer' onClick={async () => {
                await logout()
                navigate('/')
              }}
            > Logout
            </div>
          </div>
          )

        : (
          <div className='flex gap-6 pr-3'>
            <Link to='login'> Login</Link>
            <Link to='signup'> Register</Link>
          </div>
          )}
    </header>
  )
}
