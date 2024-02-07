export async function loader ({ params }) {
  const courseId = params.courseId
  console.log(courseId)
  return 2
}

export default function AdminIndCourseStat () {
  return (
    <div>
      Course Stat
    </div>
  )
}
