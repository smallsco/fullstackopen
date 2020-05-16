// Third-Party Imports
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// My Imports
import { createLoginActionFromCredentials } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Logs in a user
  const onLogin = async (event) => {
    event.preventDefault()
    dispatch(createLoginActionFromCredentials({ username, password }))
    setUsername('')
    setPassword('')
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

export default LoginForm