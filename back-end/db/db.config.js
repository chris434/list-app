import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


mongoose.connect(process.env.DB_URL).then(() => {
    console.log('db confected')
}).catch(error => {
    console.log(error)
})