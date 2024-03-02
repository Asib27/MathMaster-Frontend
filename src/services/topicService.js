import axios from 'axios'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function getTopic (topicId) {
  return {
    id: 1,
    name: 'untitled',
    description: 'lores ipsum'
  }
}

export async function editTopic (topicId, topic) {
  const data = await axios.patch(`${API_BASE}topics/${topicId}/update`, topic)
  return data.data
}

export async function createTopic (courseId) {
  // name: untitiled, description: lores ipsum
  const data = await axios.post(`${API_BASE}courses/${courseId}/addTopic`, {
    name: 'untitled',
    description: 'lores ipsum',
    language: 'English'
  })

  return data.data
}
