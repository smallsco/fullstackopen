import React from 'react'

const LoginForm = (props) => {
  const {
    username, onChangeUsername,
    password, onChangePassword,
    onLogin
  } = props

  return (
    <div>
      <h1>Login to Blog App</h1>
      <form>
        Username: <input type='text' value={username} onChange={onChangeUsername} /><br />
        Password: <input type='password' value={password} onChange={onChangePassword} /><br />
        <button type='submit' onClick={onLogin}>Login</button>
      </form>
    </div>
  )
}

export default LoginForm