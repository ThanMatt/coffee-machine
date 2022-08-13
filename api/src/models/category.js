import mongoose from 'mongoose'
import { Product } from '.'

const { Schema } = mongoose

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }]
})

categorySchema.pre('remove', function (next) {
  Product.updateMany({ category: this._id }, { category: '' })
  next()
})

const Category = mongoose.model('category', categorySchema)

export default Category
