// Third-Party Imports
import React, { useState } from 'react'

const Blog = ({ blog, blogService, setErrorMessage }) => {

  // Blog appearance
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // Default blogs to unexpanded and copy likes from props to state
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  // When clicking the like button we update the DB and then increment the
  // like count in the state by one
  const onLike = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.likeBlog(blog)
      if (response.hasOwnProperty('error')) {
        setErrorMessage(response.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      else {
        setLikes(likes + 1)
      }
    }
    catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Render blog to screen
  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} &nbsp;
      {visible &&
        <>
          <button onClick={() => setVisible(false)}>Hide Details</button><br />
          &nbsp;<br />
          <a href={blog.url}>{blog.url}</a><br />
          {likes} likes <button onClick={onLike}>Like!</button><br />
          posted by {blog.user.name}
        </>
      }
      {!visible &&
        <button onClick={() => setVisible(true)}>View Details</button>
      }
    </div>
  )
}

export default Blog
