import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVoteAction, createNewAnecdoteAction } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  // Get anecdotes from state and sort them by number of votes
  let anecdotes = useSelector(state => state)
  anecdotes.sort((a, b) => b.votes - a.votes)

  // Upvote an anecdote
  const vote = (id) => {
    dispatch(createVoteAction(id))
  }

  // Add a new anecdote
  const newAnecdote = (event) => {
    event.preventDefault()
    dispatch(createNewAnecdoteAction(event.target.anecdote.value))
  }

  // Render anecdotes and form
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App