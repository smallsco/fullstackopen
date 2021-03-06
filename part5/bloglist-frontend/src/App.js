// Third-Party Imports
import React, { useState, useEffect } from 'react'

// My Imports
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Get all blogs when component renders.
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

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
          setErrorMessage(response.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
        else {
          setBlogs(blogs.filter(b => (b.id !== blog.id)))
        }
      }
      catch (error) {
        setErrorMessage(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  // Render blogs or login form
  return (
    <>
      <Notification type='error' message={errorMessage} />
      <Notification type='success' message={notificationMessage} />
      {!loggedInUser &&
        <LoginForm
          blogService={blogService}
          setErrorMessage={setErrorMessage}
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
          <AddBlogForm
            blogService={blogService}
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
            setNotificationMessage={setNotificationMessage}
          />
          <h2>Blogs</h2>
          <div id='bloglist'>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                blogService={blogService}
                loggedInUser={loggedInUser}
                onDelete={onDelete}
                setErrorMessage={setErrorMessage}
              />
            )}
          </div>
        </div>
      }
    </>
  )
}

export default App