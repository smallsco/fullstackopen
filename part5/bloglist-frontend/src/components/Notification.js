import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  messages: PropTypes.string
}

export default Notification