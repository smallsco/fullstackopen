// Third-Party Imports
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

// My Imports
import Blog from './blog'


describe('Blog Component', () => {
  let component, onDelete, setErrorMessage
  const blogServiceFixture = {
    likeBlog: jest.fn()
  }
  const blogFixture = {
    title: 'A Test Blog',
    author: 'A Test Author',
    url: 'http://www.example.com',
    likes: 1,
    id: '5e9ce38e8b0fa755c6f25dc3',
    user: {
      username: "root",
      name: "Root User",
      id: "5e9cd01061ebde470cfd9d64"
    }
  }
  const userFixture = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRkZW5uaXNvbiIsImlkIjoiNWU5Y2QxNmQ2YWE3MGQ0N2M2ODY1NWJhIiwiaWF0IjoxNTg3NTEyMzEzfQ.QjOfZximmHQdVg71kaqD5dQ0SR4dW71PO3i3pkSrFDY",
    "name": "Root User",
    "username": "root",
    "id": "5e9cd01061ebde470cfd9d64"
  }

  // Before each test, rerender component from fixture data and mock functions
  beforeEach(() => {
    onDelete = jest.fn()
    setErrorMessage = jest.fn()
    component = render(
      <Blog
        blog={blogFixture}
        blogService={blogServiceFixture}
        loggedInUser={userFixture}
        onDelete={onDelete}
        setErrorMessage={setErrorMessage}
      />
    )
  })

  test('displays title and author, but not URL or likes by default', () => {
    expect(component.container).toHaveTextContent(
      `${blogFixture.title} - ${blogFixture.author}`
    )
    expect(component.container).not.toHaveTextContent(blogFixture.url)
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('displays the URL and likes when view details is clicked', () => {
    const button = component.getByText('View Details')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blogFixture.url)
    expect(component.container).toHaveTextContent('likes')
  })

  test('clicking the like button causes the blog to be liked on each press', () => {
    const detailsButton = component.getByText('View Details')
    fireEvent.click(detailsButton)

    const likeButton = component.getByText('Like!')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(blogServiceFixture.likeBlog.mock.calls).toHaveLength(2)
  })
})