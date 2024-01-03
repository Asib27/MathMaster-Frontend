import { Outlet } from 'react-router-dom'

export default function Root () {
  return (
    <>
      <div className='w-screen min-h-28 bg-slate-500 text-5xl text-center'>Header</div>
      <div>
        <Outlet />
      </div>
      <div className='w-screen min-h-60 bg-black text-white text-5xl text-center'> Footer</div>
    </>
  )
}
