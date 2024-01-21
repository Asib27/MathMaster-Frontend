import { useEffect, useRef, useState } from 'react'
import DoneIconSVG from '../svgs/doneIconSVG'
import MDXViewer from '../MDXViewer'

export function TextEditorForm ({ text, setText, setIsViewMode }) {
  const [inPreview, setInPreview] = useState(false)
  const textareaRef = useRef(null)
  const [cursor, setCursor] = useState({
    start: text.length,
    end: text.length
  })

  useEffect(() => {
    textareaRef.current.setSelectionRange(cursor.start, cursor.end)
    textareaRef.current.focus()
  }, [cursor])

  const italicText = () => {
    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd
    if (start !== end) {
      const newText = text.substring(0, start) + '*' + text.substring(start, end) + '*' + text.substring(end)
      setText(newText)
      setCursor({
        start: start + 1,
        end: end + 1
      })
    } else {
      const newText = text.substring(0, start) + '**' + text.substring(end)
      setText(newText)
      setCursor({
        start: start + 1,
        end: start + 1
      })
    }
  }

  const boldText = () => {
    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd
    if (start !== end) {
      const newText = text.substring(0, start) + '**' + text.substring(start, end) + '**' + text.substring(end)
      setText(newText)
      setCursor({
        start: start + 2,
        end: end + 2
      })
    } else {
      const newText = text.substring(0, start) + '****' + text.substring(end)
      setText(newText)
      setCursor({
        start: start + 2,
        end: start + 2
      })
    }
  }

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

            {!inPreview && (
              <div className='flex items-center space-x-1 rtl:space-x-reverse sm:pe-4'>
                <button
                  type='button'
                  className='p-2  text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
                  onClick={() => boldText()}
                >
                  <p className='font-bold text-xl'>B</p>
                  <span className='sr-only'>Bold</span>
                </button>

                <button
                  type='button'
                  className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
                  onClick={() => italicText()}
                >
                  <p className='italic font-serif text-2xl'>I</p>
                  <span className='sr-only'>Italic</span>
                </button>

                <button
                  type='button'
                  className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
                  onClick={() => {
                    setText(text + '## ')
                    textareaRef.current.focus()
                  }}
                >
                  <p className='font-extrabold text-xl'>H</p>
                  <span className='sr-only'>Heading</span>
                </button>

              </div>
            )}

            {!inPreview && (
              <div className='flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4'>
                <button type='button' className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'>
                  <svg className='w-4 h-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 21 18'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4' />
                  </svg>
                  <span className='sr-only'>Add list</span>
                </button>
              </div>
            )}
          </div>

          <button
            type='button'
            data-tooltip-target='tooltip-fullscreen'
            className='p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
            onClick={() => setIsViewMode(true)}
          >
            <DoneIconSVG className='h-5 w-5' />
            <span className='sr-only'>Done</span>
          </button>
          <div id='tooltip-fullscreen' role='tooltip' className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'>
            Done Editing
            <div className='tooltip-arrow' datapopperarrow='true' />
          </div>
        </div>

        <div className=''>
          {inPreview
            ? (
              <div className='px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800 text-sm'>
                <MDXViewer data={text} />
              </div>
              )
            : (
              <div className='px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800'>
                <label htmlFor='editor' className='sr-only'>Write text</label>
                <textarea
                  id='editor'
                  ref={textareaRef}
                  rows='8'
                  onKeyDown={(event) => {
                    if (event.ctrlKey && (event.key === 'B' || event.key === 'b')) {
                      boldText()
                    } else if (event.ctrlKey && (event.key === 'I' || event.key === 'i')) {
                      italicText()
                    } else if (event.ctrlKey && (event.key === 'Enter')) {
                      setInPreview(!inPreview)
                    }
                  }}
                  className='block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:outline-none dark:text-white dark:placeholder-gray-400' placeholder='Write an article...' required value={text} onChange={(event) => setText(event.target.value)}
                />
              </div>
              )}
        </div>
      </div>
    </form>
  )
}
