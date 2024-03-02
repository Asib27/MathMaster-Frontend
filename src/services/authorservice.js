import axios from 'axios'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function editCourseOutline (courseId, course) {
  const data = await axios.patch(`${API_BASE}author/course/${courseId}/editoutline`, course)
  console.log(course)
  return data.data
}

export async function createLesson (courseId, topicId) {
  return {
    status: 'success',
    msg: 'successful'
  }
}

export async function createQuiz (courseId, topicId) {
  return {
    status: 'success',
    msg: 'successful'
  }
}
