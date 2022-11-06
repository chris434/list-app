import { Category } from '../models/categoryModel.js'

export const createCategory = async(req, res) => {
    const categoryData = req.body
    const { userId } = req

    const listIds = 'listId' in categoryData ? { listIds: [categoryData.listId] } : {}

    try {
        console.log(listIds)
        const newCategory = new Category({...categoryData, userId, ...listIds })
        console.log(newCategory)
        await newCategory.save()
        res.status(200).json({ message: `category ${categoryData.categoryName} has been created` })
    } catch (error) {
        res.status(401).json(error.message)
    }
}

export const getUsersCategories = async(req, res) => {
    try {
        const { userId: adminID } = req.body

        const categories = await Category.find({ adminID })
        res.status(200).json(categories)
    } catch (error) {
        res.status(401).json(error.message)
    }
}