import { redirect, useLoaderData } from 'react-router-dom'
import { getRole } from '../../services/authService'
import { getAdminHomeStat } from '../../services/statService'
import { useState } from 'react'
import SideBySideRankViewer from '../../components/stats/sideBySideRankViewer'
import ChartViewer from '../../components/stats/chartViewer'

export async function loader () {
  const role = await getRole()

  if (role !== 'admin') {
    return redirect('/login')
  }

  const stat = await getAdminHomeStat()

  return { stat }
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
