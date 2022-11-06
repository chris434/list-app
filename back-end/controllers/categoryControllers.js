import { Category } from '../models/categoryModel.js'

export const getUsersCategories = async(req, res) => {
    try {
        const { userId: adminID } = req.body

        const categories = await Category.find({ adminID })
        res.status(200).json(categories)
    } catch (error) {
        res.status(401).json(error.message)
    }
}