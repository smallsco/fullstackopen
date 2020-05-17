// Third-Party Imports
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Box, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core'

const BlogList = () => {

  // Get blogs from store
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <Typography variant='h5' gutterBottom>
        Blogs
      </Typography>
      <Box component={Paper} >
        <List dense id='bloglist'>
          {blogs.map(blog =>
            <ListItem button component={Link} to={`/blog/${blog.id}`} key={blog.id}>
              <ListItemText primary={blog.title} secondary={blog.author} />
            </ListItem>
          )}
        </List>
      </Box>
    </>
  )
}

export default BlogList