import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} &nbsp;
      {visible &&
        <>
          <button onClick={() => setVisible(false)}>Hide Details</button><br />
          &nbsp;<br />
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button>Like!</button><br />
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
