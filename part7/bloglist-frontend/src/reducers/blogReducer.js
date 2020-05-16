// My Imports
import blogService from '../services/blogs'
import { createNotificationAction } from './notificationReducer'
import { createInitUsersAction } from './userReducer'

// Reducer
const blogReducer = (state = [], action) => {
  switch(action.type) {

    // Initialize blog list from fixed data
    case 'INIT_BLOGS': {
      return action.data
    }

    // Comment on a blog
    case 'COMMENT': {
      const blogToUpdate = state.find(blog => blog.id === action.data.id)
      const updatedBlog = { ...blogToUpdate, comments: blogToUpdate.comments.concat(action.data.comment) }
      return state.map(blog => (
        blog.id === updatedBlog.id ? updatedBlog : blog
      ))
    }

    // Like a blog
    case 'LIKE': {
      const blogToUpdate = state.find(blog => blog.id === action.data.id)
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      return state.map(blog => (
        blog.id === updatedBlog.id ? updatedBlog : blog
      ))
    }

    // Add a new blog
    case 'NEW': {
      return [...state, action.data]
    }

    // Delete a blog
    case 'DELETE': {
      return state.filter(blog => (blog.id !== action.data.id))
    }

    // Do nothing otherwise
    default: {
      return state
    }
  }
}

// Action creator function for initializing blog list
export const createInitBlogsAction = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs.sort((a, b) => b.likes - a.likes)
    })
  }
}

// Action creator function for commenting on a blog
export const createCommentAction = (id, comment) => {
  return async (dispatch) => {
    try {
      const response = await blogService.addComment(id, { comment })
      if ({}.hasOwnProperty.call(response, 'error')) {
        dispatch(createNotificationAction('error', response.error))
      }
      else {
        dispatch({
          type: 'COMMENT',
          data: { id, comment }
        })
      }
    }
    catch (error) {
      dispatch(createNotificationAction('error', error.message))
    }
  }
}

// Action creator function for liking a blog
export const createLikeAction = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.likeBlog(blog)
      if ({}.hasOwnProperty.call(response, 'error')) {
        dispatch(createNotificationAction('error', response.error))
      }
      else {
        dispatch({
          type: 'LIKE',
          data: { id: blog.id }
        })
      }
    }
    catch (error) {
      dispatch(createNotificationAction('error', error.message))
    }
  }
}

// Action creator function for creating a new blog
export const createNewBlogAction = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.addBlog(content)
      if ({}.hasOwnProperty.call(newBlog, 'error')) {
        dispatch(createNotificationAction('error', newBlog.error))
      }
      else {
        dispatch({
          type: 'NEW',
          data: newBlog
        })
        dispatch(createInitUsersAction())
        dispatch(createNotificationAction('success',
          `Added blog "${newBlog.title}" by author "${newBlog.author}"`
        ))
      }
    }
    catch(error) {
      dispatch(createNotificationAction('error', error.message))
    }
  }
}

export const createDeleteBlogAction = (id) => {
  return async (dispatch) => {
    try {
      const response = await blogService.deleteBlog(id)
      if ({}.hasOwnProperty.call(response, 'error')) {
        dispatch(createNotificationAction('error', response.error))
      }
      else {
        dispatch({
          type: 'DELETE',
          data: { id }
        })
        dispatch(createInitUsersAction())
      }
    }
    catch (error) {
      dispatch(createNotificationAction('error', error.message))
    }
  }
}

export default blogReducer