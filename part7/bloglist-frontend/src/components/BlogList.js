// Third-Party Imports
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {

  // Get blogs from store
  const blogs = useSelector(state => state.blogs)

  // Blog appearance
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      <h2>Blogs</h2>
      <div id='bloglist'>
        {blogs.map(blog =>
          <div key={blog.id} style={blogStyle} className='blog'>
            <Link to={`/blog/${blog.id}`}>{blog.title} - {blog.author}</Link>
          </div>
        )}
      </div>
    </>
  )
}

export default BlogList