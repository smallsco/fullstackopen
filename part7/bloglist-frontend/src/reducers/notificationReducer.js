// Notification Fixture Data
const defaultNotificationObject = {
  type: null,
  message: null,
  timeoutID: null
}

// Reducer
const notificationReducer = (state = defaultNotificationObject, action) => {
  switch(action.type) {

    // Set the timeout ID so it can be cleared later.
    case 'SET_TIMEOUT_ID':
      return {
        message: state.message,
        type: state.type,
        timeoutID: action.data
      }

    // Display a new notification
    case 'SHOW_NOTIFICATION':
      if (state.timeoutID) {
        clearTimeout(state.timeoutID)
      }
      return {
        type: action.data.type,
        message: action.data.message,
        timeoutID: null
      }

    // Hide an existing notification
    case 'HIDE_NOTIFICATION':
      return {
        type: null,
        notification: null,
        timeoutID: null
      }

    // Do nothing otherwise
    default:
      return state
  }
}

// Action creator function for notifications that auto-hide and can have custom timeouts
export const createNotificationAction = (type, message, timeout = 5000) => {
  return async (dispatch) => {
    dispatch(createShowNotificationAction(type, message))
    const timeoutID = setTimeout(() => {
      dispatch(createHideNotificationAction())
    }, timeout)
    dispatch(createSetTimeoutAction(timeoutID))
  }
}

// Action creator function for displaying a new notification
export const createShowNotificationAction = (type, message) => ({
  type: 'SHOW_NOTIFICATION',
  data: { type, message }
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