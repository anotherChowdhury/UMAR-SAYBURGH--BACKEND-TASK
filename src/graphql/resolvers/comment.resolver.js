import commentController from '../../controllers/comment.controller'

export default {
  createComment: async (_, args) => {
    return await commentController.createComment(args)
  },
  getAllCommentsOfABlog: async (blog, {}) => {
    return await commentController.getCommentsByBlogId(blog._id)
  }
}
