// Third-Party Dependencies
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

// My Dependencies
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries'


const Authors = (props) => {

  // State for form fields
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  // Fetch the authors from the backend using GraphQL
  const result = useQuery(ALL_AUTHORS)

  // When adding a new book keep the all authors views up to date
  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  // Do not show this page if we are showing another page
  if (!props.show) {
    return null
  }

  // Show a loading screen while fetching the authors
  if (result.loading)  {
    return <div>Loading...</div>
  }

  // Adds a new book to the server using a GraphQL mutation
  const submit = async (event) => {
    event.preventDefault()

    editBirthYear({
      variables: {
        name,
        setBornTo: Number(birthYear)
      }
    })

    setName('')
    setBirthYear('')
  }

  // When we have fetched the authors, render them
  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Edit Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Birth Year
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default Authors
