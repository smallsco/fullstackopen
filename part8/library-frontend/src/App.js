// Third-Party Dependencies
import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'

// My Dependencies
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  // Check local storage when component renders to see if a user is currently
  // logged in.
  useEffect(() => {
    const tokenString = window.localStorage.getItem('fsolibraryapp.loggedinuser')
    if (tokenString) {
      setToken(tokenString)
    }
  }, [])

  // When a user clicks logout, log them out and clear app cache
  const logout = () => {
    window.localStorage.removeItem('fsolibraryapp.loggedinuser')
    setToken(null)
    client.resetStore()
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