import React, { useState } from 'react'

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

  const onAdd = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.addBlog({title, author, url})
      if (newBlog.hasOwnProperty('error')) {
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
      <form>
        Title: <input type='text' value={title} onChange={(event) => setTitle(event.target.value)} /><br />
        Author: <input type='text' value={author} onChange={(event) => setAuthor(event.target.value)} /><br />
        URL: <input type='text' value={url} onChange={(event) => setURL(event.target.value)} /><br />
        <button type='submit' onClick={onAdd}>Add New Blog</button>
      </form>
    </div>
  )
}

export default AddBlogForm