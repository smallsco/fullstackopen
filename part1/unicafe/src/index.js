import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const total = good + neutral + bad
  const average = (good + (-1*bad))/total
  const positive_percentage = (good / total) * 100

  if (total <= 0) {
    return (
      <p>No Feedback Given</p>
    )
  }
  else {
    return (
      <>
        Good: {good}<br />
        Neutral: {neutral}<br />
        Bad: {bad}<br />
        Total: {total}<br />
        Average: {average}<br />
        Positive: {positive_percentage}%
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)