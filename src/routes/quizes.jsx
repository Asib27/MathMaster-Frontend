import { useLoaderData } from 'react-router-dom'
import { getQuizStat, getQuizes, submitResult } from '../services/quizService'
import { useState } from 'react'
import QuizQuestion from '../pages/quizQuestion'
import QuizStartingView from '../components/quiz/quizStartingView'

// TODO: implement finish quiz

export async function loader ({ params }) {
  const quizes = await getQuizes(params.quizId)
  const quizStat = await getQuizStat(params.quizId)
  return { quizes, quizStat, quizId: params.quizId }
}

export default function Quizes () {
  const [quizViewState, setQuizViewState] = useState(0)
  const { quizes, quizStat, quizId } = useLoaderData()
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

  const getScore = () => {
    return quizState.filter(q => q === 'correct').length
  }

  if (quizViewState === 0) {
    return (
      <QuizStartingView quizStat={quizStat} setQuizViewState={setQuizViewState} />
    )
  } else if (quizViewState === 1) {
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
              onClick={() => {
                setQuizViewState(2)
                submitResult(quizId, getScore() / quizes.length * quizStat.score, quizStat.xp)
              }}
            >
              Finish Quiz
            </button>}
        </div>
        <div>
          <QuizQuestion key={curQuiz} questionStr={quizes[curQuiz].quiz} answerUpdateCallback={updateAnswer} />
        </div>
      </div>

    )
  } else {
    return (
      <div className='p-10'>
        <p className='text-3xl'>{quizStat.name}</p>
        <p className='text-2xl mt-10 text-green-600'>Congrats You have successfully corrected {getScore()} out of {quizes.length}</p>

        <div className='mt-10 grid grid-cols-2'>
          <p className='text-xl'>Highest Score :</p>
          <p className='text-xl'>{quizStat.highest_score}</p>

          <p className='text-xl'>Your Previous Highest Score :</p>
          <p className='text-xl'>{quizStat.my_highest_score}</p>

          <p className='text-xl'>Your Current Score :</p>
          <p className='text-xl'>{getScore() / quizes.length * quizStat.score}</p>
        </div>

      </div>
    )
  }
}
