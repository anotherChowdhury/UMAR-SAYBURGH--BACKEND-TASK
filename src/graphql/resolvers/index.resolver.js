import UserResolvers from './user.resolver'
import BlogResolvers from './blog.resolver'
import TagResolvers from './tag.resolver'
import CommentResolvers from './comment.resolver'
export default {
  Blog: {
    owner: UserResolvers.getBlogOwner,
    tags: TagResolvers.getBlogTags,
    comments: CommentResolvers.getAllCommentsOfABlog
  },
  Comment: {
    blog: BlogResolvers.getBlogbyComment,
    user: UserResolvers.getCommenter
  },

  Query: {
    getUser: UserResolvers.getUserById,
    getBlog: BlogResolvers.getBlog,
    getBlogs: BlogResolvers.getBlogs
  },

  Mutation: {
    createUser: UserResolvers.createUser,
    createBlog: BlogResolvers.createBlog,
    createTag: TagResolvers.createTag,
    createComment: CommentResolvers.createComment
  }
}
