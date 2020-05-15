// Third-Party Imports
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

// My Imports
import loginService from '../services/login'
import { createNotificationAction } from '../reducers/notificationReducer'

const LoginForm = (props) => {
  const {
    blogService,
    setLoggedInUser,
  } = props

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Logs in a user
  const onLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)

      if ({}.hasOwnProperty.call(user, 'error')) {
        dispatch(createNotificationAction('error', user.error))
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
      dispatch(createNotificationAction('error', error.message))
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
  setLoggedInUser: PropTypes.func.isRequired,
}

export default LoginForm