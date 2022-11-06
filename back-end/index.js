import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import listRoutes from './routes/listRoutes.js'
import listItemRoutes from './routes/listItemRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'
import './db/db.config.js'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:8000' }))
app.use(bodyParser.json())
app.use('/auth', authRoutes)
app.use('/lists', listRoutes)
app.use('/lists/item', listItemRoutes)
app.use('/user', userRoutes)


const PORT = process.argv.env || 8000


app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`)
})