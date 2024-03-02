import { redirect, useLoaderData } from 'react-router-dom'
import { enrollCourse, getCourseOutline, rateCourse } from '../../services/courseService'
import { getRole } from '../../services/authService'
import { useState } from 'react'
import EditTitleForm from '../../components/editing/EditTitkeForm'

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

export default function AuthorCourseOutline () {
  const { course } = useLoaderData()
  const [name, setName] = useState(course.name)
  const [type, setType] = useState(course.type)
  const [estimatedTime, setEstimatedTime] = useState(course.estimatedTime)
  const [description, setDescription] = useState(course.description)

  return (
    <div className='p-10 m-20'>
      <img className='w-44' src={course.image} />
      <EditTitleForm lessonTitle={name} setLessonTitle={setName} />

      <div>
        <h4 className='text-l'> Select Type</h4>
        <select
          value={type}
          onChange={(event) => {
            setType(event.target.value)
          }}
          className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          <option value='algebra'>Algebra</option>
          <option value='geometry'>Geometry</option>
          <option value='number_theory'>Number Theory</option>
          <option value='combinatorics'>Combinatorics</option>
        </select>
      </div>

      <div>
        <h4 className='text-l'> Select Estimated Time</h4>
        <input
          value={estimatedTime}
          onChange={(event) => {
            setEstimatedTime(event.target.value)
          }}
          className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>

      <div>
        <h4 className='text-l'> Description</h4>
        <textarea
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
          }}
          rows='10'
          className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>

      <button
        type='button'
        className='w-full mt-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
        onClick={async () => {}}
      > Submit
      </button>
    </div>
  )
}
