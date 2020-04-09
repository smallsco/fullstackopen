import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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
  const onChangeNameFilter = (event) => {
    setNameFilter(event.target.value)
  }
  const onChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          Filter name with: <input onChange={onChangeNameFilter} />
        </div>
      </form>
      <h2>Add New</h2>
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
          { filteredPersons.map(person =>
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