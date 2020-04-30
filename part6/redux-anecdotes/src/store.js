// Third-Party Imports
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// My Imports
import reducer from './reducers/anecdoteReducer'

// Create Redux Store
const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store