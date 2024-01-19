import { useLoaderData } from 'react-router-dom'
import { getLesson } from '../services/lessonService'
import { useState } from 'react'
import EditTitleForm from '../components/editing/EditTitkeForm'

export async function loader ({ params }) {
  const lesson = await getLesson(params.lessonId)
  return { lesson }
}

export default function EditLesson () {
  const { lesson } = useLoaderData()
  const [curLesson, setCurLesson] = useState(lesson)
  console.log(curLesson)

  return (
    <div className='p-10'>
      <EditTitleForm curLesson={curLesson} setCurLesson={setCurLesson} />
    </div>
  )
}
