import { Schema, model } from 'mongoose'

const { Types } = Schema

const tagSchema = new Schema({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  blogs: [
    {
      type: Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

export default model('Tag', tagSchema)
