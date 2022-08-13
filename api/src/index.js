const express = require('express')
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { productRoutes, categoryRoutes } from './routes'
// const inventoryRoutes = require('./src/routes/inventory')

const app = express()
const port = 4000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('combined'))

mongoose.connect('mongodb://db:27017/coffee-app')
mongoose.connection.once('open', () => console.log('MongoDB connection: Success!'))

const prefix = '/v1'

app.use(`${prefix}/product`, productRoutes)
app.use(`${prefix}/category`, categoryRoutes)
app.listen(port, () => console.log(`Listning to port ${port}!`))
