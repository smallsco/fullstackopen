// Third-Party Imports
import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

// Render Notification if one exists in the store
const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification.message === null) {
    return null
  }

  return (
    <Box mt={1} mb={2}>
      <Alert id='notification' severity={notification.type}>
        {notification.message}
      </Alert>
    </Box>
  )
}

export default Notification