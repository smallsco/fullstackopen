// Third-Party Imports
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core'

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
    <Box component={Paper} p={4} width={1/3} mx='auto' m={4} >
      <Typography variant='h4'>
        Login to Blog App
      </Typography>
      <form>
        <TextField
          fullWidth
          required
          margin='normal'
          label='Username'
          variant='outlined'
          id='username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          fullWidth
          required
          margin='normal'
          label='Password'
          variant='outlined'
          id='password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          id='login'
          type='submit'
          onClick={onLogin}
        >
          Login
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm