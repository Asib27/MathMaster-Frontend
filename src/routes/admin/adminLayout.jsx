import { NavLink, Outlet, redirect } from 'react-router-dom'
import { getRole } from '../../services/authService'

export async function loader () {
  const role = await getRole()

  if (role !== 'admin') {
    return redirect('/login')
  }

  return {}
}

export default function AdminLayout () {
  return (
    <div className='flex flex-nowrap'>
      <div className='m-20'>
        <SideNavLinks name='Home' route='home' className='border-b-2 border-gray-300 text-center text-2xl  w-96 m-3' />
        <SideNavLinks name='Courses' route='courses' className='border-b-2 border-gray-300 text-center text-2xl  w-96 m-3' />
        <SideNavLinks name='Authors' route='courses' className='border-b-2 border-gray-300 text-center text-2xl  w-96 m-3' />
        <SideNavLinks name='Users' route='users' className='border-b-2 border-gray-300 text-center text-2xl  w-96 m-3' />
      </div>
      <div className='grow m-20 overflow-hidden'>
        <Outlet />
      </div>
    </div>
  )
}

function SideNavLinks ({ name, route, className }) {
  return (
    <div className={className}>
      <NavLink
        to={route}
        className={({ isActive, isPending }) => isActive
          ? 'bg-violet-500 text-white '
          : isPending
            ? ''
            : ''}
      >
        <div className='bg-inherit rounded-md text-center p-2'>{name}</div>
      </NavLink>
    </div>
  )
}
