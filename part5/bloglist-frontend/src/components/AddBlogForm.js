import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = (props) => {
  const {
    blogService,
    blogs, setBlogs,
    setErrorMessage,
    setNotificationMessage
  } = props

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
    try {
      const newBlog = await blogService.addBlog({ title, author, url })
      if ({}.hasOwnProperty.call(newBlog, 'error')) {
        setErrorMessage(newBlog.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      else {
        setBlogs([...blogs, newBlog])
        setNotificationMessage(
          `Added blog "${newBlog.title}" by author "${newBlog.author}"`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
      setTitle('')
      setAuthor('')
      setURL('')
      setVisible(false)
    }
    catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

AddBlogForm.propTypes = {
  blogService: PropTypes.object.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBlogs: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
}

export default AddBlogForm