import User from '../../models/user'
import UserController from '../../controllers/user.controller'

export default {
  me: (_, {}, { req: { userId } }) => {
    if (!userId) throw new Error('Login Required')

    return UserController.getUserById(userId)
  },

  getBlogOwner: (blog, {}) => UserController.getUserById(blog.owner),
  register: async (_, { name, email, password }) => {
    return await UserController.register(name, email, password)
  },
  login: async (_, { email, password }, { res }) => {
    console.log(res)
    const user = await UserController.login(email, password)

    if (!user) throw new Error('Wrong email/password')

    const { accessToken, refreshToken } = UserController.createTokens(user._id)
    res.cookie('access-token', accessToken, { maxAge: 60 * 20 * 1000 })
    res.cookie('refresh-token', refreshToken, { maxAge: 60 * 60 * 24 * 10 * 1000 })
    return true
  },
  getCommenter: (comment, {}) => UserController.getUserById(comment.user)
}
