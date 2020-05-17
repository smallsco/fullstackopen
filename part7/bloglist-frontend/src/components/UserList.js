// Third-Party Imports
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Typography } from '@material-ui/core'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <>
      <Typography variant='h5' gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.name}>
                <TableCell><Link to={`/user/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserList