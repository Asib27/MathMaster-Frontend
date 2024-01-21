import { useLoaderData } from 'react-router-dom'
import { getLesson } from '../services/lessonService'
import { useCallback, useState } from 'react'
import EditTitleForm from '../components/editing/EditTitkeForm'
import { TextEditor } from '../components/editing/TextEditor'

export async function loader ({ params }) {
  const lesson = await getLesson(params.lessonId)
  return { lesson }
}

export default function EditLesson () {
  const { lesson } = useLoaderData()

  const lessonFragment = lesson.content.split('\n\n\n').filter(t => t !== '').map((lesson, idx) => {
    return { lesson, idx }
  })

  const [curLesson, setCurLesson] = useState(lessonFragment)
  const [lessonTitle, setLessonTitle] = useState(lesson.name)
  const [nextIdx, setNextIdx] = useState(lessonFragment.length + 1)

  const updateLesson = (idx) => {
    return ({ lesson, remove }) => {
      if (remove) {
        const newLessons = curLesson.filter((cur, index) => {
          return idx !== index
        })
        setCurLesson(newLessons)
      } else {
        const newLessons = curLesson.map((cur, index) => {
          if (idx === index) {
            return {
              lesson,
              idx: cur.idx
            }
          } else return cur
        })
        setCurLesson(newLessons)
      }
    }
  }

  const submitLesson = () => {
    const newLesson = curLesson.map(t => t.lesson).join('\n\n\n')
    console.log(newLesson)
  }

  return (
    <div className='p-10 flex flex-col gap-2'>
      <EditTitleForm lessonTitle={lessonTitle} setLessonTitle={setLessonTitle} />
      {
        curLesson.map((text, idx) => {
          // return <MDXViewer key={idx} data={text} />
          return <TextEditor key={text.idx} lesson={text.lesson} updateLesson={updateLesson(idx)} />
        })
      }
      <div className='flex'>
        {/* <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>ReactJS Dropdown</option>
                <option>Laravel 9 with React</option>
                <option>React with Tailwind CSS</option>
                <option>React With Headless UI</option>
            </select>     */}

        <button
          type='button'
          onClick={() => {
            setCurLesson(curLesson.concat({
              lesson: '',
              idx: nextIdx
            }))
            setNextIdx(nextIdx + 1)
          }}
          className=' border-4 border-green-700 hover:border-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
        >Add Section
        </button>
      </div>
      <div className='flex gap-2'>
        <button type='button' className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'>Preview</button>
        <button
          type='button'
          className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
          onClick={() => submitLesson()}
        > Submit
        </button>

      </div>
    </div>
  )
}
