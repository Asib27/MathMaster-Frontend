import { useState } from 'react'
import EditTitleForm from '../../components/editing/EditTitkeForm.jsx'
import { newDefinition } from '../../services/definitionService.js'

export default function NewDefinition () {
  const [name, setName] = useState('untitled')
  const [content, setContent] = useState('')
  const [language, setLanguage] = useState('English')

  return (
    <div className='m-10 flex flex-col gap-5 px-10'>
      <EditTitleForm lessonTitle={name} setLessonTitle={setName} />

      <div>
        <h4 className='text-xl'> Content</h4>
        <textarea
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
          }}
          rows='10'
          className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>

      <h4 className='text-xl'> Select Language</h4>
      <select
        value={language}
        onChange={(event) => {
          setLanguage(event.target.value)
        }}
        className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        <option value='English'>English</option>
        <option value='Bangla'>Bangla</option>
      </select>

      <button
        type='button'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
        onClick={async () => {
          await newDefinition({
            name, content, language
          })
        }}
      > Create Definition
      </button>
    </div>
  )
}
