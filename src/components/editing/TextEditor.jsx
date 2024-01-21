import { useEffect, useState } from 'react'
import { TextEditorForm } from './TextEditorForm'
import MDXViewer from '../MDXViewer'

export function TextEditor ({ lesson, updateLesson }) {
  const [text, setText] = useState(lesson)
  const [isViewMode, setIsViewMode] = useState(true)

  useEffect(() => {
    updateLesson({ lesson: text })
  }, [text])
  if (isViewMode) {
    return (
      <div className='mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
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
                onClick={() => updateLesson({ remove: true })}
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
          <div className=''>
            <MDXViewer data={text} />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <TextEditorForm text={text} setText={setText} setIsViewMode={setIsViewMode} />
    )
  }
}
