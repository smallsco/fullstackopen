import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const onAdd = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name: newName}))
  }

  const onChangeName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input onChange={onChangeName} value={newName} />
        </div>
        <div>
          <button type="submit" onClick={onAdd}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map(person => <tr key={person.name}><td>{person.name}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default App