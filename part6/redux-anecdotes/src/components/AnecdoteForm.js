// Third-Party Imports
import React from 'react'
import { useDispatch } from 'react-redux'

// My Imports
import { createNewAnecdoteAction } from '../reducers/anecdoteReducer'
import { createNotificationAction } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // Add a new anecdote
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createNewAnecdoteAction(content))
    dispatch(createNotificationAction(`Created new anecdote "${content}"`))
  }

  // Render New Anecdote Form
  return (
    <>
      <h2>Create New Anecdote</h2>
      <form onSubmit={newAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm