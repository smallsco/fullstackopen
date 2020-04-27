// Third-Party Imports
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// My Imports
import { createVoteAction } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()

  // Get anecdotes from state and sort them by number of votes
  let anecdotes = useSelector(state => state)
  anecdotes.sort((a, b) => b.votes - a.votes)

  // Upvote an anecdote
  const vote = (id) => {
    dispatch(createVoteAction(id))
  }

  // Render anecdotes
  return (
    <>
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
    </>
  )
}

export default AnecdoteList