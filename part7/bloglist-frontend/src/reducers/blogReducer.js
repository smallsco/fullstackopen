// My Imports
import blogService from '../services/blogs'
import { createNotificationAction } from './notificationReducer'

// Reducer
const blogReducer = (state = [], action) => {
  switch(action.type) {

    // Initialize blog list from fixed data
    case 'INIT':
      return action.data

    // Add a new blog
    case 'NEW':
      return [...state, action.data]

    // Do nothing otherwise
    default:
      return state
  }
}

// Action creator function for initializing blog list
export const createInitAction = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs.sort((a, b) => b.likes - a.likes)
    })
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

export default blogReducer