import mongoose from 'mongoose'

const { Schema } = mongoose

const productSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
})

const Product = mongoose.model('product', productSchema)

export default Product
