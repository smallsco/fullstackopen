// Notification Fixture Data
const defaultMessage = null

// Reducer
const notificationReducer = (state = defaultMessage, action) => {
  switch(action.type) {

    // Display a new notification
    case 'SHOW_NOTIFICATION':
      return action.data

    // Hide an existing notification
    case 'HIDE_NOTIFICATION':
      return null

    // Do nothing otherwise
    default:
      return state
  }
}

// Action creator function for notifications that auto-hide and can have custom timeouts
export const createNotificationAction = (message, timeout = 5000) => {
  return async (dispatch) => {
    dispatch(createShowNotificationAction(message))
    setTimeout(() => {
      dispatch(createHideNotificationAction())
    }, timeout)
  }
}

// Action creator function for displaying a new notification
export const createShowNotificationAction = (message) => ({
  type: 'SHOW_NOTIFICATION',
  data: message
})

// Action creator function for hiding the notification
export const createHideNotificationAction = () => ({
  type: 'HIDE_NOTIFICATION'
})

export default notificationReducer