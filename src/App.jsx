import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Courses, { loader as allCoursesLoader } from './routes/courses'
import ErrorPage from './routes/error-page'
import Course, { loader as courseLoader } from './routes/course'
import Lessons, { loader as lessonLoader, action as lessonsAction } from './routes/lessons'
import Quizes from './routes/quizes'
import CourseOutline, { loader as courseOutlineLoader, action as courseOutlineAction } from './routes/courseOutline'
import Home, { loader as homeLoader } from './routes/home'
import Login, { action as loginAction } from './routes/login'
import Signup, { action as signupAction } from './routes/signup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
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
            element: <Quizes />
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
