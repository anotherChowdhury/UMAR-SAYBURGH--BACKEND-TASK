import User from '../../models/user'
import { Types } from 'mongoose'

export default {
  getUserById: (_, { id }) => User.findById(id),
  getBlogOwner: (blog, {}) => User.findById(blog.owner),
  createUser: async (_, { name, email, password }) => {
    return await User.create({ _id: new Types.ObjectId(), name, email, password })
  },
  getCommenter: (comment, {}) => User.findById(comment.user)
}
