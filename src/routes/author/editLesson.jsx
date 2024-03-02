import { Form, redirect, useLoaderData } from 'react-router-dom'
import { editLesson, getLesson } from '../../services/lessonService'
import { useState } from 'react'
import EditTitleForm from '../../components/editing/EditTitkeForm'
import { TextEditor } from '../../components/editing/TextEditor'
import Lesson from '../../pages/lesson'
import { getRole } from '../../services/authService'

export async function action ({ params }) {
  return redirect(`/author/courses/${params.courseId}/lessons/${params.lessonId}`)
  // return {}
}

export async function loader ({ params }) {
  const role = await getRole()
  if (role === 'author') {
    const fullLesson = await getLesson(params.lessonId)
    const lesson = {
      id: fullLesson.id,
      name: fullLesson.name ?? fullLesson.id,
      content: fullLesson.content,
      language: fullLesson.language ?? 'English',
      abstractionLevel: fullLesson.abstractionLevel ?? 'Novice'
    }
    return { lesson }
  } else {
    return redirect('/login')
  }
}

export default function EditLesson () {
  const { lesson } = useLoaderData()

  const lessonFragment = lesson.content.split('\n\n\n').filter(t => t !== '').map((lesson, idx) => {
    return { lesson, idx }
  })

  const [curLesson, setCurLesson] = useState(lessonFragment)
  const [lessonTitle, setLessonTitle] = useState(lesson.name)
  const [lessonLanguage, setLessonLanguage] = useState(lesson.language)
  const [abstractionLevel, setAbstractionLevel] = useState(lesson.abstractionLevel)
  const [nextIdx, setNextIdx] = useState(lessonFragment.length + 1)
  const [isPreview, setIsPreview] = useState(false)

  // useEffect(() => {
  //   const func = async () => {
  //     const full_lesson = getLessonForAuthor(lesson.id, lessonLanguage, abstractionLevel)
  //   }
  // }, [lessonLanguage, abstractionLevel])

  const updateLesson = (idx) => {
    return ({ lesson, remove }) => {
      if (remove) {
        const newLessons = curLesson.filter((cur) => {
          return idx !== cur.idx
        })
        setCurLesson(newLessons)
      } else {
        const newLessons = curLesson.map((cur) => {
          if (idx === cur.idx) {
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

  const getEditedLesson = () => {
    return {
      id: lesson.id,
      name: lessonTitle,
      content: curLesson.map(t => t.lesson).join('\n\n\n'),
      abstractionLevel,
      language: lessonLanguage
    }
  }

  const submitLesson = async () => {
    const newLesson = getEditedLesson()
    await editLesson(lesson.id, newLesson)
  }

  if (!isPreview) {
    return (
      <div className='p-10 flex flex-col gap-2'>
        <EditTitleForm lessonTitle={lessonTitle} setLessonTitle={setLessonTitle} />

        <div className='grid grid-cols-4 gap-4 py-5'>
          <h4 className='text-xl'> Select Language</h4>
          <select
            value={lessonLanguage}
            onChange={(event) => {
              setLessonLanguage(event.target.value)
            }}
            className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            <option value='English'>English</option>
            <option value='Bangla'>Bangla</option>
          </select>

          <h4 className='text-xl text-nowrap'> Select Abstraction Level</h4>
          <select
            value={abstractionLevel}
            onChange={(event) => {
              setAbstractionLevel(event.target.value)
            }}
            className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            <option value='Novice'>Novice</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Expert'>Expert</option>
          </select>
        </div>

        {
          curLesson.map((text, idx) => {
            // return <MDXViewer key={idx} data={text} />
            return <TextEditor key={text.idx} lesson={text.lesson} updateLesson={updateLesson(text.idx)} />
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
        <PreviewAndSubmitButton />
      </div>
    )
  } else {
    return (
      <div>
        <Lesson lesson={getEditedLesson()} />
        <PreviewAndSubmitButton />
      </div>
    )
  }

  function PreviewAndSubmitButton () {
    return (
      <div className='flex gap-2 pb-5'>
        <button
          type='button'
          className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
          onClick={() => setIsPreview(!isPreview)}
        > {!isPreview ? 'Preview' : 'Edit'}
        </button>
        <Form method='POST' className='grow flex'>
          <button
            type='submit'
            className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow'
            onClick={async () => {
              await submitLesson()
            }}
          > Submit
          </button>
        </Form>

      </div>
    )
  }
}
