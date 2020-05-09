// Third-Party Imports
import React from 'react'
import { useDispatch } from 'react-redux'

// My Imports
import { createNewAnecdoteAction } from '../reducers/anecdoteReducer'
import {
  createShowNotificationAction,
  createHideNotificationAction
} from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // Add a new anecdote
  const newAnecdote = async (event) => {
    event.preventDefault()
    dispatch(createNewAnecdoteAction(event.target.anecdote.value))
    dispatch(createShowNotificationAction(`Created new anecdote "${newAnecdote.content}"`))
    setTimeout(() => {
      dispatch(createHideNotificationAction())
    }, 5000)
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