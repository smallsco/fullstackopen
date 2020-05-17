// Third-Party Imports
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core'

// My Imports
import { createLogoutAction } from '../reducers/loginReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  // Logs out a user
  const onLogout = () => {
    dispatch(createLogoutAction())
  }

  return (
    <Box mb={1} mt={1}>
      <AppBar position='static' color='inherit' elevation={1} square={false}>
        <Toolbar>
          <Box mr={2}>
            <Typography variant='h6'>
              Blog App
            </Typography>
          </Box>
          <Button component={Link} to='/' color='inherit'>Blogs</Button>
          <Button component={Link} to='/users' color='inherit'>Users</Button>
          <div style={{ flexGrow: 1 }} />
          <Box mr={2}>
            <Typography variant='subtitle2'>
              Welcome, {loggedInUser.name}!
            </Typography>
          </Box>
          <Button variant='contained' onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Menu