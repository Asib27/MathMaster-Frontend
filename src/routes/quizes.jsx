import { useLoaderData } from 'react-router-dom'
import { getQuizStat, getQuizes } from '../services/quizService'
import { useState } from 'react'
import QuizQuestion from '../pages/quizQuestion'

// TODO: implement finish quiz

export async function loader ({ params }) {
  const quizes = await getQuizes(params.quizId)
  const quizStat = await getQuizStat(params.quizId)
  return { quizes, quizStat }
}

export default function Quizes () {
  const [quizViewState, setQuizViewState] = useState(0)
  const { quizes, quizStat } = useLoaderData()
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

  if (quizViewState === 0) {
    return (
      <QuizStartingView quizStat={quizStat} setQuizViewState={setQuizViewState} />
    )
  } else {
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
              onClick={() => setQuizViewState(2)}
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
}
function QuizStartingView ({ quizStat, setQuizViewState }) {
  return (
    <div className='p-10'>
      <p className='text-3xl'>{quizStat.name}</p>

      <div className='mt-10 grid grid-cols-2'>
        <p className='text-xl'>Max Score Available :</p>
        <p className='text-xl'>{quizStat.score}</p>

        <p className='text-xl'>Max XP Available :</p>
        <p className='text-xl'>{quizStat.xp}</p>

        <p className='text-xl'>Highest Score :</p>
        <p className='text-xl'>{quizStat.highest_score}</p>

        <p className='text-xl'>Your Highest Score :</p>
        <p className='text-xl'>{quizStat.my_highest_score}</p>
      </div>

      <button
        onClick={() => { setQuizViewState(1) }}
        className='mt-10 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
      >
        Start Quiz
      </button>
    </div>
  )
}
