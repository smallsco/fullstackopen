// Third-Party Imports
import React from 'react'
import { connect } from 'react-redux'

// My Imports
import { createSetFilterAction } from '../reducers/filterReducer'


const Filter = (props) => {

  // Update filter when value changes
  const handleChange = (event) => {
    props.createSetFilterAction(event.target.value)
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

// Action Creators
const mapDispatchToProps = {
  createSetFilterAction
}

export default connect(null, mapDispatchToProps)(Filter)