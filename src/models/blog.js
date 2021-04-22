import { Schema, model } from 'mongoose'

const { Types } = Schema

const blogSchema = new Schema({
  _id: Types.ObjectId,
  owner: {
    ref: 'User',
    type: Types.ObjectId
  },
  text: {
    type: String
  },
  comments: [
    {
      ref: 'Comment',
      type: Types.ObjectId
    }
  ],
  tags: [
    {
      ref: 'Tag',
      type: Types.ObjectId
    }
  ]
})

export default model('Blog', blogSchema)
