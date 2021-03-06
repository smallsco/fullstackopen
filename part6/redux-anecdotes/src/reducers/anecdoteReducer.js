// My Imports
import anecdoteService from '../services/anecdotes'

// Reducer
const anecdoteReducer = (state = [], action) => {
  switch(action.type) {

    // Initialize anecdote list from fixed data
    case 'INIT':
      return action.data

    // Upvote an anecdote
    case 'VOTE':
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.data.id)
      const updatedAnecdote = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
      return state.map(anecdote => (
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      ))

    // Add a new anecdote
    case 'NEW':
      return [...state, action.data]

    // Do nothing otherwise
    default:
      return state
  }
}

// Action creator function for initializing anecdote list
export const createInitAction = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

// Action creator function for upvotina anecdotes
export const createVoteAction = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(updatedAnecdote, anecdote.id)
    dispatch({
      type: 'VOTE',
      data: {id: anecdote.id}
    })
  }
}

// Action creator function for creating a new anecdote
export const createNewAnecdoteAction = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer