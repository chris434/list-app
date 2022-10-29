import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://localhost:8000' }))
app.use(bodyParser.json())


const PORT = process.argv.env || 8000


app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`)
})