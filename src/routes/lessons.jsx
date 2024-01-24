import { Form, Link, redirect, useLoaderData } from 'react-router-dom'
import Lesson from '../pages/lesson'
import { getLesson, markAsCompleted, submitLessonRating } from '../services/lessonService'
import RatingForm from '../components/ratingForm'

export async function loader ({ params }) {
  const lesson = await getLesson(params.lessonId)
  return { lesson }
}

export async function action ({ request, params }) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  if (intent === 'rating') {
    await submitLessonRating(params.lessonId, formData.get('stars'))
  } else if (intent === 'completed') {
    await markAsCompleted(params.lessonId)
  }

  return redirect(`/courses/${params.courseId}/lessons/${params.lessonId}`)
}

export default function Lessons () {
  const { lesson } = useLoaderData()

  return (
    <div className='p-10'>
      <Lesson lesson={lesson} />

      <Form method='post'>
        <button
          className='mt-10  w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg'
          type='submit' name='intent' value='completed'
        >{lesson.isCompleted ? 'Mark As Incomplete' : 'Mark As complete'}
        </button>
      </Form>

      <RatingForm rating={lesson.myRating} className='mt-10' />
    </div>
  )
}
