import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState((new Array(props.anecdotes.length)).fill(0))
  const [mostVotedID, setMostVotedID] = useState(0)
  const [mostVotedValue, setMostVotedValue] = useState(0)

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const voteAnecdote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)

    if (newVotes[selected] > mostVotedValue) {
      setMostVotedValue(newVotes[selected])
      setMostVotedID(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]}<br />
      has {votes[selected]} votes<br />
      <button onClick={voteAnecdote}>Vote</button>
      <button onClick={randomAnecdote}>Random Anecdote</button>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVotedID]}<br />
      has {mostVotedValue} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)