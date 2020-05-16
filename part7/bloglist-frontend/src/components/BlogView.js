// Third-Party Imports
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// My Imports
import {
  createCommentAction,
  createLikeAction,
  createDeleteBlogAction
} from '../reducers/blogReducer'


const BlogView = ({ blog }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const [comment, setComment] = useState('')
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

  // Add comment functionality
  const onComment = async (event) => {
    event.preventDefault()
    dispatch(createCommentAction(blog.id, comment))
    setComment('')
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
      <form onSubmit={onComment}>
        <input id='comment' type='text' value={comment} onChange={(event) => setComment(event.target.value)} />&nbsp;
        <button id='addComment' type='submit'>Add Comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </>
  )
}

export default BlogView