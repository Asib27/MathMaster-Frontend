import { redirect, useLoaderData } from 'react-router-dom'
import { getRole } from '../../services/authService'
import { getUnpublished } from '../../services/modService'

export async function loader () {
  const role = await getRole()

  if (role !== 'moderator') {
    return redirect('/login')
  }

  const unpublished = await getUnpublished()

  return { unpublished }
}

export default function ViewRequests () {
  const { unpublished } = useLoaderData()
  return (
    <div className='px-40 py-32'>

      <p className='text-2xl my-2'>Lessons</p>
      <div className='flex flex-col gap-2'>
        {
          unpublished.filter(u => u.request_type === 'lesson').length === 0 && (
            <div className='p-5 flex justify-between items-center bg-zinc-100 h-16 hover:bg-zinc-200'>
              <p className='text-xl'>No Unpublished Lesson</p>
            </div>
          )
        }
        {
          unpublished.filter(u => u.request_type === 'lesson').map((u, idx) => {
            return (
              <div key={idx} className='p-5 flex justify-between items-center bg-zinc-100 h-16 hover:bg-zinc-200'>
                <p className='text-xl'>{u.content.lessonName}</p>
                <p className='text-xl'>{u.author_feedback}</p>
              </div>
            )
          })
        }
      </div>

      <p className='text-2xl my-2'>Quiz</p>
      <div className='flex flex-col gap-2'>
        {
          unpublished.filter(u => u.request_type === 'quiz').length === 0 && (
            <div className='p-5 flex justify-between items-center bg-zinc-100 h-16 hover:bg-zinc-200'>
              <p className='text-xl'>No Unpublished quiz</p>
            </div>
          )
        }
        {
          unpublished.filter(u => u.request_type === 'quiz').map((u, idx) => {
            return (
              <div key={idx} className='p-5 flex justify-between items-center bg-zinc-100 h-16 hover:bg-zinc-200'>
                <p className='text-xl'>{u.content.quizName}</p>
                <p className='text-xl'>{u.author_feedback}</p>
              </div>
            )
          })
        }
      </div>

      <p className='text-2xl my-2'>Definitions</p>
      <div className='flex flex-col gap-2'>
        {
          unpublished.filter(u => u.request_type === 'definition').length === 0 && (
            <div className='p-5 flex justify-between items-center bg-zinc-100 h-16 hover:bg-zinc-200'>
              <p className='text-xl'>No Unpublished definition</p>
            </div>
          )
        }
        {
          unpublished.filter(u => u.request_type === 'definition').map((u, idx) => {
            return (
              <div key={idx} className='p-5 flex justify-between items-center bg-zinc-100 h-16 hover:bg-zinc-200'>
                <p className='text-xl'>{u.content.name}</p>
                <p className='text-xl'>{u.author_feedback}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
