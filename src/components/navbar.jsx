import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getRole, logout } from '../services/authService'
import { useEffect, useState } from 'react'

export async function loader ({ params }) {
  return { }
}

export default function Navbar () {
  const [role, setRole] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const func = async () => {
      const r = await getRole()
      console.log(r)
      setRole(r)
    }

    func()
  }, [location.pathname])

  return (
    <header className='w-full flex items-center justify-between bg-zinc-700 text-white p-2'>
      <div className='flex items-center gap-6'>
        <Link to='/' className='text-2xl'>MathMaster</Link>

        {/* Home Links */}
        {role === 'user' && <Link to='home'> Home</Link>}
        {role === 'author' && <Link to='author/home'> Home</Link>}
        {role === 'moderator' && <Link to='moderator/home'> Home</Link>}
        {role === 'admin' && <Link to='admin/home'> Home</Link>}

        {role && <Link to='courses'> Courses </Link>}
        {role && <Link to='definitions'>Definitions</Link>}
        {location.pathname === '/' && <a href='/#features'> Features </a>}
        {location.pathname === '/' && <a href='/#footer'> About </a>}
      </div>
      {role
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
