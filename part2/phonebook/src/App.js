import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const onAdd = (event) => {
    event.preventDefault()
    if ( persons.some(person => person.name === newName) )
    {
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
      const newPerson = {name: newName, number: newNumber}
      personService.create(newPerson).then(newPersonWithId =>
        setPersons(persons.concat(newPersonWithId))
      )
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

  const onDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.deletePerson(personToDelete.id).then(
        setPersons(persons.filter(person => person.id !== personToDelete.id))
      )
    }
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
      <PersonList
        persons={persons}
        nameFilter={nameFilter}
        onDelete={onDelete}
      />
    </div>
  )
}

export default App