import { Link } from 'react-router-dom'

export default function AuthorList ({ className, children }) {
  return (
    <div className={'flex gap-2 ' + className}>
      {children.map(author => (
        <Link to={`/authors/${author.id}`} className='underline' key={author.id}>{author.name}</Link>
      ))}
    </div>
  )
}
