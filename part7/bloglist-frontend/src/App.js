// Third-Party Imports
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

// My Imports
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import UserView from './components/UserView'
import { createDeleteBlogAction, createInitBlogsAction } from './reducers/blogReducer'
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

  // Deletes a blog
  const onDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to remove the blog "${blog.title}"?`)) {
      dispatch(createDeleteBlogAction(blog.id))
    }
  }

  // Look for a user ID in the URL and
  // get the corresponding user if it exists
  const match = useRouteMatch('/user/:id')
  const userToView = match ? users.find(u => u.id === match.params.id) : null

  // Render blogs or login form
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
            <Route path='/user/:id'>
              <UserView user={userToView} />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route path='/'>
              <AddBlogForm />
              <h2>Blogs</h2>
              <div id='bloglist'>
                {blogs.map(blog =>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    onDelete={onDelete}
                  />
                )}
              </div>
            </Route>
          </Switch>
        </div>
      }
    </>
  )
}

export default App