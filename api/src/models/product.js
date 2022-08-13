import mongoose from 'mongoose'

const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  }
})

const Product = mongoose.model('product', productSchema)

export default Product
