// Third-Party Imports
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
    <div className='menu-background'>
      <Link to='/' className='menu-padding'>Blogs</Link>
      <Link to='/users' className='menu-padding'>Users</Link>
      <span className='menu-padding'>Welcome, {loggedInUser.name}!</span>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default Menu