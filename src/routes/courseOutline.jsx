import AuthorList from '../components/authorList'
import ProgressBar from '../components/progressBar'
import Rating from '../components/rating'

export default function CourseOutline () {
  const course = {
    id: '1',
    name: 'Algebra 1',
    type: 'Algebra',
    difficulty: 'hard',
    estimatedTime: '24',
    image: '/src/assets/online-course-icon.svg',
    description: 'Description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc. Cras ut lacinia nulla, ut luctus sem. Mauris non pretium tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam dignissim, eros non scelerisque commodo, justo nunc molestie mauris, at aliquet ex nibh quis est. Pellentesque porta dignissim enim viverra feugiat. In hac habitasse platea dictumst. Proin tempor nisi orci, quis cursus ipsum porttitor non. Proin tempor finibus quam, lacinia scelerisque dolor blandit ut. Vivamus vitae elementum enim. Aliquam erat volutpat.',
    authors: [
      {
        id: '1',
        name: 'Shariful Rahi'
      },
      {
        id: '2',
        name: 'Rahi Khan'
      }
    ],
    lessonCount: 10,
    quizCount: 5,
    lessonCompleted: 50,
    quizCompleted: 20,
    enrollmentCount: 500,
    rating: {
      1: 5,
      2: 10,
      3: 30,
      4: 50,
      5: 20
    },
    isEnrolled: false,
    myRating: null
  }

  const totalRated = Object.values(course.rating).reduce((prev, cur) => prev + cur, 0)
  const avgRating = Object.keys(course.rating).reduce((prev, cur) => prev + course.rating[cur] * cur, 0) / totalRated

  const completeion = (course.lessonCompleted * course.lessonCount + course.quizCompleted * course.quizCount) / (course.lessonCount * course.quizCount)

  return (
    <div className='p-10 m-20'>
      <img className='w-44' src={course.image} />
      <p className='text-3xl px-5 mt-5'> {course.name}</p>
      <p className='text-zinc-700 pl-5'>{course.type}</p>
      <AuthorList className='pl-5 text-zinc-700'>{course.authors}</AuthorList>
      <p className='pl-5 text-zinc-700'> {`${course.enrollmentCount} Enrolled | ${course.estimatedTime} Hours`}</p>

      <p className='pl-5 mt-10 mr-1 text-justify text-zinc-700'>{course.description}</p>

      {course.isEnrolled
        ? (
          <div className='pl-5 mt-10 text-zinc-700'>
            <p>{`Course Completed : ${completeion}% `}</p>
            <p>{`Lesson Completed : ${course.lessonCompleted}% `}</p>
            <p>{`Course Completed : ${course.quizCompleted}% `}</p>
          </div>
          )
        : <button className='ml-5 mt-10  w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg'>Enroll</button>}

      <div className='flex gap-6 items-center pl-5 mt-10'>
        <div>
          <p className='text-5xl text-center'>{avgRating.toFixed(2)}</p>
          <Rating rating={avgRating} />
          <p className='text-center mt-3'> {`${totalRated} reviews`} </p>
        </div>
        <div className='flex flex-col w-96'>
          {
            Object.keys(course.rating).map((rating) => {
              const noPeople = course.rating[rating]
              return (
                <div key={rating} className='flex gap-2'>
                  <p>{rating}</p>
                  <ProgressBar key={rating} className='my-2' complete={noPeople / totalRated} />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
