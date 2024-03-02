import { Form, Link, Outlet, redirect, useLoaderData } from 'react-router-dom'
import { getCourse } from '../../services/courseService'
import { getRole } from '../../services/authService'
import { createTopic } from '../../services/topicService'
import { createLesson, createQuiz } from '../../services/authorservice'

export async function action ({ req, params }) {
  return redirect(`/author/courses/${params.courseId}`)
}

export async function loader ({ params }) {
  const auth = await getRole()
  if (auth !== 'author') {
    return redirect('/login')
  }
  const course = await getCourse(params.courseId)
  return { course }
}

export default function AuthorCourse () {
  const { course } = useLoaderData()
  const outline = course.content

  return (
    <div className='flex flex-row gap-x-5 pl-10'>
      <div className='basis-1/4 pt-16'>
        <h3 className='text-4xl p-3'>Course Outline</h3>
        <div className='pl-3'>
          {outline.map(topic => (
            <div key={topic.id} className='text-2xl py-5 '>
              <Link to={`topics/${topic.id}`}>
                <p className='p-2 border-b-2 border-zinc-800 hover:bg-zinc-100 hover:text-slate-800'>{topic.name}</p>
              </Link>
              <div className='pl-8 pt-3'>

                {topic.lessons.map(lesson => (
                  <div key={lesson.id} className='flex items-center py-2 border-b-2 border-zinc-200 hover:bg-zinc-100 hover:text-slate-800'>
                    {lesson.completed
                      ? (
                        <svg className='w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                        </svg>
                        )
                      : (
                        <svg className='w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                        </svg>
                        )}
                    <Link to={`lessons/${lesson.id}`}>
                      {lesson.name}
                    </Link>
                  </div>
                ))}

                <div className='flex items-center text-zinc-500 py-2 text-2xl border-b-2 border-zinc-200 hover:bg-zinc-100'>
                  <svg className='2-3.5 h-3.5 me-2 ' fill='#71717a' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 45.402 45.402' xmlSpace='preserve'><g id='SVGRepo_bgCarrier' strokeWidth='0' /><g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' /><g id='SVGRepo_iconCarrier'> <g> <path d='M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z' /> </g> </g></svg>
                  <Form method='POST'>
                    <button onClick={async () => await createLesson()} className='text-xl text-zinc-500'>Add Lesson</button>
                  </Form>
                </div>
              </div>
              <div className='pl-8 pb-2'>
                {topic.quizes.map(quiz => (
                  <div key={quiz.id} className='flex items-center py-2 border-b-2 border-zinc-200 hover:bg-zinc-100 hover:text-slate-800'>
                    {quiz.completed
                      ? (
                        <svg className='w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                        </svg>
                        )
                      : (
                        <svg className='w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                        </svg>
                        )}
                    <Link to={`quizes/${quiz.id}`}>
                      {quiz.name}
                    </Link>
                  </div>
                ))}
                <div className='flex items-center text-zinc-500 text-2xl py-2 border-b-2 border-zinc-200 hover:bg-zinc-100 '>
                  <svg className='2-3.5 h-3.5 me-2 ' fill='#71717a' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 45.402 45.402' xmlSpace='preserve'><g id='SVGRepo_bgCarrier' strokeWidth='0' /><g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' /><g id='SVGRepo_iconCarrier'> <g> <path d='M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z' /> </g> </g></svg>
                  <Form method='POST'>
                    <button onClick={async () => await createQuiz()} className='text-xl text-zinc-500'>Add Quiz</button>
                  </Form>
                </div>
              </div>
            </div>
          ))}
          <div className='mb-10 p-2 flex items-center border-b-2 border-zinc-800 hover:bg-zinc-100 '>
            <svg className='2-3.5 h-3.5 me-2 ' fill='#71717a' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 45.402 45.402' xmlSpace='preserve'><g id='SVGRepo_bgCarrier' strokeWidth='0' /><g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' /><g id='SVGRepo_iconCarrier'> <g> <path d='M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z' /> </g> </g></svg>
            <Form method='POST'>
              <button onClick={async () => await createTopic()} className='text-xl text-zinc-500'>Add Topic</button>
            </Form>
          </div>

        </div>
      </div>
      <div className='basis-3/4'>
        <Outlet />
      </div>
    </div>
  )
}
