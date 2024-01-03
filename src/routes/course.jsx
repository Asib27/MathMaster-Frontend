import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getCourse } from "../services/courseService";

export async function loader({params}){
    const course = await getCourse(params.courseId);
    return {course};
}

export default function Course(){
    const {course} = useLoaderData();
    const outline = course.content;

    return (
        <div className="flex flex-row gap-x-5 pl-10">
            <div className="basis-1/4">
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
            <div className="basis-3/4"> 
                <Outlet/>
            </div>
        </div>
    );
}