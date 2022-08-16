import { Router } from 'express'
import { Product, Category } from '../models'
import Joi from 'joi'
import path from 'path'
import url from 'url'

const router = Router()

const schema = Joi.object().keys({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(2),
  category: Joi.string(),
  image: Joi.string()
})

const updateProductSchema = Joi.object().keys({
  name: Joi.string().min(2),
  description: Joi.string().min(2),
  category: Joi.string().alphanum(),
  image: Joi.string()
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

router.get('/images/:url(*)', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../images', req.params.url))
})

router.put('/upload', async (req, res) => {
  try {
    if (req.files) {
      const file = req.files.file
      const fileName = `${new Date().getTime().toString()}_${req.files.file.name}`
      const newPath = path.resolve(__dirname, '../../images', fileName)

      file.mv(newPath, async (err) => {
        if (err) {
          throw err
        }

        const url = `http://localhost:4000/v1/product/images/${fileName}`

        return res.status(200).json({ image: url })
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'There was an error' })
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

    const { image } = result.value
    console.log(image)

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
