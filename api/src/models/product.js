import mongoose from 'mongoose'
import { Category } from '.'

const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
})

productSchema.pre('save', async function (next) {
  const category = await Category.findOne({ _id: this.category })
  console.log(category)

  if (!category) {
    return next()
  }

  const hasProduct = category.products.find((product) => product._id === this._id)

  if (hasProduct) {
    return next()
  }

  category.products = [this._id, ...category.products]
  category.save()
  return next()
})

productSchema.post('findOneAndUpdate', async function (result, next) {
  if (!result) {
    return next()
  }

  const category = await Category.findOne({ _id: result.category?._id })

  if (!category) {
    return next()
  }

  const hasProduct = category.products.find((product) => product._id === result._id)

  if (hasProduct) {
    return next()
  }

  category.products = [result._id, ...category.products]
  category.save()

  return next()
})

const Product = mongoose.model('Product', productSchema)

export default Product
