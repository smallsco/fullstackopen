// Third-Party Dependencies
import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

// My Dependencies
import { ALL_BOOKS, ME } from '../queries'


const Recommendations = (props) => {

  // Set up the hooks for the graphql queries.
  // The queries are chained so that getBooks will be run
  // when getMe has completed and returned a result.
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [getMe, meResult] = useLazyQuery(ME, {
    onCompleted: (data) => {
      getBooks({
        variables: {genre: data.me.favoriteGenre}
      })
    }
  })

  // If we are logged in run the getMe query.
  useEffect(() => {
    if (props.token) {
      getMe()
    }
  }, [getMe, props.token])

  // Do not show this page if we are showing another page or not logged in
  if (!props.show || !props.token) {
    return null
  }

  // Show a loading screen while fetching the books or current user
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