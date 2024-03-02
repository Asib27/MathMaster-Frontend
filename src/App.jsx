import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { loader as rootLoader } from './routes/root'
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
import Definition, { loader as definitionLoader } from './routes/definition'
import EditLesson, { loader as editLessonLoader } from './routes/author/editLesson'
import AdminLayout, { loader as adminLayoutLoader } from './routes/admin/adminLayout'
import AdminHome, { loader as adminHomeLoader } from './routes/admin/adminHome'
import AdminCourseStat, { loader as adminCourseStatLoader } from './routes/admin/courseStat'
import AdminUserStat, { loader as adminUserStatLoader } from './routes/admin/adminUserStat'
import AdminIndCourseStatIndex, { loader as AdminIndCourseStatIndexLoader } from './routes/admin/individualCourseStatIndex'
import AdminIndCourseStat, { loader as adminIndCourseStatLoader } from './routes/admin/indCourseStat'
import AuthorHome, { loader as authorHomeLoader } from './routes/author/authorHome'
import AuthorCourse, { loader as authorCourseLoader } from './routes/author/authorCourse'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
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
        loader: definitionsLoader,
        children: [
          {
            path: ':definitionId',
            element: <Definition />,
            loader: definitionLoader
          }
        ]
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
            path: 'lessons/:lessonId/edit',
            element: <EditLesson />,
            loader: editLessonLoader
          },
          {
            path: 'quizes/:quizId',
            element: <Quizes />,
            loader: quizLoader
          }
        ]
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        loader: adminLayoutLoader,
        children: [
          {
            path: 'home',
            index: true,
            element: <AdminHome />,
            loader: adminHomeLoader
          },
          {
            path: 'courses',
            element: <AdminCourseStat />,
            loader: adminCourseStatLoader,
            children: [
              {
                index: true,
                element: <AdminIndCourseStatIndex />,
                loader: AdminIndCourseStatIndexLoader
              },
              {
                path: ':courseId',
                element: <AdminIndCourseStat />,
                loader: adminIndCourseStatLoader
              }
            ]
          },
          {
            path: 'users',
            element: <AdminUserStat />,
            loader: adminUserStatLoader
          }
        ]
      },
      {
        path: 'author/home',
        element: <AuthorHome />,
        loader: authorHomeLoader
      },
      {
        path: 'author/courses/:courseId',
        element: <AuthorCourse />,
        loader: authorCourseLoader
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
