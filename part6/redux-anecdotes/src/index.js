// Third-Party Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// My Imports
import store from './store'
import App from './App'

// Render App
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)