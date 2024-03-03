import axios from 'axios'

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE

export async function getUnpublished () {
  const data = await axios.get(`${API_BASE}mod/editrequests/published`)
  return data.data
}

export async function getRequest (requestId) {
  const data = await axios.get(`${API_BASE}mod/editrequests/${requestId}`)
  console.log(data.data)
  return data.data
}
