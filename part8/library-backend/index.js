// Third-Party Imports
require('dotenv').config()
const { ApolloServer, AuthenticationError, PubSub, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

// My Imports
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

// Set up Pub-Sub interface
const pubsub = new PubSub()

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

// GraphQL Resolvers
const resolvers = {
  Query: {
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      let books
      if (!args.genre) {
        books = await Book.find({}).populate('author')
      }
      else {
        books = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
      books = books.map(book => ({
        ...book._doc,
        id: book._doc._id,
        author: {
          ...book._doc.author._doc,
          id: book._doc.author._doc._id,
          bookCount: Book.countDocuments({ author: book._doc.author._doc._id })
        }
      }))
      return books
      // FIXME: need filtering for args.author
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors.map(author => ({...author._doc, bookCount: Book.countDocuments({ author: author._id })}))
    },
    bookCount: () => Book.estimatedDocumentCount(),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Missing Authentication Token")
      }
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
      newBook.author.bookCount = Book.countDocuments({ author: newBook.author._id })
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Missing Authentication Token")
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      author.bookCount = Book.countDocuments({ author: author.id })

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const newUser = new User({...args})
      try {
        await newUser.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'opensesame') {
        throw new UserInputError('Incorrect username or password')
      }
      return {
        value: jwt.sign({
          username: user.username,
          id: user._id,
        }, process.env.JWT_SECRET)
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

// Run GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const authHeader = req ? req.headers.authorization : null
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(authHeader.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})