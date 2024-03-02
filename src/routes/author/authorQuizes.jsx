import { useLoaderData } from 'react-router-dom'
import { editQuiz, getQuizStat, getQuizes } from '../../services/quizService'
import EditTitleForm from '../../components/editing/EditTitkeForm'
import { useState } from 'react'
import { TextEditor } from '../../components/editing/TextEditor'

export async function loader ({ params }) {
  const quizesStr = await getQuizes(params.quizId)
  const quizes = quizesStr.split('\n\n\n').map((quiz, idx) => {
    return {
      quiz: '```question\n' + quiz + '\n```',
      idx
    }
  })
  const quizStat = await getQuizStat(params.quizId)
  return { quizes, quizStat, quizId: params.quizId }
}

export default function AuthorQuizesEdit () {
  const { quizes, quizStat, quizId } = useLoaderData()
  const [name, setName] = useState(quizStat.name)
  const [score, setScore] = useState(quizStat.score)
  const [xp, setXp] = useState(quizStat.xp)
  const [quizesState, setQuizesState] = useState(quizes)
  const [nextIdx, setNextIdx] = useState(quizes.length)

  // const navigate = useNavigate()

  const updateQuiz = (idx) => {
    return ({ lesson, remove }) => {
      if (remove) {
        const newQuizes = quizesState.filter((cur) => {
          return idx !== cur.idx
        })
        setQuizesState(newQuizes)
      } else {
        const newQuizes = quizesState.map((cur) => {
          if (idx === cur.idx) {
            return {
              quiz: lesson,
              idx: cur.idx
            }
          } else return cur
        })
        setQuizesState(newQuizes)
      }
    }
  }

  return (
    <div className='p-10 flex flex-col gap-5'>
      <EditTitleForm lessonTitle={name} setLessonTitle={setName} />
      <div>
        <h4 className='text-l'> Select Score</h4>
        <input
          value={score}
          onChange={(event) => {
            setScore(event.target.value)
          }}
          className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>
      <div>
        <h4 className='text-l'> Select XP</h4>
        <input
          value={xp}
          onChange={(event) => {
            setXp(event.target.value)
          }}
          className='col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </div>
      {
        quizesState.length === 0 && (
          <div className='flex items-center justify-center h-36  border-2 border-zinc-400 rounded-3xl'>
            <p className='text-xl text-zinc-500'> No Questions Yet</p>
          </div>
        )
      }
      {
        quizesState.map((quiz) => {
          return (
            <div key={quiz.idx}>
              <TextEditor key={quiz.idx} lesson={quiz.quiz} updateLesson={updateQuiz(quiz.idx)} />
            </div>
          )
        })
      }

      <button
        type='button'
        onClick={() => {
          setQuizesState(quizesState.concat({
            quiz: '',
            idx: nextIdx
          }))
          setNextIdx(nextIdx + 1)
        }}
        className='w-full border-4 border-green-700 hover:border-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
      >Add New Question
      </button>

      <button
        type='button'
        onClick={async () => {
          await editQuiz(quizId, {
            name,
            score,
            xp,
            content: quizesState.map(q => q.quiz).join('\n\n\n')
          })

          // navigate(-1)
        }}
        className='w-full border-4 border-green-700 hover:border-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
      >Submit
      </button>
    </div>
  )
}
