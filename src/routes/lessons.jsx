import { Link } from "react-router-dom"
import Lesson from "../pages/lesson"

// TODO: Add upvote and completed

export default function Lessons() {
    const content = "We $sa_2 b^4$ have learned the basics of function in the previous lessons. Now it's time to explore function parameters.\
A **parameter** A parameter is like a **control knob** for a function. Changing the parameter changes the function in a smooth way.\
Simple <Definition text={'linear'} definition={'A **linear function** is a function'} /> \
\n```callout\n\
I am a callout $a_2$\n\
```\
"

    const lesson = {
        id: '1',
        name: 'Lesson1',
        content: content,
        completed: false,
        vote: 1,
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
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl"> {lesson.name}</h2>
            <div className="flex gap-2">
                {lesson.authors.map(author => (
                        <Link to={`/authors/${author.id}`} className="underline" key={author.id}>{author.name}</Link>
                    ))}
                
            </div>
            <Lesson data={lesson.content}/>
        </div>
    )
}