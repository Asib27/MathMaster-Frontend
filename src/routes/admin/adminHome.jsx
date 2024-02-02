import { Link, redirect, useLoaderData } from 'react-router-dom'
import { getRole } from '../../services/authService'
import { getAdminHomeStat, getDataForChart } from '../../services/statService'
import CanvasJSReact from '@canvasjs/react-charts'
import { useEffect, useState } from 'react'

export async function loader () {
  const role = await getRole()

  if (role !== 'admin') {
    return redirect('/login')
  }

  const stat = await getAdminHomeStat()

  return { stat }
}

function RankViewer ({ data, name, countPrefix, linkPrefix }) {
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

function SideBySideRankViewer ({
  topName,
  list1Name,
  list2Name,
  data,
  countPrefix,
  linkPrefix
}) {
  return (
    <div className='px-10'>
      <h1 className='text-2xl border-b-4 border-blue-600 pb-3'>{topName}</h1>
      <div className='flex gap-5'>
        <RankViewer
          data={data.top5}
          name={list1Name}
          countPrefix={countPrefix}
          linkPrefix={linkPrefix}
        />

        <RankViewer
          data={data.least5}
          name={list2Name}
          countPrefix={countPrefix}
          linkPrefix={linkPrefix}
        />
      </div>
    </div>
  )
}

function ChartViewer ({ chartName, chartTitle }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(null)

    getDataForChart(chartName).then(result => {
      const data = result.map(r => {
        return {
          x: new Date(r.x),
          y: r.y
        }
      })

      setData(data)
    })
  }, [])

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2', // "light1", "dark1", "dark2"
    title: {
      text: `${chartTitle}`
    },
    axisY: {
      includeZero: true
    },
    axisX: {
      valueFormatString: 'DD MMM' // move comma to change formatting
    },
    data: [{
      type: 'line', // change type to bar, line, area, pie, etc
      // indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: '#5A5757',
      indexLabelPlacement: 'outside',
      dataPoints: data
    }]
  }

  return (
    <div className='p-5'>
      {
        data
          ? <CanvasJSReact.CanvasJSChart options={options} />
          : (
            <div className='flex flex-col items-center gap-4 h-20 border-2 border-gray-300 rounded-lg'>
              <p className='text-pretty text-lg'>Loading Data, Please Wait</p>
              <div role='status'>
                <svg aria-hidden='true' className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
                  <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
                </svg>
                <span class='sr-only'>Loading...</span>
              </div>
            </div>
            )
      }

    </div>
  )
}

export default function AdminHome () {
  const chartidxToName = {
    0: { chartName: 'newUser', chartTitle: 'New User' },
    1: { chartName: 'enrollment', chartTitle: 'New Enrolled' },
    2: { chartName: 'avgLogin', chartTitle: 'Avg Login' }
  }
  const [chartIndex, setChartIndex] = useState(0)
  const { stat } = useLoaderData()

  return (
    <div className='flex flex-col gap-10 grow'>
      <div className='flex grow h-24 gap-2 items-center bg-zinc-300 rounded-3xl justify-around'>
        <div className='text-center cursor-pointer' onClick={() => setChartIndex(0)}>
          <p>New User</p>
          <div className='flex flex-row '>
            <p>{`${stat.newUser.count}`}</p>
          </div>
        </div>

        <div className='text-center cursor-pointer' onClick={() => setChartIndex(1)}>
          <p>New Enrolled</p>
          <p>{`${stat.enrollment.count}`}</p>
        </div>

        <div className='text-center cursor-pointer' onClick={() => setChartIndex(2)}>
          <p>Avg Login</p>
          <p>{`${stat.avgLogin.count} `}</p>
        </div>
      </div>

      <ChartViewer {...chartidxToName[chartIndex]} />

      <div className='flex flex-col gap-10'>
        <SideBySideRankViewer
          topName='Course Engagement'
          list1Name='Top 5 Engagement'
          list2Name='Least 5 Engagement'
          data={stat.courseEngagement}
          countPrefix='Clicks'
          linkPrefix='/courses'
        />

        <SideBySideRankViewer
          topName='Course Likes'
          list1Name='Top 5 Likes'
          list2Name='Least 5 Likes'
          data={stat.likedCourse}
          countPrefix='Likes'
          linkPrefix='/courses'
        />

        <SideBySideRankViewer
          topName='Course Completed'
          list1Name='Top 5 completion'
          list2Name='Least 5 completion'
          data={stat.completedCourse}
          countPrefix='Completion'
          linkPrefix='/courses'
        />

        <SideBySideRankViewer
          topName='Liked Author'
          list1Name='Top 5 liked author'
          list2Name='Least 5 liked author'
          data={stat.mostLikedAuthor}
          countPrefix='Likes'
          linkPrefix='/authors'
        />
      </div>

    </div>
  )
}
