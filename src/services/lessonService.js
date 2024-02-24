import axios from 'axios'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function getLesson (lessonId) {
  const data = await axios.get(`${API_BASE}lessons/${lessonId}`)
  return data.data
}

export async function submitLessonRating (lessonId, rating) {
  const data = await axios.post(`${API_BASE}lessons/${lessonId}/rate`, {
    rating
  })

  console.log(data.data)
  return {
    status: 'success',
    message: 'successful'
  }
}

export async function editLesson (lessonId, lesson) {
  const data = await axios.patch(`${API_BASE}lessons/${lessonId}/update`, {
    language: lesson.language,
    abstraction_level: lesson.abstractionLevel,
    lessonContent: lesson.content,
    lessonName: lesson.name
  })
  return data.data
}

export async function getLessonForAuthor (lessonId, lang, absLevel) {
  return await getLesson(lessonId)
}

export async function markAsCompleted (lessonId) {
  const data = await axios.post(`${API_BASE}lessons/${lessonId}/complete`)

  console.log(data.data)
  return {
    status: 'success',
    message: 'successful'
  }
}
