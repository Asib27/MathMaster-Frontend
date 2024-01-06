import { Link } from 'react-router-dom'

export default function AuthorList ({ links, className, children }) {
  if (links) {
    return (
      <div className={'flex gap-2 ' + className}>
        {children.map(author => (
          <Link to={`/authors/${author.id}`} className='underline' key={author.id}>{author.name}</Link>
        ))}
      </div>
    )
  } else {
    return (
      <div className={'flex gap-2 ' + className}>
        {children.map(author => (
          <p className='underline' key={author.id}>{author.name}</p>
        ))}
      </div>
    )
  }
}
