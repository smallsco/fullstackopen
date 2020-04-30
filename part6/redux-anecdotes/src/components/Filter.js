// Third-Party Imports
import React from 'react'
import { useDispatch } from 'react-redux'

// My Imports
import { createSetFilterAction } from '../reducers/filterReducer'


const Filter = () => {

  // Update filter when value changes
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(createSetFilterAction(event.target.value))
  }

  // Render Filter
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      Filter: <input onChange={handleChange} />
    </div>
  )
}

export default Filter