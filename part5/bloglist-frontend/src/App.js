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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const onLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      setLoggedInUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      console.log(error)
    }
  }

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
          <p>Welcome, {loggedInUser.name}!</p>
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