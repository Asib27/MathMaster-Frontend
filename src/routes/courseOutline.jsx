import { Form, redirect, useLoaderData } from 'react-router-dom'
import AuthorList from '../components/authorList'
import ProgressBar from '../components/progressBar'
import Rating from '../components/rating'
import { enrollCourse, getCourseOutline, rateCourse } from '../services/courseService'
import RatingForm from '../components/ratingForm'

export async function loader ({ params }) {
  const course = await getCourseOutline(params.courseId)
  return { course }
}

export async function action ({ request, params }) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  console.log(intent)
  if (intent === 'enroll') {
    await enrollCourse(params.courseId)
  } else if (intent === 'rating') {
    await rateCourse(params.courseId, formData.get('stars'))
  }

  return redirect(`/courses/${params.courseId}`)
}

export default function CourseOutline () {
  const { course } = useLoaderData()

  const totalRated = Object.values(course.ratings).reduce((prev, cur) => prev + cur, 0)
  const avgRating = Object.keys(course.ratings).reduce((prev, cur) => prev + course.ratings[cur] * cur, 0) / totalRated

  const completeion = (course.lessonCompleted * course.lessonCount + course.quizCompleted * course.quizCount) / (course.lessonCount * course.quizCount)

  return (
    <div className='p-10 m-20'>
      <img className='w-44' src={course.image} />
      <p className='text-3xl px-5 mt-5'> {course.name}</p>
      <p className='text-zinc-700 pl-5'>{course.type}</p>
      <AuthorList className='pl-5 text-zinc-700' links>{course.authors}</AuthorList>
      <p className='pl-5 text-zinc-700'> {`${course.enrollmentCount} Enrolled | ${course.estimatedTime} Hours`}</p>

      <p className='pl-5 mt-10 mr-1 text-justify text-zinc-700'>{course.description}</p>

      {course.isEnrolled
        ? (
          <div className='pl-5 mt-10 text-zinc-700'>
            <div className='flex gap-4'>
              <div className='text-nowrap'>{`Course Completed : ${completeion}% `}</div>
              <ProgressBar className='w-96 m-2' complete={completeion} />
            </div>
            <div className='flex gap-4'>
              <div className='text-nowrap'>{`Lesson Completed : ${course.lessonCompleted}% `}</div>
              <ProgressBar className='w-96 m-2' complete={course.lessonCompleted} />
            </div>
            <div className='flex gap-4'>
              <div className='text-nowrap'>{`Course Completed : ${course.quizCompleted}% `}</div>
              <ProgressBar className='w-96 m-2' complete={course.quizCompleted} />
            </div>
          </div>
          )
          // TODO: button functionality
        : (
          <Form method='post'>
            <button
              className='ml-5 mt-10  w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg'
              type='submit' name='intent' value='enroll'
            >Enroll
            </button>
          </Form>
          )}

      <div className='flex gap-6 items-center pl-5 mt-10'>
        <div>
          <p className='text-5xl text-center'>{avgRating.toFixed(2)}</p>
          <Rating rating={avgRating} />
          <p className='text-center mt-3'> {`${totalRated} reviews`} </p>
        </div>
        <div className='flex flex-col w-96'>
          {
            Object.keys(course.ratings).map((rating) => {
              const noPeople = course.ratings[rating]
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

      {course.isEnrolled && <RatingForm rating={course.myRating} />}
    </div>
  )
}
