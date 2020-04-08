import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => (
  <button onClick={onClick}>{text}</button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

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
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="Total" value={total} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive_percentage + '%'} />
        </tbody>
      </table>
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
      <Button text="Good" onClick={() => setGood(good + 1)} />
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" onClick={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)