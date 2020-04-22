import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

// Set the JWT for all requests that require it
const setToken = (t) => {
  token = `Bearer ${t}`
}

// Get all blogs
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Add a new blog
const addBlog = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, blog, config)
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
      return {error: "Unknown error occurred during add blog. Check backend logs."}
    }
  }
}

export default { getAll, addBlog, setToken }