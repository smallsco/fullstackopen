import React, { useState } from 'react'
import PropTypes from 'prop-types'

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

      if ({}.hasOwnProperty.call(user, 'error')) {
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
        Username: <input id='username' type='text' value={username} onChange={(event) => setUsername(event.target.value)} /><br />
        Password: <input id='password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} /><br />
        <button id='login' type='submit' onClick={onLogin}>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  blogService: PropTypes.object.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setLoggedInUser: PropTypes.func.isRequired,
}

export default LoginForm