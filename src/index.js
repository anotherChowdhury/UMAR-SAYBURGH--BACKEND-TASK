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
import cookieParser from 'cookie-parser'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './contants'
import { verify } from 'jsonwebtoken'

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

app.use(cookieParser())

app.use((req, res, next) => {
  const refreshToken = req.cookies['refresh-token']
  const accessToken = req.cookies['access-token']
  if (!refreshToken && !accessToken) {
    return next()
  }

  try {
    const data = verify(accessToken, ACCESS_TOKEN_SECRET)
    req.userId = data.userId
    return next()
  } catch (err) {
    console.log(err.message)
  }

  if (!refreshToken) {
    return next()
  }

  let data

  try {
    data = verify(refreshToken, REFRESH_TOKEN_SECRET)
  } catch {
    return next()
  }

  const tokens = UserController.createTokens(data.userId)

  res.cookie('refresh-token', tokens.refreshToken, { maxAge: 60 * 60 * 24 * 10 * 1000 })
  res.cookie('access-token', tokens.accessToken, { maxAge: 60 * 20 * 1000 })
  req.userId = data.userId
  next()
})

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
  resolvers: resolvers,
  context: ({ req, res }) => ({ req, res })
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})
