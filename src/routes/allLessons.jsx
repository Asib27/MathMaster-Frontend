import { Link, Outlet } from "react-router-dom";

export default function AllLessons(){
    const outline = 
        [
            {
                id: 2,
                name: 'Topic1',
                description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc. Cras ut lacinia nulla, ut luctus sem. Mauris non pretium tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam dignissim, eros non scelerisque commodo, justo nunc molestie mauris, at aliquet ex nibh quis est. Pellentesque porta dignissim enim viverra feugiat. In hac habitasse platea dictumst. Proin tempor nisi orci, quis cursus ipsum porttitor non. Proin tempor finibus quam, lacinia scelerisque dolor blandit ut. Vivamus vitae elementum enim. Aliquam erat volutpat.',

                completed: true,
                lessons: [
                    {
                        id: '1',
                        name: 'Lesson1',
                        completed: true,
                    },
                    {
                        id: '2',
                        name: 'Lesson2',
                        completed: false,
                    },
                    {
                        id: '3',
                        name: 'Lesson3',
                        completed: true,
                    }
                ],
                quizes: [
                    {
                        id: '1',
                        name: 'Quiz1',
                        completed: false
                    },
                    {
                        id: '2',
                        name: 'Quiz2',
                        completed: true
                    }
                ]
            },        
            {
                id: 4,
                name: 'Topic2',
                description: 'description2 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc. Cras ut lacinia nulla, ut luctus sem. Mauris non pretium tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam dignissim, eros non scelerisque commodo, justo nunc molestie mauris, at aliquet ex nibh quis est. Pellentesque porta dignissim enim viverra feugiat. In hac habitasse platea dictumst. Proin tempor nisi orci, quis cursus ipsum porttitor non. Proin tempor finibus quam, lacinia scelerisque dolor blandit ut. Vivamus vitae elementum enim. Aliquam erat volutpat.',

                completed: false,
                lessons: [
                    {
                        id: '2',
                        name: 'Lesson1',
                        completed: true,
                    },
                    {
                        id: '3',
                        name: 'Lesson2',
                        completed: false,
                    },
                    {
                        id: '4',
                        name: 'lesson3',
                        completed: false,
                    }
                ],
                quizes: [
                    {
                        id: '1',
                        name: 'Quiz3',
                        completed: false
                    }
                ]
            }
        ]
    

    return (
        <div className="flex flex-row pl-10">
            <div className="basis-1/3">
                <h3 className="text-4xl p-3">Course Outline</h3>
                <ul>
                    {outline.map(topic=>(
                        <li key={topic.id} className="text-xl pl-3"> 
                            <p className="pb-2 border-b-2 border-zinc-800">{topic.name}</p>
                            <ul className="pl-8 pt-3">
                                
                                {topic.lessons.map(lesson=>(
                                    <li key={lesson.id} className="flex items-center">
                                        {lesson.completed?
                                        (<svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>) : 
                                        (<svg className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>)
                                        }
                                        <Link to={`lessons/${lesson.id}`}>
                                            {lesson.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className="pl-8 pb-2">
                                {topic.quizes.map(quiz=>(
                                    <li key={quiz.id} className="flex items-center">
                                        {quiz.completed?
                                        (<svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>) : 
                                        (<svg className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>)
                                        }
                                        <Link to={`quizes/${quiz.id}`}>
                                            {quiz.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="basis-2/3"> 
                <Outlet/>
            </div>
        </div>
    );
}