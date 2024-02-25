import CourseCard from './courseCard'

export default function CourseAccordion ({ courses, name }) {
  return (
    <div>
      <p className='text-3xl my-10'> {name}</p>
      <div className='flex flex-nowrap overflow-x-scroll no-scrollbar'>
        {courses.map(course => {
          return (
            <CourseCard key={course.id} course={course} />
          )
        })}
      </div>
    </div>
  )
}
