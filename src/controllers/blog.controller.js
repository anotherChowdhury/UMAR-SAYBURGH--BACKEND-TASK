import Blog from '../models/blog'
import { Types } from 'mongoose'

export default {
  getBlogsByTags: async (tagIds) => {
    return await Blog.find({ tags: { $all: tagIds } })
  },
  getBlogByUser: (userId) => {
    return Blog.find({ owner: userId })
  },
  getBlogs: () => {
    return Blog.find({})
  },
  getBlogById: async (blogId) => {
    return await Blog.findById(blogId)
  },
  createBlog: async (title, text, owner, tags) => {
    console.log(owner)
    console.log(tags)
    return await Blog.create({
      _id: Types.ObjectId(),
      title,
      text,
      owner,
      tags
    })
  },
  editBlog: async (blog, args) => {
    console.log(args)
    Object.keys(args).map((key) => {
      if (blog[key]) blog[key] = args[key]
    })
    return await blog.save()
  }
}
