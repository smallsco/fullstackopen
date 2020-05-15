// Third-Party Imports
import React from 'react'
import { useSelector } from 'react-redux'

// Render Notification if one exists in the store
const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification.message === null) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification