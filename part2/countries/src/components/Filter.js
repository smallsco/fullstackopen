import React from 'react'

const Filter = ({ onChange }) => (
  <form>
    <div>
      Find Countries: <input onChange={onChange} />
    </div>
  </form>
)

export default Filter