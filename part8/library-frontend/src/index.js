// Third-Party Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client'

// My Dependencies
import App from './App'

// Connect to GraphQL Server
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

// Render App
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)