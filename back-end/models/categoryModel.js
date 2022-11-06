import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    categoryName: { type: 'string', required: true },
    categoryColor: { type: 'string', required: true },
    icon: { type: 'string', required: true },
    adminID: { type: 'string', required: true },
    listIds: {
        type: [string],
        required: true,
        default: []
    }
})

export const Category = mongoose.model('categories', categorySchema)