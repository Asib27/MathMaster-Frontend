import { Link } from 'react-router-dom'
import CourseCard from './courseCard'

export default function CourseAccordion ({ courses, name, link }) {
  return (
    <div>
      <p className='text-3xl my-10'> {name}</p>
      <div className='flex flex-nowrap overflow-x-scroll no-scrollbar'>
        {courses.map(course => {
          return (
            <Link key={course.id} to={`${link}/${course.id}`}>
              <CourseCard key={course.id} course={course} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
