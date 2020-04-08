import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = (good + (-1*bad))/total
  const positive_percentage = (good / total) * 100

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h1>Statistics</h1>
      Good: {good}<br />
      Neutral: {neutral}<br />
      Bad: {bad}<br />
      Total: {total}<br />
      Average: {average}<br />
      Positive: {positive_percentage}%
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)