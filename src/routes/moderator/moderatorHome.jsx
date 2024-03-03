import { Link, redirect, useLoaderData } from 'react-router-dom'
import { getRole, getUserData } from '../../services/authService'
import { getUnpublished } from '../../services/modService'

export async function loader () {
  const role = await getRole()

  if (role !== 'moderator') {
    return redirect('/login')
  }

  const unpublished = await getUnpublished()
  const profile = await getUserData()

  return { unpublished, profile }
}

export default function ModeratorHome () {
  const { unpublished, profile } = useLoaderData()
  return (
    <div className='px-40 py-32'>
      <div className='flex justify-between items-center mb-20'>
        <div className='m-auto'>
          <div className='flex items-center gap-10'>
            <img src={profile.picture} className='w-28 h-28 rounded-full' alt='avatar' />
            <p className='text-2xl text-center'> {profile.name}</p>
          </div>
        </div>
      </div>

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
              <Link to={`/moderator/requests/${u.edit_request_id}`} key={idx}>
                <div className='p-5 flex justify-between items-center bg-zinc-100 h-16 hover:bg-zinc-200'>
                  <p className='text-xl'>{u.content.lessonName}</p>
                  <p className='text-xl'>{u.author_feedback}</p>
                </div>
              </Link>
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
              <Link to={`/moderator/requests/${u.edit_request_id}`} key={idx}>
                <div className='p-5 flex justify-between items-center bg-zinc-100 h-16 hover:bg-zinc-200'>
                  <p className='text-xl'>{u.content.quizName}</p>
                  <p className='text-xl'>{u.author_feedback}</p>
                </div>
              </Link>
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
              <Link to={`/moderator/requests/${u.edit_request_id}`} key={idx}>
                <div key={idx} className='p-5 flex justify-between items-center bg-zinc-100 h-16 hover:bg-zinc-200'>
                  <p className='text-xl'>{u.content.name}</p>
                  <p className='text-xl'>{u.author_feedback}</p>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}
