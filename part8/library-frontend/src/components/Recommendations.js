// Third-Party Dependencies
import React from 'react'
import { useQuery } from '@apollo/client'

// My Dependencies
import { ALL_BOOKS, ME } from '../queries'


const Recommendations = (props) => {

  // Fetch the books from the backend using GraphQL
  const result = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME)

  // Do not show this page if we are showing another page
  if (!props.show) {
    return null
  }

  // Show a loading screen while fetching the books
  if (result.loading || meResult.loading)  {
    return <div>Loading...</div>
  }

  // When we have fetched the books, render them
  const books = result.data.allBooks
  const favoriteGenre = meResult.data.me.favoriteGenre

  // Render books
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{favoriteGenre}</strong></p>

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
          {books.map(book => (book.genres.includes(favoriteGenre)) && (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Recommendations