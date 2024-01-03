import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Courses from './routes/courses'
import ErrorPage from './routes/error-page'
import AllLessons from './routes/allLessons'
import Lessons from './routes/lessons'
import Quizes from './routes/quizes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: 'courses',
        element: <Courses/>, 
      },
      {
        path: 'courses/:courseId',
        element: <AllLessons/>,
        children: [
          {
            path: 'lessons/:lessonId',
            element: <Lessons/>
          },
          {
            path: 'quizes/:quizId',
            element: <Quizes/>
          }
        ]
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
