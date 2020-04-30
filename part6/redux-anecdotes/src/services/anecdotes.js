// Third-Party Imports
import axios from 'axios'

// Base URL
const baseUrl = 'http://localhost:3001/anecdotes'

// Get all anecdotes from DB.
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }