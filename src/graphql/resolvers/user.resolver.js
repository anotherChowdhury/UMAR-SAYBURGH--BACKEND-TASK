import User from '../../models/user'
import { Types } from 'mongoose'

export default {
  getUser: (_, { id }) => User.findById(id),
  createUser: async (_, { name, email, password }) => {
    console.log(name)
    console.log(email)
    console.log(password)
    return await User.create({ _id: new Types.ObjectId(), name, email, password })
  }
}
