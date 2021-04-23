import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import UserTypeDefs from './graphql/types/user.type'
import resolvers from './graphql/resolvers/index.resolver'
import { DATABASE_URL } from './contants'

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

console.log(UserTypeDefs)

const server = new ApolloServer({
  typeDefs: [Query, Mutation, UserTypeDefs],
  resolvers: resolvers
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})
