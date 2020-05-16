// My Imports
import blogService from '../services/blogs'
import loginService from '../services/login'
import { createNotificationAction } from './notificationReducer'

// User Fixture Data
const defaultUserObject = {
  id: null,
  name: null,
  token: null,
  username: null
}

// Reducer
const loginReducer = (state = defaultUserObject, action) => {
  switch(action.type) {

    // Log user in
    case 'LOGIN': {
      return action.data
    }

    // Log user out
    case 'LOGOUT': {
      return defaultUserObject
    }

    // Do nothing otherwise
    default: {
      return state
    }
  }
}

// Action creator function for logging out a user
export const createLogoutAction = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('fsoblogapp.loggedinuser')
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT'
    })
  }
}

// Action creator function for logging in a user from their credentials
export const createLoginActionFromCredentials = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password)
      if ({}.hasOwnProperty.call(user, 'error')) {
        dispatch(createNotificationAction('error', user.error))
      }
      else {
        dispatch(createLoginActionFromUser(user))
      }
    }
    catch (error) {
      dispatch(createNotificationAction('error', error.message))
    }
  }
}

// Logs a user in from an existing user object (i.e. from local storage)
export const createLoginActionFromUser = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem(
      'fsoblogapp.loggedinuser',
      JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export default loginReducer