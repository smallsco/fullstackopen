// Third-Party Imports
import axios from 'axios'

// Base URL
const baseUrl = 'http://localhost:3001/anecdotes'

// Get all anecdotes from DB.
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// Create a new anecdote in the DB.
const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}

// Update an existing anecdote in the DB.
const update = async (newObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { createNew, getAll, update }