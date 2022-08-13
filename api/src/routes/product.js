import { Router } from 'express'
import { Product, Category } from '../models'
import Joi from 'joi'

const router = Router()

const schema = Joi.object().keys({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(2),
  category: Joi.string().alphanum()
})

const updateProductSchema = Joi.object().keys({
  name: Joi.string().min(2),
  description: Joi.string().min(2),
  category: Joi.string().alphanum()
})

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).populate('category')
    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({
      error: 'There was an error'
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const result = schema.validate(req.body)

    if (result.error) {
      throw {
        code: 400,
        details: {
          ...result.error
        }
      }
    }

    const product = await Product.create({
      ...result.value
    })

    console.log(product)

    return res.status(200).json(product)
  } catch (error) {
    console.error(error)
    if (error.details) {
      return res.status(400).json(error)
    }

    return res.status(500).json({
      error: 'There was an error'
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const product = await Product.findById(id).populate('category')

    if (!product) {
      throw {
        code: 404,
        details: {
          message: 'Product not found'
        }
      }
    }

    return res.status(200).json(product)
  } catch (error) {
    console.error(error)

    if (error.details) {
      return res.status(error.code).json(error)
    }
    return res.status(500).json({
      error: 'There was an error'
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const result = updateProductSchema.validate(req.body)

    if (result.error) {
      throw {
        code: 400,
        details: {
          ...result.error
        }
      }
    }

    const product = await Product.findOneAndUpdate({ _id: id }, { ...result.value }, { new: true }).populate('category')

    if (!product) {
      throw {
        code: 404,
        details: {
          message: 'Product not found'
        }
      }
    }

    return res.status(200).json(product)
  } catch (error) {
    console.error(error)
    if (error.details) {
      return res.status(error.code).json(error)
    }

    return res.status(500).json({
      error: 'There was an error'
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      throw {
        code: 404,
        details: {
          message: 'Product not found'
        }
      }
    }
    return res.status(200).json(product)
  } catch (error) {
    if (error.details) {
      return res.status(error.code).json(error)
    }
    return res.status(500).json({
      error: 'There was an error'
    })
  }
})

export default router
