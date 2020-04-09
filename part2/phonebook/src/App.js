import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-555-5555' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onAdd = (event) => {
    event.preventDefault()
    if ( persons.some(person => person.name === newName) )
    {
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  const onChangeName = (event) => {
    setNewName(event.target.value)
  }
  const onChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input onChange={onChangeName} value={newName} />
        </div>
        <div>
          Number: <input onChange={onChangeNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={onAdd}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          { persons.map(person =>
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App