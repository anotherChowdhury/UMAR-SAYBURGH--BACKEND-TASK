import UserResolvers from './user.resolver'

export default {
  Query: {
    getUser: UserResolvers.getUser
  },

  Mutation: {
    createUser: UserResolvers.createUser
  }
}
