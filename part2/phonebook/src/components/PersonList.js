import React from 'react'
import Person from './Person'

const PersonList = ({persons, nameFilter}) => {
  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <table>
      <tbody>
        { filteredPersons.map(person =>
          <Person key={person.name} name={person.name} number={person.number} />
        )}
      </tbody>
    </table>
  )
}

export default PersonList