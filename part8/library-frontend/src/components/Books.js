// Third-Party Dependencies
import React from 'react'
import { useQuery } from '@apollo/client'

// My Dependencies
import { ALL_BOOKS } from '../queries'


const Books = (props) => {

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books