import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

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

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={onChangeNameFilter} />
      <h2>Add New</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onChangeName={onChangeName}
        onChangeNumber={onChangeNumber}
        onAdd={onAdd}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App