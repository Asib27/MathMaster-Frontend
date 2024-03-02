import { redirect, useLoaderData } from 'react-router-dom'
import { getRole, getUserData } from '../../services/authService'
import { getCourses } from '../../services/courseService'
import CourseAccordion from '../../components/courseAccordion'
import { getAuthorStat } from '../../services/statService'
import DetailedRatingViewer from '../../components/stats/detailedRatingViewer'

export async function loader () {
  const role = await getRole()

  if (role !== 'author') {
    return redirect('/login')
  }

  const myCourses = await getCourses({ author: 'me' })
  const allCourses = await getCourses()
  const profile = await getUserData()
  const authorStat = await getAuthorStat()

  return { myCourses, allCourses, profile, authorStat }
}

export default function AuthorHome () {
  const { myCourses, allCourses, profile, authorStat } = useLoaderData()
  console.log(authorStat)
  return (
    <div className='px-40 py-32'>
      <div className='flex justify-between items-center mb-20'>
        <div className=''>
          <img src={profile.picture} className='w-20 h-20 rounded-full' alt='avatar' />
          <p className='text-xl'> {profile.name}</p>
          {/* <p className='text-xl'> {`🔥 ${userStats.totalXp}`} </p> */}
        </div>

        <div className='pr-10 '>
          <button
            onClick={() => { }}
            className='w-96 text-blue-800 border-blue-700 border-2 hover:border-blue-800 hover:bg-zinc-100  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Create New Definition
          </button>

          <button
            onClick={() => { }}
            className='w-96 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Create New Course
          </button>
        </div>
      </div>

      <div className='flex gap-10 items-center justify-around'>
        <div className='content-center'>
          <p className='text-2xl'>Your Courses</p>
          <p className='text-3xl text-center'>{authorStat.courses_count}</p>
        </div>

        <div className='content-center'>
          <p className='text-2xl'>Total Enroll</p>
          <p className='text-3xl text-center'>{authorStat.total_enroll}</p>
        </div>

        <DetailedRatingViewer ratings={authorStat.ratings} />
      </div>

      <CourseAccordion courses={myCourses} name='My Courses' link='/author/courses' />
      <CourseAccordion courses={allCourses} name='All Courses' link='/author/courses' />
    </div>
  )
}
