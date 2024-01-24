import { Link } from 'react-router-dom'
import MDXViewer from '../components/MDXViewer'

// import LessonFooter from "./LessonFooter";

const Lesson = ({ lesson }) => {
  return (
    <div className='relative p-10'>
      <h2 className='text-3xl'> {lesson.name}</h2>
      <div className='flex gap-2'>
        {lesson.authors && lesson.authors.map(author => (
          <Link to={`/authors/${author.id}`} className='underline' key={author.id}>{author.name}</Link>
        ))}

      </div>

      <div className='z-50'>
        {/* <Progress num={4} active={1} from={"lesson"} /> */}
      </div>

      <div className='prose text-container relative bg-white z-0'>
        <div className='h-24 w-1' />
        <MDXViewer data={lesson.content} />
        {/* <LessonFooter /> */}
      </div>
    </div>
  )
}

export default Lesson
