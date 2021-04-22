import { Schema, model } from 'mongoose'

const { Types } = Schema

const commentSchema = new Schema({
  _id: Types.ObjectId,
  userId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  blogId: {
    type: Types.ObjectId,
    ref: 'Blog'
  },
  comment: {
    type: String,
    ref: 'User'
  }
})

export default model('Comment', commentSchema)
