import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import listRoutes from './routes/listRoutes.js'
import dotenv from 'dotenv'
import './db/db.config.js'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:8000' }))
app.use(bodyParser.json())
app.use('/auth', authRoutes)
app.use('/list', listRoutes)


const PORT = process.argv.env || 8000


app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`)
})