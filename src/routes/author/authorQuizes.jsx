import { useLoaderData } from 'react-router-dom'
import { getQuizStat, getQuizes } from '../../services/quizService'
import EditTitleForm from '../../components/editing/EditTitkeForm'
import { useState } from 'react'
import { TextEditor } from '../../components/editing/TextEditor'

export async function loader ({ params }) {
  const quizesStr = await getQuizes(params.quizId)
  const quizes = quizesStr.split('\n\n\n').map((quiz, id) => {
    return {
      quiz: '```question\n' + quiz + '\n```',
      id
    }
  })
  const quizStat = await getQuizStat(params.quizId)
  return { quizes, quizStat, quizId: params.quizId }
}

export default function AuthorQuizes () {
  const { quizes, quizStat } = useLoaderData()
  const [name, setName] = useState(quizStat.name)
  const [score, setScore] = useState(quizStat.score)
  const [xp, setXp] = useState(quizStat.xp)
  const [quizesState, setQuizesState] = useState(quizes)

  const updateQuiz = (idx) => {
    return ({ lesson, remove }) => {
      if (remove) {
        const newQuizes = quizesState.filter((cur) => {
          return idx !== cur.id
        })
        setQuizesState(newQuizes)
      } else {
        const newQuizes = quizesState.map((cur) => {
          if (idx === cur.id) {
            return {
              quiz: lesson,
              idx: cur.id
            }
          } else return cur
        })
        setQuizesState(newQuizes)
      }
    }
  }

  return (
    <div className='p-10'>
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
        quizesState.map((quiz) => {
          return (
            <div key={quiz.id}>
              <TextEditor key={quiz.id} lesson={quiz.quiz} updateLesson={updateQuiz(quiz.id)} />
            </div>
          )
        })
      }
    </div>
  )
}
