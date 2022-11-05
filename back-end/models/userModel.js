import { profile } from 'console'
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
    email: { type: 'string', unique: true, required: true },
    username: { type: 'string', unique: true, required: true },
    password: { type: 'string', minLength: 8, required: true },
    SignedUpDate: { type: 'string', default: Date.now() },

    profile: {
        photoURL: { type: 'string', default: '' },
        privateProfile: { type: 'boolean', default: true }
    }
})
userSchema.plugin(uniqueValidator)
export const User = mongoose.model('user', userSchema)