import { redirect, useLoaderData } from 'react-router-dom'
import { getRole } from '../../services/authService'
import { getAdminUserStat } from '../../services/statService'
import ChartViewer from '../../components/stats/chartViewer'
import { useState } from 'react'
import StatViewer from '../../components/statViewer'

export async function loader () {
  const role = await getRole()

  if (role !== 'admin') {
    return redirect('/login')
  }

  const userStat = await getAdminUserStat()

  return { userStat }
}

export default function AdminUserStat () {
  const [chartData, setChartData] = useState({ chartName: 'newUser', chartTitle: 'New User' })
  const { userStat } = useLoaderData()

  const nameMap = {
    newUser: 'New User',
    onlineUser: 'Online User',
    completion: 'Completion Rate',
    avgLogin: 'Avg Login',
    avgStreak: 'Avg Streak',
    avgTime: 'Avg time'
  }

  return (
    <div className='flex flex-col gap-10 grow'>
      <StatViewer nameMap={nameMap} setChartData={setChartData} stat={userStat} />

      <ChartViewer {...chartData} />
    </div>
  )
}
