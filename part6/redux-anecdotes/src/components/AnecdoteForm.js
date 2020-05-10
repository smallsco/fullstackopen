// Third-Party Imports
import React from 'react'
import { connect } from 'react-redux'

// My Imports
import { createNewAnecdoteAction } from '../reducers/anecdoteReducer'
import { createNotificationAction } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

  // Add a new anecdote
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createNewAnecdoteAction(content)
    props.createNotificationAction(`Created new anecdote "${content}"`)
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

// Action Creators
const mapDispatchToProps = {
  createNewAnecdoteAction,
  createNotificationAction
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)