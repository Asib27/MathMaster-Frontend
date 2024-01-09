import { useLoaderData } from 'react-router-dom'
import { getQuizes } from '../services/quizService'
import { useState } from 'react'
import QuizQuestion from '../pages/quizQuestion'

// TODO: implement finish quiz

export async function loader ({ params }) {
  const quizes = await getQuizes(params.quizId)
  return { quizes }
}

export default function Quizes () {
  const { quizes } = useLoaderData()
  const [curQuiz, setCurQuiz] = useState(0)
  const [quizState, setQuizState] = useState(Array.from({ length: quizes.length }, () => ''))

  const noQuiz = quizes.length
  const getColor = (idx) => {
    if (quizState[idx] === '') {
      if (idx >= curQuiz) return 'border-black w-4 h-4' // normal
      else return 'w-5 h-5 bg-gray-400' // skipped
    } else if (quizState[idx] === 'correct') return 'w-5 h-5 bg-green-800'
    else if (quizState[idx] === 'wrong') return 'w-5 h-5 bg-red-500'
    else return 'border-black'
  }

  const updateArray = (idx, value) => {
    setQuizState(quizState.map((v, i) => {
      if (idx === i) return value
      else return v
    }))
  }

  const updateAnswer = (answer) => {
    updateArray(curQuiz, answer)
  }

  return (
    <div className='p-10'>
      <div className='flex items-center m-10'>
        <div className='flex flex-row items-center gap-2'>
          {Array.from({ length: noQuiz }, (_, idx) => {
            return (
              <div
                key={idx}
                className={'rounded-full border-2 cursor-pointer ' + getColor(idx) + ` ${idx} ${curQuiz}`}
                onClick={() => setCurQuiz(idx)}
              />
            )
          })}
        </div>

        <div className='flex-grow' />

        {curQuiz < noQuiz - 1 &&
          <button
            className='h-14 w-32 rounded-lg text-white bg-blue-700'
            onClick={() => setCurQuiz(curQuiz + 1)}
          >
            Next Question
          </button>}

        {curQuiz >= noQuiz - 1 &&
          <button
            className='h-14 w-32 rounded-lg text-white bg-blue-700'
          >
            Finish Quiz
          </button>}
      </div>
      <div>
        <QuizQuestion key={curQuiz} questionStr={quizes[curQuiz].quiz} answerUpdateCallback={updateAnswer} />
      </div>
    </div>

  )
}
