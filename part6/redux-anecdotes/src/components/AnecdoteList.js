// Third-Party Imports
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// My Imports
import { createVoteAction } from '../reducers/anecdoteReducer'
import { createNotificationAction } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()

  // Get anecdotes from state, filter them, and sort them by number of votes
  let anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)))
  anecdotes.sort((a, b) => b.votes - a.votes)

  // Upvote an anecdote
  const vote = (anecdote) => {
    dispatch(createVoteAction(anecdote))
    dispatch(createNotificationAction(`Voted for anecdote "${anecdote.content}"`))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList