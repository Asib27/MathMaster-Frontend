import { Form, NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { getDefinitions } from '../services/definitionService,js'
import { useEffect } from 'react'

export async function loader ({ params, request }) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search')

  const defs = await getDefinitions(search)

  return { defs, search }
}

export default function Definitions () {
  const { defs, search } = useLoaderData()

  useEffect(() => {
    document.getElementById('search').value = search
  }, [search])

  return (
    <div className='grid grid-cols-[35%_65%] gap-20 m-10'>
      <div className='flex flex-col ml-10 mt-10'>
        <Form className='mb-4' id='search-form' role='search'>
          <label htmlFor='search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>Search Definition</label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
              </svg>
            </div>

            <input
              type='search'
              id='search'
              name='search'
              aria-label='search definition'
              className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
              placeholder='Search Definition'
              defaultValue={search}
              required
            />
            <button type='submit' className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Search</button>
          </div>
        </Form>

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
