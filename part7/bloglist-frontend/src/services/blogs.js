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
      return { error: error.response.data }
    }
    else {
      return { error: 'Unknown error occurred during add blog. Check backend logs.' }
    }
  }
}

// Like a blog
const likeBlog = async (blog) => {
  try {
    const newBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user ? blog.user._id : null,
      likes: blog.likes + 1
    }
    const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog)
    return response.data
  }
  catch (error) {
    if (error.response.data.error) {
      // backend returns errors as json
      return error.response.data
    }
    else if (error.response.data) {
      // handle proxy errors which are returned by strings
      return { error: error.response.data }
    }
    else {
      return { error: 'Unknown error occurred during like blog. Check backend logs.' }
    }
  }
}

// Delete a blog
const deleteBlog = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  }
  catch (error) {
    if (error.response.data.error) {
      // backend returns errors as json
      return error.response.data
    }
    else if (error.response.data) {
      // handle proxy errors which are returned by strings
      return { error: error.response.data }
    }
    else {
      return { error: 'Unknown error occurred during delete blog. Check backend logs.' }
    }
  }
}

export default { getAll, addBlog, likeBlog, deleteBlog, setToken }