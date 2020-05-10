// Third-Party Imports
import React from 'react'
import { connect } from 'react-redux'

// My Imports
import { createVoteAction } from '../reducers/anecdoteReducer'
import { createNotificationAction } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  // Upvote an anecdote
  const vote = (anecdote) => {
    props.createVoteAction(anecdote)
    props.createNotificationAction(`Voted for anecdote "${anecdote.content}"`)
  }

  // Render anecdotes
  return (
    <>
      {props.anecdotes.map(anecdote =>
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

// Get anecdotes from state, filter them, and sort them by number of votes
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
                .filter(anecdote => anecdote.content.includes(state.filter))
                .sort((a, b) => b.votes - a.votes),
  }
}

// Action Creators
const mapDispatchToProps = {
  createNotificationAction,
  createVoteAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)