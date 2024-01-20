import { useLoaderData } from 'react-router-dom'
import { getLesson } from '../services/lessonService'
import { useState } from 'react'
import EditTitleForm from '../components/editing/EditTitkeForm'
import Markdown from 'react-markdown'
import Latex from '../components/mathRender/Latex'
import { TextEditorForm } from '../components/editing/TextEditorForm'

export async function loader ({ params }) {
  const lesson = await getLesson(params.lessonId)
  return { lesson }
}

function TextEditor ({ lesson }) {
  const [text, setText] = useState('')
  const [isViewMode, setIsViewMode] = useState(true)

  if (isViewMode) {
    return (
      <div className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
        <div className='flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600'>
          <div className='h-25 flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600'>
            <div className='p-2 flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4'>
              <button
                type='button'
                className='p-2 w-20 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
                onClick={() => setIsViewMode(false)}
              >
                <p>Edit</p>
                <span className='sr-only'>Edit</span>
              </button>
              <button
                type='button'
                className='p-2 w-20 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
              >
                <p>Delete</p>
                <span className='sr-only'>Delete</span>
              </button>
            </div>
          </div>
        </div>
        <div className='px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800 text-sm'>
          <Latex><Markdown>{text}</Markdown></Latex>
        </div>
      </div>
    )
  } else {
    return (
      <TextEditorForm text={text} setText={setText} setIsViewMode={setIsViewMode} />
    )
  }
}

export default function EditLesson () {
  const { lesson } = useLoaderData()
  const [curLesson, setCurLesson] = useState(lesson)
  console.log(curLesson)

  return (
    <div className='p-10'>
      <EditTitleForm curLesson={curLesson} setCurLesson={setCurLesson} />
      <TextEditor />
    </div>
  )
}
