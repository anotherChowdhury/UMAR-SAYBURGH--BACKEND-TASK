import TagController from '../../controllers/tag.controller'
import BlogController from '../../controllers/blog.controller'

export default {
  getBlogs: () => BlogController.getBlogs(),
  getBlog: (_, { id }) => BlogController.getBlogById(id),
  createBlog: async (_, { title, text, tags }, { req }) => {
    const tagIds = []
    const tagObjects = []
    for (let i = 0; i < tags.length; i++) {
      let tag = await TagController.getTagByName(tags[i])
      if (!tag) {
        tag = await TagController.createTag(tags[i])
      }
      tagIds.push(tag._id)
      tagObjects.push(tag)
    }

    const blog = await BlogController.createBlog(title, text, req.userId, tagIds)
    await TagController.addBlogToTags(tagObjects, blog._id)
    return blog
  },
  getBlogbyComment: (comment, {}) => BlogController.getBlogById(comment.blog),
  updateBlog: async (_, args, { req }) => {
    if (!req.userId) throw new Error('Login Required')
    const { blogId, tags, title, text } = args
    const blog = await BlogController.getBlogById(blogId)

    if (!blog) throw new Error('Blog not found')
    if (blog.owner != req.userId) throw new Error('Not Allowed')

    if (!tags) {
      return await BlogController.editBlog(blog, { title, text })
    }

    const { tags: blogTags } = blog

    const tagIds = []
    const removeTags = []
    const newTags = []
    let tagsLeft = []

    for (let i = 0; i < blogTags.length; i++) {
      const tag = await TagController.getTagById(blogTags[i])
      if (!tags.includes(tag.name)) removeTags.push(tag)
      else {
        tagIds.push(tag._id)
        tagsLeft = tags.filter((tagName) => tagName != tag.name)
      }
    }

    for (let i = 0; i < tagsLeft.length; i++) {
      const tag = await TagController.getTagByName(tagsLeft[i])
      if (tag) {
        newTags.push(tag)
        tagIds.push(tag._id)
        continue
      }

      const newTag = await TagController.createTag(tag[i])
      newTags.push(newTag)
      tagIds.push(newTag._id)
    }

    args.tags = tagIds

    const updatedBlog = await BlogController.editBlog(blog, args)

    await TagController.addBlogToTags(newTags, blog)

    await TagController.removeBlogFromTags(removeTags, blog)

    return updatedBlog
  },
  getBlogsByTags: async (_, { tags }) => {
    const tagIds = []
    for (let i = 0; i < tags.length; i++) {
      const tag = await TagController.getTagByName(tags[i])
      if (tag) tagIds.push(tag._id)
    }

    return await BlogController.getBlogsByTags(tagIds)
  }
}
