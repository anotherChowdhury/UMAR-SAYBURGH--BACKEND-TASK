import { model, Schema } from 'mongoose'

const { Types } = Schema
const userSchema = new Schema({
  _id: Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

export default model('User', userSchema)
