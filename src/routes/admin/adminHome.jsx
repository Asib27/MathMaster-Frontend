import { Link, redirect, useLoaderData } from 'react-router-dom'
import { getRole } from '../../services/authService'
import { getAdminHomeStat } from '../../services/statService'
import CanvasJSReact from '@canvasjs/react-charts'

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

function ChartViewer () {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2', // "light1", "dark1", "dark2"
    title: {
      text: 'Simple Column Chart with Index Labels'
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: 'line', // change type to bar, line, area, pie, etc
      // indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: '#5A5757',
      indexLabelPlacement: 'outside',
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 71 },
        { x: 60, y: 68 },
        { x: 70, y: 38 },
        { x: 80, y: 92 },
        { x: 90, y: 54 },
        { x: 100, y: 60 },
        { x: 110, y: 21 },
        { x: 120, y: 49 },
        { x: 130, y: 36 }
      ]
    }]
  }

  return (
    <CanvasJSReact.CanvasJSChart options={options} />
  )
}

export default function AdminHome () {
  const { stat } = useLoaderData()

  return (
    <div className='flex flex-col grow'>
      <div className='flex grow m-10 h-24 gap-2 items-center bg-zinc-300 rounded-3xl justify-around'>
        <div className='text-center'>
          <p>New User</p>
          <div className='flex flex-row '>
            <p>{`${stat.newUser.count}`}</p>
          </div>
        </div>

        <div className='text-center'>
          <p>New Enrolled</p>
          <p>{`${stat.enrollment.count}`}</p>
        </div>

        <div className='text-center'>
          <p>Avg Login</p>
          <p>{`${stat.avgLogin.count} `}</p>
        </div>
      </div>

      <ChartViewer />

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
