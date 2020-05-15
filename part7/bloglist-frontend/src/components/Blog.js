// Third-Party Imports
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

// My Imports
import { createNotificationAction } from '../reducers/notificationReducer'

const Blog = (props) => {

  const { blog, blogService, loggedInUser, onDelete } = props

  // Blog appearance
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useDispatch()

  // Default blogs to unexpanded and copy likes from props to state
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  // When clicking the like button we update the DB and then increment the
  // like count in the state by one
  const onLike = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.likeBlog(blog)
      if ({}.hasOwnProperty.call(response, 'error')) {
        dispatch(createNotificationAction('error', response.error))
      }
      else {
        setLikes(likes + 1)
      }
    }
    catch (error) {
      dispatch(createNotificationAction('error', error.message))
    }
  }

  // Render blog to screen
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} - {blog.author} &nbsp;
      {visible &&
        <>
          <button onClick={() => setVisible(false)}>Hide Details</button><br />
          &nbsp;<br />
          <a href={blog.url}>{blog.url}</a><br />
          {likes} likes <button onClick={onLike}>Like!</button><br />
          posted by {blog.user ? blog.user.name : 'Missing User'}
          {blog.user && loggedInUser.id === blog.user.id &&
            <>
              &nbsp;<br />
              <button onClick={() => onDelete(blog)}>Delete</button>
            </>
          }
        </>
      }
      {!visible &&
        <button onClick={() => setVisible(true)}>View Details</button>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogService: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Blog
