import CommentController from '../../controllers/comment.controller'

export default {
  createComment: async (_, { blogId, comment }, { req }) => {
    if (!req.userId) throw new Error('Login Required')
    return await CommentController.createComment(req.userId, blogId, comment)
  },
  getAllCommentsOfABlog: async (blog, {}) => {
    return await CommentController.getCommentsByBlogId(blog._id)
  },

  updateComment: async (_, { comment, commentId }, { req }) => {
    if (!req.userId) throw new Error('Login Rrequired')
    const commentObject = await CommentController.getCommentById(commentId)

    if (commentObject.user != req.userId) throw new Error('Not Allowed')
    return await CommentController.editComment(commentObject, comment)
  }
}
