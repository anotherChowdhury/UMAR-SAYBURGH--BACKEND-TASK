import tagController from '../../controllers/tag.controller'

export default {
  getBlogTags: async (blog, {}) => {
    const { tags } = blog
    const tagObjects = []
    for (let i = 0; i < tags.length; i++) {
      const tag = await tagController.getTagById(tags[i])
      tagObjects.push(tag)
    }
    return tagObjects
  },
  createTag: async (_, { name }) => {
    return await tagController.createTag(name)
  },
  getBlogsByTag: async (_, { tag }) => {
    console.log(tag)
    const tagObject = await tagController.getTagByName(tag)
    console.log(tagObject)
    if (!tagObject) throw new Error('Tag not found')

    return await tagController.getBlogsByTag(tagObject)
  }
}
