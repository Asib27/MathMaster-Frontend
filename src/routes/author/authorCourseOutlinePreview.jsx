import { redirect, useLoaderData } from 'react-router-dom'
import AuthorList from '../../components/authorList'
import { enrollCourse, getCourseOutline, rateCourse } from '../../services/courseService'
import DetailedRatingViewer from '../../components/stats/detailedRatingViewer'
import { getRole } from '../../services/authService'

export async function loader ({ params }) {
  const auth = await getRole()
  if (auth !== 'author') {
    return redirect('/login')
  }

  const course = await getCourseOutline(params.courseId)
  return { course }
}

export async function action ({ request, params }) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  console.log(intent)
  if (intent === 'enroll') {
    await enrollCourse(params.courseId)
  } else if (intent === 'rating') {
    await rateCourse(params.courseId, formData.get('stars'))
  }

  return redirect(`/courses/${params.courseId}`)
}

export default function AuthorCourseOutlinePreview () {
  const { course } = useLoaderData()

  return (
    <div className='p-10 m-20'>
      <img className='w-44' src={course.image} />
      <p className='text-3xl px-5 mt-5'> {course.name}</p>
      <p className='text-zinc-700 pl-5'>{course.type}</p>
      <AuthorList className='pl-5 text-zinc-700' links>{course.authors}</AuthorList>
      <p className='pl-5 text-zinc-700'> {`${course.enrollmentCount} Enrolled | ${course.estimatedTime} Hours`}</p>

      <p className='pl-5 mt-10 mr-1 text-justify text-zinc-700'>{course.description}</p>

      <DetailedRatingViewer ratings={course.ratings} />

      <button
        type='button'
        className='w-full mt-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
        onClick={async () => {}}
      > Edit
      </button>
    </div>
  )
}
