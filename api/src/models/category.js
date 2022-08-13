import mongoose from 'mongoose'

const { Schema } = mongoose

const categorySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Category = mongoose.model('category', categorySchema)

export default Category
