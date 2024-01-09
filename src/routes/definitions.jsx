import { Link, Outlet, useLoaderData } from 'react-router-dom'
import { getDefinitions } from '../services/definitionService,js'

export async function loader ({ params }) {
  const defs = await getDefinitions()

  return { defs }
}

export default function Definitions () {
  const { defs } = useLoaderData()

  return (
    <div className='grid grid-cols-[40%_60%] m-10'>
      <div className='flex flex-col'>
        {defs.map((def, idx) => {
          return <Link to={`/definitions/${def.id}`} key={idx}>{def.name}</Link>
        })}
      </div>
      <Outlet />
    </div>
  )
}
