import { useLoaderData } from 'react-router-dom'
import { getOverallCourseStat } from '../../services/statService'
import { useState } from 'react'
import StatViewer from '../../components/statViewer'
import ChartViewer from '../../components/stats/chartViewer'
import SideBySideRankViewer from '../../components/stats/sideBySideRankViewer'

export async function loader () {
  const stat = await getOverallCourseStat()
  return { stat }
}

export default function AdminIndCourseStatIndex () {
  const [chartData, setChartData] = useState({ chartName: 'enrollment', chartTitle: 'Enrollment' })

  const { stat } = useLoaderData()
  const nameMap = {
    enrollment: 'Enrollment',
    avgTimeSpent: 'Avg Time spent',
    progressRate: 'Progress Rate',
    upVote: 'Upvote',
    downVote: 'Downvote',
    problemSolved: 'Problem Solved'
  }

  return (
    <div>
      <h3 className='text-2xl my-10'>Overall Course Analytics</h3>
      <StatViewer nameMap={nameMap} setChartData={setChartData} stat={stat} />

      <ChartViewer {...chartData} />

      <div className='my-10'>
        <SideBySideRankViewer
          topName='Course Engagement'
          list1Name='Top 5 Engagement'
          list2Name='Least 5 Engagement'
          data={stat.courseEngagement}
          countPrefix='Clicks'
          linkPrefix='/courses'
        />
      </div>
    </div>
  )
}
