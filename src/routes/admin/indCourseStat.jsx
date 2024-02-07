import { useState } from 'react'
import { getIndividyalCourseStat } from '../../services/statService'
import StatViewer from '../../components/statViewer'
import ChartViewer from '../../components/stats/chartViewer'
import SideBySideRankViewer from '../../components/stats/sideBySideRankViewer'
import { useLoaderData } from 'react-router-dom'
import DetailedRatingViewer from '../../components/stats/detailedRatingViewer'

export async function loader ({ params }) {
  const courseId = params.courseId
  const stat = await getIndividyalCourseStat(courseId)
  return { stat, courseId }
}

export default function AdminIndCourseStat () {
  const [chartData, setChartData] = useState({ chartName: 'enrollment', chartTitle: 'Enrollment' })

  const { stat, courseId } = useLoaderData()
  const nameMap = {
    enrollment: 'enrollment',
    avgTimeSpent: 'Avg Time spent',
    progressRate: 'Progress Rate',
    upVote: 'Upvote',
    downVote: 'Downvote',
    problemSolved: 'Problem Solved'
  }

  return (
    <div>
      <h3 className='text-2xl my-10'>{`${stat.name} Analytics`}</h3>
      <StatViewer nameMap={nameMap} setChartData={setChartData} stat={stat} />

      <ChartViewer {...chartData} />

      <div className='my-10'>
        <SideBySideRankViewer
          topName='Lesson Engagement'
          list1Name='Top 5 Engagement'
          list2Name='Least 5 Engagement'
          data={stat.lessonEngagement}
          countPrefix='Clicks'
          linkPrefix={`/courses/${courseId}/lessons`}
        />
      </div>

      <h3 className='text-2xl my-10 mx-10'>Ratings</h3>
      <div className='mx-10'>
        <DetailedRatingViewer ratings={stat.ratings} />
      </div>

    </div>
  )
}
