// Filter Fixture Data
const defaultFilter = ''

// Reducer
const filterReducer = (state = defaultFilter, action) => {
  switch(action.type) {

    // Update the filter
    case 'SET_FILTER':
      return action.data

    // Do nothing otherwise
    default:
      return state
  }
}

// Action creator function for updating the filter
export const createSetFilterAction = (filter) => ({
  type: 'SET_FILTER',
  data: filter
})

export default filterReducer