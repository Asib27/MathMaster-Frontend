import axios from 'axios'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function getUnpublished () {
  const data = await axios.get(`${API_BASE}mod/editrequests/published`)
  return data.data
}

export async function getRequest (requestId) {
  const data = await axios.get(`${API_BASE}mod/editrequests/${requestId}`)
  return data.data
}

export async function submitFeedback (requestId, feedback) {
  const data = await axios.patch(`${API_BASE}mod/editrequests/${requestId}/addfeedback`, {
    feedback
  })
  return data.data
}

export async function publish (requestId) {
  const data = await axios.post(`${API_BASE}mod/editrequests/${requestId}/publish`)
  return data.data
}
