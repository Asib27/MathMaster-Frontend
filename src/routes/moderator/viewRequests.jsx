import { redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { getRole } from '../../services/authService'
import { getRequest, submitFeedback } from '../../services/modService'
import MDXViewer from '../../components/MDXViewer'
import { useState } from 'react'

export async function loader ({ params }) {
  const role = await getRole()

  if (role !== 'moderator') {
    return redirect('/login')
  }

  const request = await getRequest(params.requestId)

  return { request: request[0], requestId: params.requestId }
}

export default function ViewRequests () {
  const { request, requestId } = useLoaderData()
  const [feedback, setFeedback] = useState('')

  const navigate = useNavigate()

  return (
    <div className='px-40 py-32 flex flex-col gap-5'>
      {
        request.request_type === 'lesson' && (
          <div>
            <p className='text-2xl'> {`Course Name : ${request.content.courseName}`}</p>
            <p className='text-2xl'> {`Topic Name : ${request.content.topicName}`}</p>
            <p className='text-2xl'> {`Lesson Name : ${request.content.lessonName}`}</p>
            <div>
              <p className='text-l'> {`Abstraction Level : ${request.content.abstractionLevel}`}</p>
              <p className='text-l'> {`Language : ${request.content.language}`}</p>
            </div>
            <MDXViewer data={request.content.lessonContent} />
          </div>
        )
      }
      {
        request.request_type === 'quiz' && (
          <div>
            <p className='text-2xl'> {`Course Name : ${request.content.courseName}`}</p>
            <p className='text-2xl'> {`Topic Name : ${request.content.topicName}`}</p>
            <p className='text-2xl'> {`Lesson Name : ${request.content.quizName}`}</p>
            <div className='py-2'>
              <p className='text-l'> {`Language : ${request.content.language}`}</p>
            </div>
            <MDXViewer data={request.content.quizContent} />
          </div>
        )
      }
      {
        request.request_type === 'definition' && (
          <div>
            <p className='text-2xl'> {`Definition of : ${request.content.name}`}</p>
            <div className='py-2'>
              <p className='text-l'> {`Language : ${request.content.language}`}</p>
            </div>
            <MDXViewer data={request.content.content} />
          </div>
        )
      }

      <div>
        <h4 className='text-xl'> Feedback</h4>
        <textarea
          value={feedback}
          onChange={(event) => {
            setFeedback(event.target.value)
          }}
          rows='10'
          className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>
      <div className='flex'>
        <button
          type='submit'
          className='w-full mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
          onClick={async () => {
            if (feedback !== '') { await submitFeedback(requestId, feedback) }
            navigate('/moderator/home')
          }}
        > Reject
        </button>
        <button
          type='submit'
          className='w-full mt-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
          onClick={async () => {
            if (feedback !== '') { await submitFeedback(requestId, feedback) }
            navigate('/moderator/home')
          }}
        > Accept
        </button>
      </div>

    </div>
  )
}
