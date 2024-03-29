import axios from 'axios'
import { objectToQueryString } from './util'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function getCourse (courseId) {
  const data = await axios.get(API_BASE + 'courses/' + courseId)
  return data.data
}

export async function getCourses (query) {
  const queryString = objectToQueryString(query)
  const data = await axios.get(
    API_BASE + 'courses' + queryString
  )
  return data.data
}

export async function getCourseOutline (courseId) {
  const data = await axios.get(`${API_BASE}courses/${courseId}/outline`)
  return data.data
}

export async function enrollCourse (courseId) {
  const data = await axios.post(`${API_BASE}courses/${courseId}/enroll`)
  return data.data
}

export async function rateCourse (courseId, rating) {
  const data = await axios.post(`${API_BASE}courses/${courseId}/rate`, {
    rating: +rating
  })

  return data.data
}
