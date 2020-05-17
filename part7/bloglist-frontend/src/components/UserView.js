import React from 'react'
import { Box, Paper, Typography } from '@material-ui/core'

const UserView = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <Typography variant='h5' gutterBottom>
        {user.name}
      </Typography>
      <Box component={Paper} p={4} width={1/3}>
        <Typography variant='h6' gutterBottom>
          Added Blogs
        </Typography>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </Box>
    </>
  )
}

export default UserView