import { Form, redirect, useLoaderData } from 'react-router-dom'
import AuthorList from '../components/authorList'
import ProgressBar from '../components/progressBar'
import { enrollCourse, getCourseOutline, rateCourse } from '../services/courseService'
import RatingForm from '../components/ratingForm'
import DetailedRatingViewer from '../components/stats/detailedRatingViewer'

export async function loader ({ params }) {
  const course = await getCourseOutline(params.courseId)
  return { course }
}

export async function action ({ request, params }) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  if (intent === 'enroll') {
    await enrollCourse(params.courseId)
  } else if (intent === 'rating') {
    await rateCourse(params.courseId, formData.get('stars'))
  }

  return redirect(`/courses/${params.courseId}`)
}

export default function CourseOutline () {
  const { course } = useLoaderData()

  const completeion = (course.lessonCompleted * course.lessonCount + course.quizCompleted * course.quizCount) / (course.lessonCount * course.quizCount) || 0

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
              <div className='text-nowrap'>{`Course Completed : ${Math.round(completeion)}% `}</div>
              <ProgressBar className='w-96 m-2' complete={completeion} />
            </div>
            <div className='flex gap-4'>
              <div className='text-nowrap'>{`Lesson Completed : ${course.lessonCompleted}% `}</div>
              <ProgressBar className='w-96 m-2' complete={course.lessonCompleted} />
            </div>
            <div className='flex gap-4'>
              <div className='text-nowrap'>{`Quiz Completed : ${course.quizCompleted}% `}</div>
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
      <DetailedRatingViewer ratings={course.ratings} />
      {course.isEnrolled && <RatingForm rating={course.myRating} />}
    </div>
  )
}
