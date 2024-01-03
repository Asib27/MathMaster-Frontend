import { Link, useLoaderData } from 'react-router-dom'
import Lesson from '../pages/lesson'
import { getLesson } from '../services/lessonService'

// TODO: Add upvote and completed
export async function loader ({ params }) {
  const lesson = await getLesson(params.lessonId)
  return { lesson }
}

export default function Lessons () {
  const { lesson } = useLoaderData()

  return (
    <div className='p-10'>
      <h2 className='text-3xl'> {lesson.name}</h2>
      <div className='flex gap-2'>
        {lesson.authors.map(author => (
          <Link to={`/authors/${author.id}`} className='underline' key={author.id}>{author.name}</Link>
        ))}

      </div>
      <Lesson data={lesson.content} />
    </div>
  )
}
