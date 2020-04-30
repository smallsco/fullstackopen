// Third-Party Imports
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// My Imports
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { createInitAction } from './reducers/anecdoteReducer'

const App = () => {
  // Fetch anecdotes from DB on app load
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(createInitAction(anecdotes)))
  }, [dispatch])

  // Render app
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App