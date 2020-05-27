// Third-Party Imports
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

// My Dependencies
import { LOGIN } from '../queries'


const LoginForm = ({show, setPage, setToken}) => {
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, loginResult] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  })

  // If we successfully log in, set the token
  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value
      setToken(token)
      setPage('authors')
      localStorage.setItem('fsolibraryapp.loggedinuser', token)
    }
  }, [loginResult.data])  // eslint-disable-line

  // Do not show this page if we are showing another page
  if (!show) {
    return null
  }

  // Logs in a user
  const onLogin = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      {error &&
        <>
          <br />
          <span style={{color: 'red'}}>{error}</span>
        </>
      }
      <h2>
        Login
      </h2>
      <form>
        Username:
        <input
          type='text'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        /><br />
        Password:
        <input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        /><br />
        <button
          type='submit'
          onClick={onLogin}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm