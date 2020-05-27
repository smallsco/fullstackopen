// Third-Party Dependencies
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import _ from 'lodash'

// My Dependencies
import { ALL_BOOKS } from '../queries'


const Books = (props) => {

  // Genre Filter State
  const [filter, setFilter] = useState(null)

  // Fetch the books from the backend using GraphQL
  const result = useQuery(ALL_BOOKS)

  // Do not show this page if we are showing another page
  if (!props.show) {
    return null
  }

  // Show a loading screen while fetching the books
  if (result.loading)  {
    return <div>Loading...</div>
  }

  // When we have fetched the books, render them
  const books = result.data.allBooks

  // Build unique list of genres for genre filter
  let allGenres = []
  books.forEach(book => {
    allGenres = allGenres.concat(book.genres)
  })
  allGenres = _.uniq(allGenres)

  // Render books
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book => (!filter || book.genres.includes(filter)) && (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {allGenres.map(genre =>
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
      )}
      <button onClick={() => setFilter(null)}>all genres</button>

    </div>
  )
}

export default Books