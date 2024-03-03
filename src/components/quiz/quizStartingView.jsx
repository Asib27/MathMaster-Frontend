export default function QuizStartingView ({ quizStat, setQuizViewState }) {
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

        <p className='text-xl'>Your last Score :</p>
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
