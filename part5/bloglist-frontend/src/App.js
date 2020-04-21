// Third-Party Imports
import React, { useState, useEffect } from 'react'

// My Imports
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null)

  // Get all blogs when component renders.
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Check local storage when component renders to see if a user is currently
  // logged in.
  useEffect(() => {
    const userJSON = window.localStorage.getItem('fsoblogapp.loggedinuser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setLoggedInUser(user)
    }
  }, [])

  // Update username/password state when user types into the login form.
  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  // Logs in a user
  const onLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)

      if (user.hasOwnProperty('error')) {
        console.log(user.error)
      }
      else {
        setUsername('')
        setPassword('')
        setLoggedInUser(user)
        window.localStorage.setItem(
          'fsoblogapp.loggedinuser',
          JSON.stringify(user)
        )
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  // Logs out a user
  const onLogout = () => {
    window.localStorage.removeItem('fsoblogapp.loggedinuser')
    setLoggedInUser(null)
  }

  // Render blogs or login form
  return (
    <>
      {!loggedInUser &&
        <LoginForm
          username={username}
          onChangeUsername={onChangeUsername}
          password={password}
          onChangePassword={onChangePassword}
          onLogin={onLogin}
        />
      }
      {loggedInUser &&
        <div>
          <p>
            Welcome, {loggedInUser.name}!
            <button onClick={onLogout}>Logout</button>
          </p>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </>
  )
}

export default App