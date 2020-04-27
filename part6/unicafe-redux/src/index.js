import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const onGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const onNeutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const onBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const onReset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const state = store.getState()

  return (
    <div>
      <button onClick={onGood}>good</button>
      <button onClick={onNeutral}>neutral</button>
      <button onClick={onBad}>bad</button>
      <button onClick={onReset}>reset stats</button>
      <div>Good: {state.good}</div>
      <div>Neutral: {state.ok}</div>
      <div>Bad: {state.bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
