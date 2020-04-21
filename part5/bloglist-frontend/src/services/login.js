import axios from 'axios'

const login = async (username, password) => {
  try {
    const response = await axios.post('/api/login', {username, password})
    return response.data
  }
  catch (error) {
    if (error.response.data.error) {
      // backend returns errors as json
      return error.response.data
    }
    else if (error.response.data) {
      // handle proxy errors which are returned by strings
      return {error: error.response.data}
    }
    else {
      return {error: "Unknown error occurred during login. Check backend logs."}
    }
  }
}

export default { login }