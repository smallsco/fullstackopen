// Third-Party Imports
import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {

  const blogs = useSelector(state => state.blogs)
  const numBlogsByUser = _.countBy(blogs, blog => blog.user.name)

  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(numBlogsByUser).map(author => (
            <tr key={author}>
              <td>{author}</td>
              <td>{numBlogsByUser[author]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserList