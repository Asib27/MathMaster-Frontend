import axios from 'axios'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function getQuizes (quizId) {
  const data = await axios.get(`${API_BASE}quizzes/${quizId}`)
  return data.data
}

export async function submitResult (quizId, score, xp) {
  await fakeNetwork()
  // { score: score, xp: xp}
  // const data = await axios.post(`${API_BASE}quizzes/${quizId}/submit`)
  // return data.data
}

export async function editQuiz (quizId, quiz) {
  // quiz = { name, score, xp, content}
  console.log(quizId, quiz)
  const data = await axios.patch(`${API_BASE}quizzes/${quizId}/update`, quiz)

  return data.data
}

export async function getQuizStat (quizId) {
  await fakeNetwork()
  return {
    name: 'Quiz 1',
    score: 50,
    xp: 20,
    highest_score: 40,
    my_highest_score: 40,
    language: 'English'
  }
}

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}
