// Third-Party Imports
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'

// My Imports
import { createNewBlogAction } from '../reducers/blogReducer'

const AddBlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [visible, setVisible] = useState(false)

  const toggleVisibility = async (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  const onAdd = async (event) => {
    event.preventDefault()
    dispatch(createNewBlogAction({ title, author, url }))
    setTitle('')
    setAuthor('')
    setURL('')
    setVisible(false)
  }

  return (
    <>
      <Typography variant='h5' gutterBottom>
        Add New Blog
      </Typography>
      <form onSubmit={onAdd}>
        { !visible &&
          <Button variant="contained" color="secondary" onClick={toggleVisibility}>
            Show Form
          </Button>
        }
        { visible &&
          <Box component={Paper} p={2}>
            <TextField
              fullWidth
              required
              margin='normal'
              label='Title'
              variant='outlined'
              id='title'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Author'
              variant='outlined'
              id='author'
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
            <TextField
              fullWidth
              required
              margin='normal'
              label='URL'
              variant='outlined'
              id='url'
              value={url}
              onChange={(event) => setURL(event.target.value)}
            />
            <Grid container spacing={3} direction="row" justify="center" alignItems="center">
              <Grid item xs>
                <Button fullWidth id='addBlog' type='submit' variant="contained" color="primary">
                  Add New Blog
                </Button>
              </Grid>
              <Grid item xs>
                <Button fullWidth variant="contained" onClick={toggleVisibility}>
                  Hide Form
                </Button>
              </Grid>
            </Grid>
          </Box>
        }
      </form>
    </>
  )
}

export default AddBlogForm