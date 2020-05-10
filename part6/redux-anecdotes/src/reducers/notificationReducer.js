// Notification Fixture Data
const defaultNotificationObject = {
  notification: null,
  timeoutID: null
}

// Reducer
const notificationReducer = (state = defaultNotificationObject, action) => {
  switch(action.type) {

    // Set the timeout ID so it can be cleared later.
    case 'SET_TIMEOUT_ID':
      return {
        notification: state.notification,
        timeoutID: action.data
      }

    // Display a new notification
    case 'SHOW_NOTIFICATION':
      if (state.timeoutID) {
        clearTimeout(state.timeoutID)
      }
      return {
        notification: action.data,
        timeoutID: null
      }

    // Hide an existing notification
    case 'HIDE_NOTIFICATION':
      return {
        notification: null,
        timeoutID: null
      }

    // Do nothing otherwise
    default:
      return state
  }
}

// Action creator function for notifications that auto-hide and can have custom timeouts
export const createNotificationAction = (message, timeout = 5000) => {
  return async (dispatch) => {
    dispatch(createShowNotificationAction(message))
    const timeoutID = setTimeout(() => {
      dispatch(createHideNotificationAction())
    }, timeout)
    dispatch(createSetTimeoutAction(timeoutID))
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

// Action creator function for setting the timeout ID
export const createSetTimeoutAction = (timeoutID) => ({
  type: 'SET_TIMEOUT_ID',
  data: timeoutID
})

export default notificationReducer