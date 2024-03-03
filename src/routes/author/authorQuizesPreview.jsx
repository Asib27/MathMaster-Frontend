import { redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { getQuizStat, getQuizes } from '../../services/quizService'
import { getRole } from '../../services/authService'
import MDXViewer from '../../components/MDXViewer'

// TODO: implement finish quiz

export async function loader ({ params }) {
  const auth = await getRole()
  if (auth !== 'author') {
    return redirect('/login')
  }

  const quizesStr = await getQuizes(params.quizId)
  const quizes = quizesStr.content.split('\n\n\n').map((quiz, idx) => {
    return {
      quiz,
      idx
    }
  })
  const quizStat = await getQuizStat(params.quizId)
  return { quizes, quizStat, quizId: params.quizId }
}

export default function AuthorQuizesPreview () {
  const { quizes, quizStat } = useLoaderData()
  const navigate = useNavigate()

  return (
    <div className='p-10'>
      <div className='flex m-10 flex-col gap-5'>
        <h3 className='text-3xl'>{quizStat.name}</h3>
        <div>
          <h4 className='text-xl'>{`Total Score : ${quizStat.score}`}</h4>
          <h4 className='text-xl'>{`Total XP : ${quizStat.xp}`}</h4>
        </div>
        {
          quizes.map(quiz => {
            return <MDXViewer key={quiz.id} data={quiz.quiz} />
          })
        }

        <button
          type='button'
          onClick={async () => {
            navigate('edit')
          }}
          className='w-full text-white border-4 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        >Edit
        </button>
      </div>
    </div>
  )
}
