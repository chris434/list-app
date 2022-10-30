import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
    email: { type: 'string', unique: true, required: true },
    name: { type: 'string', maxLength: 25, required: true },
    password: { type: 'string', minLength: 8, required: true },
    SignedUpDate: { type: 'string', default: Date.now() }
})
userSchema.plugin(uniqueValidator)
export const User = mongoose.model('user', userSchema)