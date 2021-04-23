import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import UserTypeDefs from './graphql/types/user.type'
import BlogTypeDefs from './graphql/types/blog.type'
import CommentTypeDefs from './graphql/types/comment.type'
import TagTypeDefs from './graphql/types/tag.type'
import resolvers from './graphql/resolvers/index.resolver'
import { DATABASE_URL } from './contants'
import UserController from './controllers/user.controller'

mongoose.connect(
  DATABASE_URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) console.log(err)
    console.log('Connection Successful')
  }
)

const app = express()

const Query = `
  type Query {
    _empty: String
  }
`

const Mutation = `
  type Mutation {
    _empty: String
  }
`

const server = new ApolloServer({
  typeDefs: [Query, Mutation, UserTypeDefs, BlogTypeDefs, CommentTypeDefs, TagTypeDefs],
  resolvers: resolvers
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})
