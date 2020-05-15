// Third-Party Imports
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// My Imports
import { createNewBlogAction } from '../reducers/blogReducer'

const AddBlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [visible, setVisible] = useState(false)

  const toggleVisibility = async (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  const onAdd = async (event) => {
    event.preventDefault()
    dispatch(createNewBlogAction({ title, author, url }))
    setTitle('')
    setAuthor('')
    setURL('')
    setVisible(false)
  }

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={onAdd}>
        { !visible &&
          <button onClick={toggleVisibility}>Show Form</button>
        }
        { visible &&
          <>
            Title: <input id='title' type='text' value={title} onChange={(event) => setTitle(event.target.value)} /><br />
            Author: <input id='author' type='text' value={author} onChange={(event) => setAuthor(event.target.value)} /><br />
            URL: <input id='url' type='text' value={url} onChange={(event) => setURL(event.target.value)} /><br />
            <button id='addBlog' type='submit'>Add New Blog</button>
            <button onClick={toggleVisibility}>Hide Form</button>
          </>
        }
      </form>
    </div>
  )
}

export default AddBlogForm