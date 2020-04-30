// Notification Fixture Data
const defaultMessage = 'Notification Message'

// Reducer
const notificationReducer = (state = defaultMessage, action) => {
  switch(action.type) {

    // Display a new notification
    case 'SHOW_NOTIFICATION':
      return action.data

    // Do nothing otherwise
    default:
      return state
  }
}

// Action creator function for displaying a new notification
export const createShowNotificationAction = (message) => ({
  type: 'SHOW_NOTIFICATION',
  data: message
})

export default notificationReducer