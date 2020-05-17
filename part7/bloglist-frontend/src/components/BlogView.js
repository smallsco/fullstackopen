// Third-Party Imports
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'

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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant='h5' gutterBottom>
            {blog.title} - {blog.author}
          </Typography>
          <Box component={Paper} p={2}>
            URL: <a href={blog.url}>{blog.url}</a><br />
            {blog.likes} likes <Button variant='contained' color='primary' onClick={onLike}>Like!</Button><br />
            posted by {blog.user ? blog.user.name : 'Missing User'}
            {blog.user && loggedInUser.id === blog.user.id &&
              <>
                &nbsp;<br />
                <Button variant='contained' color='secondary' onClick={() => onDelete(blog)}>Delete</Button>
              </>
            }
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h5' gutterBottom>
            Comments
          </Typography>
          <Box component={Paper} p={2}>
            <form onSubmit={onComment}>
              <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                <Grid item xs>
                  <TextField
                    fullWidth
                    required
                    margin='normal'
                    label='Comment'
                    variant='outlined'
                    id='comment'
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                </Grid>
                <Grid item xs>
                  <Button fullWidth id='addComment' variant='contained' color='primary' type='submit'>
                    Add Comment
                  </Button>
                </Grid>
              </Grid>
            </form>
            <ul>
              {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
            </ul>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default BlogView