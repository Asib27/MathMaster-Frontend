import axios from 'axios'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function getDefinitions (query) {
  const data = await axios.get(API_BASE + 'definitions')
  return data.data
}

export async function getDefinition (definitionId) {
  const data = await axios.get(`${API_BASE}definitions/${definitionId}`)
  return data.data
}

export async function newDefinition (def) {
  const data = await axios.post(`${API_BASE}definitions/create`, def)
  console.log(data.data)
  return data.data
}
