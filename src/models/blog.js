import { Schema, model } from 'mongoose'

const { Types } = Schema

const blogSchema = new Schema({
  _id: Types.ObjectId,
  owner: {
    ref: 'User',
    type: Types.ObjectId
  },
  title: {
    type: String,
    requied: true
  },
  text: {
    type: String,
    required: true
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
