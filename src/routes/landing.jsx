import { Link } from 'react-router-dom'

export default function Landing ({ params }) {
  const texts = [
    {
      short: 'Effective, hands-on learning',
      description: 'Visual, interactive lessons make concepts feel intuitive — so even complex ideas just click. Our real-time feedback and simple explanations make learning efficient.',
      image: '/public/interactive.png'
    },
    {
      short: 'Learn at your level',
      description: 'Choose lessons according to your understanding level.',
      image: '/public/learn.png'
    },
    {
      short: 'Byte sized lessons',
      description: 'We make it easy to stay on track, see your progress, and build your problem solving skills one concept at a time.',
      image: '/public/byte.png'
    },
    {
      short: 'Stay motivated',
      description: 'Form a real learning habit with fun and well-paced content, game-like progress tracking, and friendly reminders.',
      image: '/public/learn.png'
    }
  ]

  return (
    <div>
      <div className='w-screen h-[calc(100vh-5rem)] p-10 flex gap-10 justify-center items-center'>
        <div className='mt-10'>
          <p className='text-wrap text-4xl'>Make Learning fun with MathMaster</p>
          <p className='mt-5 text-lg'>Most Effective Way of learning math in an interactive environment</p>
          <div className='flex p-10'>
            <Link to='/signup'>
              <button className='bg-gray-900 w-52 h-10 rounded-full px-4 text-white'>Get Started</button>
            </Link>
          </div>
        </div>
        <img src='/public/effective.png' className='w-96 h-96 bg-gray-600 rounded-3xl text-center p-2 m-2' />
      </div>

      <div id='features'>
        <div className='text-3xl mx-64 my-10'>Our Features</div>
        {texts.map((text, idx) => {
          return (
            <div key={idx} className='my-10  mx-80 flex justify-between odd:flex-row-reverse'>
              <div className='p-5'>
                <p className='text-3xl m-5'>{text.short}</p>
                <p className='text-lg m-5'>{text.description}</p>
              </div>
              <img src={text.image} className='w-60 h-60 bg-gray-600 rounded-3xl text-center p-2 m-2' />
            </div>
          )
        })}
      </div>
    </div>
  )
}
