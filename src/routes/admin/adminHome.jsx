import { redirect, useLoaderData } from 'react-router-dom'
import { getRole } from '../../services/authService'
import { getAdminHomeStat } from '../../services/statService'
import { useState } from 'react'
import SideBySideRankViewer from '../../components/stats/sideBySideRankViewer'
import ChartViewer from '../../components/stats/chartViewer'
import StatViewer from '../../components/statViewer'

export async function loader () {
  const role = await getRole()

  if (role !== 'admin') {
    return redirect('/login')
  }

  const stat = await getAdminHomeStat()

  return { stat }
}

export default function AdminHome () {
  const [chartData, setChartData] = useState({ chartName: 'newUser', chartTitle: 'New User' })

  const { stat } = useLoaderData()
  const nameMap = {
    newUser: 'New User',
    enrollment: 'New Enrolled',
    avgLogin: 'Avg Login'
  }

  return (
    <div className='flex flex-col gap-10 grow'>
      <StatViewer nameMap={nameMap} setChartData={setChartData} stat={stat} />

      <ChartViewer {...chartData} />

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
