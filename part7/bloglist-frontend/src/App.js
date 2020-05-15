// Third-Party Imports
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// My Imports
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { createInitAction } from './reducers/blogReducer'
import { createNotificationAction } from './reducers/notificationReducer'


const App = () => {
  const dispatch = useDispatch()

  const [loggedInUser, setLoggedInUser] = useState(null)

  // temporary to prevent crashing until port to redux is complete
  const setBlogs = null

  // Get all blogs when component renders.
  useEffect(() => {
    dispatch(createInitAction())
  }, [dispatch])
  const blogs = useSelector(state => state.blogs)

  // Check local storage when component renders to see if a user is currently
  // logged in.
  useEffect(() => {
    const userJSON = window.localStorage.getItem('fsoblogapp.loggedinuser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      setLoggedInUser(user)
    }
  }, [])

  // Logs out a user
  const onLogout = () => {
    window.localStorage.removeItem('fsoblogapp.loggedinuser')
    setLoggedInUser(null)
  }

  // Deletes a blog
  const onDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to remove the blog "${blog.title}"?`)) {
      try {
        const response = await blogService.deleteBlog(blog.id)
        if ({}.hasOwnProperty.call(response, 'error')) {
          dispatch(createNotificationAction('error', response.error))
        }
        else {
          setBlogs(blogs.filter(b => (b.id !== blog.id)))
        }
      }
      catch (error) {
        dispatch(createNotificationAction('error', error.message))
      }
    }
  }

  // Render blogs or login form
  return (
    <>
      <Notification />
      {!loggedInUser &&
        <LoginForm
          blogService={blogService}
          setLoggedInUser={setLoggedInUser}
        />
      }
      {loggedInUser &&
        <div>
          <h1>Blog App</h1>
          <p>
            Welcome, {loggedInUser.name}!
            <button onClick={onLogout}>Logout</button>
          </p>
          <AddBlogForm />
          <h2>Blogs</h2>
          <div id='bloglist'>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                blogService={blogService}
                loggedInUser={loggedInUser}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
      }
    </>
  )
}

export default App