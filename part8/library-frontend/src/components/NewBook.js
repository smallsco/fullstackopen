// Third-Party Dependencies
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

// My Dependencies
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, ME } from '../queries'

const NewBook = (props) => {
  const [error, setError] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  // Get favourite genre
  const meResult = useQuery(ME)

  // When adding a new book keep the all books/authors views up to date
  // to keep recommendations up to date we manually update the cache
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({
        query: ALL_BOOKS,
        variables: {genre: meResult.data.me.favoriteGenre}
      })
      if (response.data.addBook.genres.includes(meResult.data.me.favoriteGenre)) {
        store.writeQuery({
          query: ALL_BOOKS,
          variables: {genre: meResult.data.me.favoriteGenre},
          data: {
            ...dataInStore,
            allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
          }
        })
      }
    }
  })

  // Do not show this page if we are showing another page
  if (!props.show) {
    return null
  }

  // Adds a new book to the server using a GraphQL mutation
  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  // Adds additional genres to a book
  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  // Renders the add new book form
  return (
    <div>
      {error &&
        <>
          <br />
          <span style={{color: 'red'}}>{error}</span>
        </>
      }
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook