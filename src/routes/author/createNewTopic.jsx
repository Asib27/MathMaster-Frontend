import { Form, redirect, useLoaderData } from 'react-router-dom'
import { getRole } from '../../services/authService'
import { editTopic, getTopic } from '../../services/topicService'
import EditTitleForm from '../../components/editing/EditTitkeForm'
import { useState } from 'react'

export async function action ({ params }) {
  return {}
}

export async function loader ({ params }) {
  const auth = await getRole()
  if (auth !== 'author') {
    return redirect('/login')
  }

  const topic = await getTopic(params.topicId)
  return { topic, topicId: params.topicId }
}

export default function CreateNewTopic () {
  const { topic, topicId } = useLoaderData()
  const [name, setname] = useState(topic.name)
  const [description, setDescription] = useState(topic.description)
  const [language, setLanguage] = useState('English')

  return (
    <div className='flex flex-col gap-5 p-10'>
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

      <Form method='POST'>
        <button
          type='submit'
          className='w-full mt-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
          onClick={async () => {
            await editTopic(topicId, {
              id: topicId,
              name,
              description,
              language
            })
          }}
        > Save
        </button>
      </Form>
    </div>
  )
}
