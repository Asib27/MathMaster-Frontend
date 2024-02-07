import { Link } from 'react-router-dom'

export default function CourseCardShort ({ course }) {
  return (
    <div>
      <Link key={course.id} to={`/admin/courses/${course.id}`}>
        <div className='inline-block w-64'>
          <div className='rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out'>
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{course.name}</div>
            </div>
            <img className='w-full p-10' src={course.image} alt='Course Image' />
          </div>
        </div>
      </Link>
    </div>
  )
}
