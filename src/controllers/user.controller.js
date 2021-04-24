import { Types } from 'mongoose'
import bcrypt from 'bcrypt'
import User from '../models/user'
import { createAccessToken, createRefreshToken } from '../tokens'
export default {
  register: async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      _id: Types.ObjectId(),
      name,
      email,
      password: hashedPassword
    })

    return true
  },

  login: async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) return null

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) return null

    return user
  },

  createTokens: (userId) => {
    const accessToken = createAccessToken(userId)
    const refreshToken = createRefreshToken(userId)

    return { refreshToken, accessToken }
  },

  getUserById: async (id) => {
    return await User.findById(id)
  }
}
