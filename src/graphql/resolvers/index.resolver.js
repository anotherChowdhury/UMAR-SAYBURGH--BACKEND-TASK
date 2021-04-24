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
  Tag: {
    blogs: TagResolvers.getBlogsByTag
  },
  Query: {
    login: UserResolvers.login,
    me: UserResolvers.me,
    getBlog: BlogResolvers.getBlog,
    getBlogs: BlogResolvers.getBlogs,
    getBlogsByTags: BlogResolvers.getBlogsByTags,
    getBlogsByTag: TagResolvers.getBlogsByTag
  },

  Mutation: {
    register: UserResolvers.register,
    createBlog: BlogResolvers.createBlog,
    updateBlog: BlogResolvers.updateBlog,
    createTag: TagResolvers.createTag,
    createComment: CommentResolvers.createComment,
    updateComment: CommentResolvers.updateComment
  }
}
