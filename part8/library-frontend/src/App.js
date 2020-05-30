// Third-Party Dependencies
import React, { useEffect, useState } from 'react'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'

// My Dependencies
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, BOOK_ADDED, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [getMe, meResult] = useLazyQuery(ME)
  const client = useApolloClient()

  // Keep all app views up to date when a book is added
  // (from within the app or from an outside source)
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      const dataInStoreAllBooks = client.readQuery({
        query: ALL_BOOKS
      })
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStoreAllBooks,
          allBooks: [ ...dataInStoreAllBooks.allBooks, addedBook ]
        }
      })
      if (meResult.data) {
        const dataInStoreFilteredBooks = client.readQuery({
          query: ALL_BOOKS,
          variables: {genre: meResult.data.me.favoriteGenre}
        })
        if (addedBook.genres.includes(meResult.data.me.favoriteGenre)) {
          client.writeQuery({
            query: ALL_BOOKS,
            variables: {genre: meResult.data.me.favoriteGenre},
            data: {
              ...dataInStoreFilteredBooks,
              allBooks: [ ...dataInStoreFilteredBooks.allBooks, addedBook ]
            }
          })
        }
      }
    }
  })

  // Check local storage when component renders to see if a user is currently
  // logged in. If we are logged in run the getMe query.
  useEffect(() => {
    const tokenString = window.localStorage.getItem('fsolibraryapp.loggedinuser')
    if (tokenString) {
      setToken(tokenString)
      getMe()
    }
  }, [])  // eslint-disable-line

  // When a user clicks logout, log them out and clear app cache
  const logout = () => {
    window.localStorage.removeItem('fsolibraryapp.loggedinuser')
    setToken(null)
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => logout()}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
        token={token}
      />

      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
      />

    </div>
  )
}

export default App