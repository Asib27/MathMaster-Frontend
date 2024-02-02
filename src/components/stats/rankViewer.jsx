import { Link } from 'react-router-dom'

export default function RankViewer ({ data, name, countPrefix, linkPrefix }) {
  return (
    <div className='grow'>
      <div class='bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-8'>
        <div class='bg-gray-100 py-2 px-4'>
          <h2 class='text-xl font-semibold text-gray-800'>{name}</h2>
        </div>
        <ul class='divide-y divide-gray-200'>
          {
            data.map((entry, idx) => {
              return (
                <li key={idx} className='flex items-center py-4 px-6'>
                  <span className='text-gray-700 text-lg font-medium mr-4'>{`${idx + 1}.`}</span>
                  <div className='flex justify-between w-full'>
                    <Link to={linkPrefix + '/' + entry.id}>
                      <h3 className='text-lg font-medium text-gray-800'>{entry.name}</h3>
                    </Link>
                    <p className='text-gray-600 text-base'>{entry.count + ' ' + countPrefix}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
