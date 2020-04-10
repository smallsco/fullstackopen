import React from 'react'
import Person from './Person'

const PersonList = ({persons, nameFilter, onDelete}) => {
  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <table>
      <tbody>
        { filteredPersons.map(person =>
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            onDelete={() =>{onDelete(person)}}
          />
        )}
      </tbody>
    </table>
  )
}

export default PersonList