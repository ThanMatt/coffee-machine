import mongoose from 'mongoose'
import { Product } from '.'

const { Schema } = mongoose

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

categorySchema.pre('remove', function (next) {
  Product.updateMany({ category: this._id }, { category: '' })
  next()
})

const Category = mongoose.model('Category', categorySchema)

export default Category
