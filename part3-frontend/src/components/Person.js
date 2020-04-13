import React from 'react'

const Person = ({ name, number, onDelete }) => (
  <tr>
    <td>{name}</td>
    <td>{number}</td>
    <td><button onClick={onDelete}>Delete</button></td>
  </tr>
)

export default Person