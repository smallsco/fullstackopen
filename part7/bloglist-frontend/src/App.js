// Third-Party Imports
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

// My Imports
import AddBlogForm from './components/AddBlogForm'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import UserView from './components/UserView'
import { createInitBlogsAction } from './reducers/blogReducer'
import { createLoginActionFromUser, createLogoutAction } from './reducers/loginReducer'
import { createInitUsersAction } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  // Get all blogs and users when component renders.
  useEffect(() => {
    dispatch(createInitBlogsAction())
    dispatch(createInitUsersAction())
  }, [dispatch])
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  // Check local storage when component renders to see if a user is currently
  // logged in.
  useEffect(() => {
    const userJSON = window.localStorage.getItem('fsoblogapp.loggedinuser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(createLoginActionFromUser(user))
    }
  }, [dispatch])

  // Logs out a user
  const onLogout = () => {
    dispatch(createLogoutAction())
  }

  // Look for a user ID in the URL and
  // get the corresponding user if it exists
  const userMatch = useRouteMatch('/user/:id')
  const userToView = userMatch ? users.find(u => u.id === userMatch.params.id) : null

  // Look for a blog ID in the URL and
  // get the corresponding blog if it exists
  const blogMatch = useRouteMatch('/blog/:id')
  const blogToView = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  // Render correct part of app based on route
  return (
    <>
      <Notification />
      {!loggedInUser.id &&
        <LoginForm />
      }
      {loggedInUser.id &&
        <div>
          <h1>Blog App</h1>
          <p>
            Welcome, {loggedInUser.name}!
            <button onClick={onLogout}>Logout</button>
          </p>
          <Switch>
            <Route path='/blog/:id'>
              <BlogView blog={blogToView} />
            </Route>
            <Route path='/user/:id'>
              <UserView user={userToView} />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route path='/'>
              <AddBlogForm />
              <BlogList />
            </Route>
          </Switch>
        </div>
      }
    </>
  )
}

export default App