import { NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { getDefinitions } from '../services/definitionService.js'
import SerachBar from '../components/searchBar.jsx'

export async function loader ({ params, request }) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search')

  const defs = await getDefinitions(search)

  return { defs, search }
}

export default function Definitions () {
  const { defs, search } = useLoaderData()

  return (
    <div className='grid grid-cols-[35%_65%] gap-20 m-10'>
      <div className='flex flex-col ml-10 mt-10'>
        <SerachBar search={search} />

        <div className='overflow-y-scroll min-h-96 no-scrollbar'>
          {defs.map((def, idx) => {
            return (
              <div key={idx} className='my-1 mx-2'>
                <NavLink
                  to={`/definitions/${def.id}`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'bg-violet-500 text-white'
                      : isPending
                        ? ''
                        : ''}
                >
                  <div className='bg-inherit p-1 rounded-md'>{def.name}</div>
                </NavLink>
              </div>
            )
          })}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
