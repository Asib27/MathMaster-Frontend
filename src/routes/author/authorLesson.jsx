import { redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Lesson from '../../pages/lesson'
import { getLesson, markAsCompleted, submitLessonRating } from '../../services/lessonService'
import { getRole } from '../../services/authService'

export async function loader ({ params }) {
  const auth = await getRole()
  if (auth !== 'author') {
    return redirect('/login')
  }

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

export default function AuthorLessons () {
  const { lesson } = useLoaderData()
  const navigate = useNavigate()

  return (
    <div className='p-10'>
      <Lesson lesson={lesson} />
      <button
        className='mt-10  w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg'
        onClick={() => navigate('edit')}
      > Edit Lesson
      </button>
    </div>
  )
}
