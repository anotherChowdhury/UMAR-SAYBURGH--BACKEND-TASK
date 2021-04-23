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

  addBlogToTags: async (tags, blogId) => {
    for (let i = 0; i < tags.length; i++) {
      tags[i].blogs.push(blogId)
      await tags[i].save()
    }
  }
}
