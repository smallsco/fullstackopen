// Third-Party Imports
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// My Imports
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { createDeleteBlogAction, createInitAction } from './reducers/blogReducer'
import { createLoginActionFromUser, createLogoutAction } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user)

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
      dispatch(createLoginActionFromUser(user))
    }
  }, [dispatch])

  // Logs out a user
  const onLogout = () => {
    dispatch(createLogoutAction())
  }

  // Deletes a blog
  const onDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to remove the blog "${blog.title}"?`)) {
      dispatch(createDeleteBlogAction(blog.id))
    }
  }

  // Render blogs or login form
  return (
    <>
      <Notification />
      {!loggedInUser.id &&
        <LoginForm />
      }
      {loggedInUser.id &&
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