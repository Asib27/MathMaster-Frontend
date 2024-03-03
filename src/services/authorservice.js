import axios from 'axios'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function editCourseOutline (courseId, course) {
  const data = await axios.patch(`${API_BASE}author/course/${courseId}/editoutline`, course)
  console.log(course)
  return data.data
}

export async function createLesson (courseId, topicId) {
  const data = await axios.post(`${API_BASE}lessons/${topicId}/addLesson`, {
    xp: 50,
    name: 'untitled',
    content: '',
    language: 'English',
    abstraction_level: 'Novice'
  })
  return data.data
}

export async function createQuiz (courseId, topicId) {
  const data = await axios.post(`${API_BASE}quizzes/${topicId}/addQuiz`, {
    xp: 0,
    totalScore: 0,
    name: 'untitled quiz',
    content: '',
    language: 'English'
  })
  return data.data
}
