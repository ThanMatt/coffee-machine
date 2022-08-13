import { Router } from 'express'
import { Category, Product } from '../models'
import Joi from 'joi'

const router = Router()

const schema = Joi.object().keys({
  name: Joi.string().min(2).required().trim()
})

const updateCategorySchema = Joi.object().keys({
  name: Joi.string().min(2).trim()
})

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({}).populate('products')
    return res.status(200).json(categories)
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

    const category = await Category.create({
      ...result.value
    })

    console.log(category)

    return res.status(200).json(category)
  } catch (error) {
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

    const result = updateCategorySchema.validate(req.body)

    if (result.error) {
      throw {
        code: 400,
        details: {
          ...result.error
        }
      }
    }

    const category = await Category.findByIdAndUpdate(id, { ...result.value }, { new: true })

    if (!category) {
      throw {
        code: 404,
        details: {
          message: 'Category not found'
        }
      }
    }

    return res.status(200).json(category)
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

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const category = await Category.findById(id).populate('products')

    if (!category) {
      throw {
        code: 404,
        details: {
          message: 'Category not found'
        }
      }
    }

    return res.status(200).json(category)
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

    const category = await Category.findByIdAndRemove(id)

    if (!category) {
      throw {
        code: 404,
        details: {
          message: 'Category not found'
        }
      }
    }

    return res.status(200).json(category)
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

export default router
