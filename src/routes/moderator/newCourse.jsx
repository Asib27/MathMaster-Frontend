import { redirect, useNavigate } from 'react-router-dom'
import { getRole } from '../../services/authService'
import EditTitleForm from '../../components/editing/EditTitkeForm'
import { useState } from 'react'
import { createNewCourse } from '../../services/modService'

export async function action ({ params }) {
  return {}
}

export async function loader ({ params }) {
  const auth = await getRole()
  if (auth !== 'moderator') {
    return redirect('/login')
  }

  return { }
}

export default function NewCourse () {
  const [name, setname] = useState('Untitled')
  const [description, setDescription] = useState('')
  const [language, setLanguage] = useState('English')
  const [type, setType] = useState('Algebra')
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [level, setLevel] = useState('Novice')
  const [author, setAuthor] = useState('')

  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-5 p-52'>
      <h2 className='text-2xl'>Add New Course</h2>
      <EditTitleForm lessonTitle={name} setLessonTitle={setname} />

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

      <div>
        <h4 className='text-l'> Description</h4>
        <textarea
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
          }}
          rows='10'
          className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>

      <h4 className='text-xl'> Select Type</h4>
      <select
        value={type}
        onChange={(event) => {
          setType(event.target.value)
        }}
        className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        <option value='Algebra'>Algrbra</option>
        <option value='Geometry'>Geometry</option>
        <option value='Calculus'>Calculus</option>
      </select>

      <div>
        <h4 className='text-l'> Select Estimated Time</h4>
        <input
          value={estimatedTime}
          onChange={(event) => {
            setEstimatedTime(event.target.value)
          }}
          className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>

      <h4 className='text-xl'> Select Level</h4>
      <select
        value={level}
        onChange={(event) => {
          setLevel(event.target.value)
        }}
        className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        <option value='Beginner'>Beginner</option>
        <option value='Intermediate'>Intermediate</option>
        <option value='Hard'>Hard</option>
      </select>

      <div>
        <h4 className='text-l'> Select Author</h4>
        <input
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value)
          }}
          className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>

      <button
        type='submit'
        className='w-full mt-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
        onClick={async () => {
          await createNewCourse({
            name,
            description,
            language,
            type,
            estimatedTime,
            level
          }, author)
          navigate('/moderator/home')
        }}
      > Save
      </button>
    </div>
  )
}
