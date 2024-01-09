import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Courses, { loader as allCoursesLoader } from './routes/courses'
import ErrorPage from './routes/error-page'
import Course, { loader as courseLoader } from './routes/course'
import Lessons, { loader as lessonLoader, action as lessonsAction } from './routes/lessons'
import Quizes, { loader as quizLoader } from './routes/quizes'
import CourseOutline, { loader as courseOutlineLoader, action as courseOutlineAction } from './routes/courseOutline'
import Home, { loader as homeLoader } from './routes/home'
import Login, { action as loginAction } from './routes/login'
import Signup, { action as signupAction } from './routes/signup'
import Landing from './routes/landing'
import Definitions, { loader as definitionsLoader } from './routes/definitions'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'home',
        element: <Home />,
        loader: homeLoader
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction
      },
      {
        path: 'signup',
        element: <Signup />,
        action: signupAction
      },
      {
        path: 'definitions',
        element: <Definitions />,
        loader: definitionsLoader
      },
      {
        path: 'courses',
        element: <Courses />,
        loader: allCoursesLoader
      },
      {
        path: 'courses/:courseId',
        element: <Course />,
        loader: courseLoader,
        children: [
          {
            index: true,
            element: <CourseOutline />,
            loader: courseOutlineLoader,
            action: courseOutlineAction
          },
          {
            path: 'lessons/:lessonId',
            element: <Lessons />,
            loader: lessonLoader,
            action: lessonsAction
          },
          {
            path: 'quizes/:quizId',
            element: <Quizes />,
            loader: quizLoader
          }
        ]
      }
    ]
  }
])

function App () {
  return (
    <RouterProvider router={router} />
  )
}

export default App
