import { Schema, model } from 'mongoose'

const { Types } = Schema

const commentSchema = new Schema({
  _id: Types.ObjectId,
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  blog: {
    type: Types.ObjectId,
    ref: 'Blog'
  },
  comment: {
    type: String,
    required: true
  }
})

export default model('Comment', commentSchema)
