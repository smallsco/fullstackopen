import React from 'react'

const UserView = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>Added Blogs</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserView