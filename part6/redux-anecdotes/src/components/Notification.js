// Third-Party Imports
import React from 'react'
import { useSelector } from 'react-redux'

// Render Notification
const Notification = () => {
  const notification = useSelector(state => state.notification.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      {notification &&
        <div style={style}>
          {notification}
        </div>
      }
    </>
  )
}

export default Notification