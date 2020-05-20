// Third-Party Imports
require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')

// My Imports
const Author = require('./models/author')
const Book = require('./models/book')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

// GraphQL Schema
const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

// GraphQL Resolvers
const resolvers = {
  Query: {
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      return Book.find({})
      // FIXME: need filtering for args.author / args.genre
    },
    allAuthors: () => {
      return Author.find({})
      // FIXME: need to implement bookCount for authors
    },
    bookCount: () => Book.estimatedDocumentCount()
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({
          name: args.author,
          born: null
        })
        try {
          await author.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const newBook = new Book({...args, author})
      try {
        await newBook.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newBook
    },
    editAuthor: (root, args) => {
      // FIXME: needs update to work with the database
      /*const authorToEdit = authors.find(author => author.name === args.name)
      if (!authorToEdit) {
        return null
      }
      authorToEdit.born = args.setBornTo
      authors = authors.map(author => author.name === args.name ? authorToEdit : author)
      return authorToEdit*/
    }
  }
}

// Run GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})