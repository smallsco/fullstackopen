// Anecdote fixture data
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// Generate an ID
const getId = () => (100000 * Math.random()).toFixed(0)

// Turn an anecdote string into an object with ID and votes
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// Holds the initial app state (anecdote fixtures mapped to objects)
const initialState = anecdotesAtStart.map(asObject)

// Reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {

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

// Action creator function for upvotina anecdotes
export const createVoteAction = (id) => ({
  type: 'VOTE',
  data: {id}
})

// Action creator function for creating a new anecdote
export const createNewAnecdoteAction = (content) => ({
  type: 'NEW',
  data: {
    content: content,
    id: getId(),
    votes: 0
  }
})

export default reducer