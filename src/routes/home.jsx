import { Link, useLoaderData } from 'react-router-dom'
import { getCourses } from '../services/courseService'
import CourseCard from '../components/courseCard'

export async function loader ({ params }) {
  const courses = await getCourses()

  return {
    continueCourse: courses,
    recommendateCourse: courses
  }
}

// TODO : track progress, settings, user Profile data

function Last7Days () {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const result = []

  const d = new Date()
  for (let i = 0; i < 7; i++) {
    d.setDate(d.getDate() - i)
    result.push(days[d.getDay()])
  }

  return result
}

export default function Home () {
  const { continueCourse, recommendateCourse } = useLoaderData()
  const profile = {
    image: '/src/assets/male_avatar.svg',
    name: 'Shariful Islam Khan',
    id: 10
  }

  const userStats = {
    totalXp: 510,
    dailyXp: [
      10, 10, 16, 0, 10, 15
    ],
    enrolled: 3,
    problemSolved: 64,
    lessonsCompleted: 4
  }

  const days = Last7Days()

  return (
    <div className='m-20'>
      <div className='flex items-center gap-4 m-10'>
        <img src={profile.image} className='w-20 h-20 rounded-full' alt='avatar' />
        <div>
          <p className='text-xl'> {profile.name}</p>
          <p className='text-xl'> {`🔥 ${userStats.totalXp}`} </p>
        </div>
        <div className='flex-grow' />
        <div className='flex gap-4'>
          {
            userStats.dailyXp.map((xp, idx) => {
              return (
                <div key={idx} className='w-14 h-20 py-4 text-center bg-zinc-300 rounded-3xl'>
                  <p> {days[idx]} </p>
                  <p> {xp} </p>
                </div>
              )
            })
          }

        </div>
      </div>

      <div className='flex m-10 h-24 gap-2 items-center bg-zinc-300 rounded-3xl justify-around'>
        <div className='text-center'>
          <p>Enrolled</p>
          <p>{`${userStats.enrolled} Courses`}</p>
        </div>

        <div className='text-center'>
          <p>Solved</p>
          <p>{`${userStats.problemSolved} Problems`}</p>
        </div>

        <div className='text-center'>
          <p>Completed</p>
          <p>{`${userStats.lessonsCompleted} Courses`}</p>
        </div>
      </div>

      <p className='text-3xl my-10'> Continue Learning</p>
      <div className='flex flex-nowrap overflow-x-scroll no-scrollbar'>
        {continueCourse.map(course => {
          return (
            <CourseCard key={course.id} course={course} />
          )
        })}
      </div>

      <p className='text-3xl my-10'> Recommended Course</p>
      <div className='flex flex-nowrap overflow-x-scroll no-scrollbar'>
        {recommendateCourse.map(course => {
          return (
            <CourseCard key={course.id} course={course} />
          )
        })}
      </div>

      <Link className='w-full text-center'>
        <div className='my-10 h-10  w-19 text-center p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg'>Browse All Course</div>
      </Link>
    </div>
  )
}
