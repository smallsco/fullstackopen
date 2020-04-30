// Third-Party Imports
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// My Imports
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

// Create Redux Store
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})
const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store