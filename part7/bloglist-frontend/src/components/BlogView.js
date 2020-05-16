// Third-Party Imports
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// My Imports
import { createLikeAction, createDeleteBlogAction } from '../reducers/blogReducer'

const BlogView = ({ blog }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const loggedInUser = useSelector(state => state.loggedInUser)

  if (!blog) {
    return null
  }

  // Deletes a blog
  const onDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to remove the blog "${blog.title}"?`)) {
      dispatch(createDeleteBlogAction(blog.id))
      history.push('/')
    }
  }

  // When clicking the like button we update the DB and then increment the
  // like count in the state by one
  const onLike = async (event) => {
    event.preventDefault()
    dispatch(createLikeAction(blog))
  }

  return (
    <>
      <h2>{blog.title} - {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br />
      {blog.likes} likes <button onClick={onLike}>Like!</button><br />
      posted by {blog.user ? blog.user.name : 'Missing User'}
      {blog.user && loggedInUser.id === blog.user.id &&
        <>
          &nbsp;<br />
          <button onClick={() => onDelete(blog)}>Delete</button>
        </>
      }
      <h3>Comments</h3>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </>
  )
}

export default BlogView