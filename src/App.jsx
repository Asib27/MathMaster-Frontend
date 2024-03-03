import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { loader as rootLoader } from './routes/root'
import Courses, { loader as allCoursesLoader } from './routes/courses'
import ErrorPage from './routes/error-page'
import Course, { loader as courseLoader } from './routes/course'
import Lessons, { loader as lessonLoader, action as lessonsAction } from './routes/lessons'
import Quizes, { loader as quizLoader, action as quizAction } from './routes/quizes'
import CourseOutline, { loader as courseOutlineLoader, action as courseOutlineAction } from './routes/courseOutline'
import Home, { loader as homeLoader } from './routes/home'
import Login, { action as loginAction } from './routes/login'
import Signup, { action as signupAction } from './routes/signup'
import Landing from './routes/landing'
import Definitions, { loader as definitionsLoader } from './routes/definitions'
import Definition, { loader as definitionLoader } from './routes/definition'
import EditLesson, { loader as editLessonLoader, action as editLessonAction } from './routes/author/editLesson'
import AdminLayout, { loader as adminLayoutLoader } from './routes/admin/adminLayout'
import AdminHome, { loader as adminHomeLoader } from './routes/admin/adminHome'
import AdminCourseStat, { loader as adminCourseStatLoader } from './routes/admin/courseStat'
import AdminUserStat, { loader as adminUserStatLoader } from './routes/admin/adminUserStat'
import AdminIndCourseStatIndex, { loader as AdminIndCourseStatIndexLoader } from './routes/admin/individualCourseStatIndex'
import AdminIndCourseStat, { loader as adminIndCourseStatLoader } from './routes/admin/indCourseStat'
import AuthorHome, { loader as authorHomeLoader } from './routes/author/authorHome'
import AuthorCourse, { loader as authorCourseLoader, action as authorCourseAction } from './routes/author/authorCourse'
import AuthorCourseOutline, { loader as authorCourseOutlineLoader, action as authorCourseOutlineAction } from './routes/author/authorCourseOutline'
import AuthorCourseOutlinePreview, { loader as authorCourseOutlinePreviewLoader, action as authorCourseOutlinePreviewAction } from './routes/author/authorCourseOutlinePreview'
import AuthorLessons, { loader as AuthorLessonLoader, action as AuthorLessonsAction } from './routes/author/authorLesson'
import AuthorQuizesEdit, { loader as authorQuizLoader, action as authorQuizesAction } from './routes/author/authorQuizes'
import AuthorQuizesPreview, { loader as authorQuizesPreviewLoader } from './routes/author/authorQuizesPreview'
import ModeratorHome, { loader as moderatorHomeLoader } from './routes/moderator/moderatorHome'
import CreateNewTopic, { loader as createNewTopicLoader, action as createNewTopicAction } from './routes/author/createNewTopic'
import NewDefinition from './routes/author/newDefinition'
import ViewRequests, { loader as viewRequestsLoader } from './routes/moderator/viewRequests'

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
          },
          {
            path: 'new',
            element: <NewDefinition />
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
            path: 'quizes/:quizId',
            element: <Quizes />,
            loader: quizLoader,
            action: quizAction
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
        loader: authorCourseLoader,
        action: authorCourseAction,
        children: [
          {
            index: true,
            element: <AuthorCourseOutlinePreview />,
            loader: authorCourseOutlinePreviewLoader,
            action: authorCourseOutlinePreviewAction
          },
          {
            path: 'edit',
            element: <AuthorCourseOutline />,
            loader: authorCourseOutlineLoader,
            action: authorCourseOutlineAction
          },
          {
            path: 'lessons/:lessonId',
            element: <AuthorLessons />,
            loader: AuthorLessonLoader,
            action: AuthorLessonsAction
          },
          {
            path: 'lessons/:lessonId/edit',
            element: <EditLesson />,
            loader: editLessonLoader,
            action: editLessonAction
          },
          {
            path: 'quizes/:quizId',
            element: <AuthorQuizesPreview />,
            loader: authorQuizesPreviewLoader
          },
          {
            path: 'quizes/:quizId/edit',
            element: <AuthorQuizesEdit />,
            loader: authorQuizLoader,
            action: authorQuizesAction
          },
          {
            path: 'topics/:topicId',
            element: <CreateNewTopic />,
            loader: createNewTopicLoader,
            action: createNewTopicAction
          }
        ]
      },
      {
        path: 'moderator/home',
        element: <ModeratorHome />,
        loader: moderatorHomeLoader
      },
      {
        path: 'moderator/requests/:requestId',
        element: <ViewRequests />,
        loader: viewRequestsLoader
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
