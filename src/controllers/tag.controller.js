import Tag from '../models/tag'
import { Types } from 'mongoose'

export default {
  createTag: async (name) => {
    return await Tag.create({ _id: new Types.ObjectId(), name })
  },
  getTagByName: async (name) => {
    return await Tag.findOne({ name })
  },
  getTagById: async (id) => {
    return await Tag.findById(id)
  },

  addBlogToTags: async (tags, blog) => {
    for (let i = 0; i < tags.length; i++) {
      tags[i].blogs.push(blog._id)
      await tags[i].save()
    }
  },
  getBlogsByTag: async (tag) => {
    const { blogs } = await Tag.findById(tag._id).populate('blogs')
    return blogs
  },
  removeBlogFromTags: async (tags, blog) => {
    for (let i = 0; i < tags.length; i++) {
      tags[i].blogs.filter((blogId) => blogId != blog._id)
      await tags[i].save()
    }
  }
}
