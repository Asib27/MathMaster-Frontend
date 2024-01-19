import { useLoaderData } from 'react-router-dom'
import { getLesson } from '../services/lessonService'
import { useRef, useState } from 'react'
import EditTitleForm from '../components/editing/EditTitkeForm'
import DoneIconSVG from '../components/svgs/doneIconSVG'
import Markdown from 'react-markdown'
import Latex from '../components/mathRender/Latex'

export async function loader ({ params }) {
  const lesson = await getLesson(params.lessonId)
  return { lesson }
}

function TextEditor ({ lesson }) {
  const [text, setText] = useState('')
  const [inPreview, setInPreview] = useState(false)
  const textareaRef = useRef(null);

  return (
    <form>
      <div className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
        <div className='flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600'>
          <div className='h-25 flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600'>

            <div className='p-2 flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4'>
              <button
                type='button'
                className='p-2 w-20 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
                onClick={() => setInPreview(!inPreview)}
              >
                <p>{!inPreview ? 'preview' : 'Edit'}</p>
                <span className='sr-only'>Add list</span>
              </button>
            </div>

            {
              !inPreview && (
                <div className='flex items-center space-x-1 rtl:space-x-reverse sm:pe-4'>
                  <button
                    type='button' 
                    className='p-2  text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
                    onClick={() => {
                      textareaRef.current.focus()
                      setText(text + '****')
                    }}
                  >
                    <p className='font-bold text-xl'>B</p>
                    <span className='sr-only'>Bold</span>
                  </button>

                  <button 
                    type='button' 
                    className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
                    onClick={() => {
                      textareaRef.current.focus()
                      setText(text + '**')
                    }}
                  >
                    <p className='italic font-serif text-2xl'>I</p>
                    <span className='sr-only'>Italic</span>
                  </button>

                  <button
                    type='button'
                    className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
                    onClick={() => {
                      textareaRef.current.focus()
                      setText(text + '## ')
                    }}
                  >
                    <p className='font-extrabold text-xl'>H</p>
                    <span className='sr-only'>Heading</span>
                  </button>

                </div>
              )
            }

            {
              !inPreview && (
                <div className='flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4'>
                  <button type='button' className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'>
                    <svg className='w-4 h-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 21 18'>
                      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4' />
                    </svg>
                    <span className='sr-only'>Add list</span>
                  </button>
                </div>
              )
            }
          </div>

          <button type='button' data-tooltip-target='tooltip-fullscreen' className='p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'>
            <DoneIconSVG className='h-5 w-5' />
            <span className='sr-only'>Done</span>
          </button>
          <div id='tooltip-fullscreen' role='tooltip' className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'>
            Done Editing
            <div className='tooltip-arrow' datapopperarrow='true' />
          </div>
        </div>

        {
          inPreview
            ? (
              <div className='px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800 text-sm'>
                <Latex><Markdown>{text}</Markdown></Latex>
              </div>
              )
            : (
              <div className='px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800'>
                <label htmlFor='editor' className='sr-only'>Write text</label>
                <textarea id='editor' ref={textareaRef} rows='8' className='block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:outline-none dark:text-white dark:placeholder-gray-400' placeholder='Write an article...' required value={text} onChange={(event) => setText(event.target.value)} />
              </div>
              )
        }
      </div>
    </form>

  )
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
