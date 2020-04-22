import React, { useState } from 'react'

import loginService from '../services/login'

const LoginForm = (props) => {
  const {
    blogService,
    setErrorMessage,
    setLoggedInUser,
  } = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Logs in a user
  const onLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)

      if (user.hasOwnProperty('error')) {
        setErrorMessage(user.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      else {
        setUsername('')
        setPassword('')
        setLoggedInUser(user)
        blogService.setToken(user.token)
        window.localStorage.setItem(
          'fsoblogapp.loggedinuser',
          JSON.stringify(user)
        )
      }
    }
    catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Login to Blog App</h1>
      <form>
        Username: <input type='text' value={username} onChange={(event) => setUsername(event.target.value)} /><br />
        Password: <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} /><br />
        <button type='submit' onClick={onLogin}>Login</button>
      </form>
    </div>
  )
}

export default LoginForm