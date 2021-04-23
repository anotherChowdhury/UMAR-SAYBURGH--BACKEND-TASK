import Blog from '../../models/blog'
import { Types } from 'mongoose'
import tagController from '../../controllers/tag.controller'

export default {
  getBlogs: () => Blog.find({}),
  getBlog: (_, { id }) => Blog.findById(id),
  createBlog: async (_, { title, text, owner, tags }) => {
    const tagIds = []
    const tagObjects = []
    for (let i = 0; i < tags.length; i++) {
      let tag = await tagController.getTagByName(tags[i])
      if (!tag) {
        tag = await tagController.createTag(tags[i])
      }
      tagIds.push(tag._id)
      tagObjects.push(tag)
    }

    const blog = await Blog.create({
      _id: new Types.ObjectId(),
      title,
      text,
      owner,
      tags: tagIds
    })

    await tagController.addBlogToTags(tagObjects, blog._id)
    return blog
  },

  getBlogbyComment: (comment, {}) => Blog.findById(comment.blog)
}
