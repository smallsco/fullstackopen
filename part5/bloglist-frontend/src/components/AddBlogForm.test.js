// Third-Party Imports
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

// My Imports
import AddBlogForm from './AddBlogForm'

test('Add Blog Form Component can be used to add a new blog', () => {
  
  // Fixtures
  const blogServiceFixture = {
    addBlog: jest.fn()
  }
  const blogFixture = {
    title: 'A Test Title',
    author: 'A Test Author',
    url: 'http://www.example.com'
  }

  // Render the component
  const component = render(
    <AddBlogForm
      blogService={blogServiceFixture}
      blogs={[]}
      setBlogs={jest.fn()}
      setErrorMessage={jest.fn()}
      setNotificationMessage={jest.fn()}
    />
  )

  // Show the form
  const showFormButton = component.getByText('Show Form')
  fireEvent.click(showFormButton)

  // Fill in the details
  const titleField = component.container.querySelector('#title')
  const authorField = component.container.querySelector('#author')
  const urlField = component.container.querySelector('#url')
  fireEvent.change(titleField, { 
    target: { value: blogFixture.title } 
  })
  fireEvent.change(authorField, { 
    target: { value: blogFixture.author } 
  })
  fireEvent.change(urlField, { 
    target: { value: blogFixture.url } 
  })

  // Submit the form
  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  // Check that it worked
  expect(blogServiceFixture.addBlog.mock.calls).toHaveLength(1)
  expect(blogServiceFixture.addBlog.mock.calls[0][0]).toEqual(blogFixture)
})