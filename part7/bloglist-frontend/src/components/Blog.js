// Third-Party Imports
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

// My Imports
import { createLikeAction } from '../reducers/blogReducer'

const Blog = (props) => {

  const { blog, onDelete } = props

  // Blog appearance
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  // Default blogs to unexpanded
  const [visible, setVisible] = useState(false)

  // When clicking the like button we update the DB and then increment the
  // like count in the state by one
  const onLike = async (event) => {
    event.preventDefault()
    dispatch(createLikeAction(blog))
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
          {blog.likes} likes <button onClick={onLike}>Like!</button><br />
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
  onDelete: PropTypes.func.isRequired
}

export default Blog
