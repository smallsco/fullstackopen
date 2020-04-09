import React from 'react'

const Filter = ({ onChange }) => (
  <form>
    <div>
      Filter name with: <input onChange={onChange} />
    </div>
  </form>
)

export default Filter