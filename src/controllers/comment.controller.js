import Comment from '../models/comment'
import { Types } from 'mongoose'

export default {
  createComment: async ({ userId, blogId, comment }) => {
    console.log('In create comment')
    return await Comment.create({
      _id: Types.ObjectId(),
      user: userId,
      blog: blogId,
      comment
    })
  },
  getCommentsByBlogId: async (blogId) => {
    return await Comment.find({ blog: blogId })
  }
}
