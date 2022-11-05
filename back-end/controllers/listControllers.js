import { List } from '../models/listModel.js'

export const createList = async(req, res) => {
    const { adminID, listName } = req.body

    try {
        const newList = new List({ adminID, listName })

        await newList.save()
        res.status(200).json({ message: `list ${listName} has been created` })
    } catch (error) {
        const FIELDS = ['adminId', 'listName']

        FIELDS.forEach((field) => {
            if (Object.keys(error.errors)[0] === field) {
                res.status(401).json({ field, message: error.message })
            }
        })

    }
}

export const getLists = async(req, res) => {
    const { adminID } = req.body
    try {
        const lists = await List.find({ adminID })
        res.status(200).json(lists)
    } catch (error) {
        res.status(401).json(error.message)
    }
}

export const getList = async(req, res) => {
    const { list } = req
    res.status(200).json(list)
}

export const deleteList = async(req, res) => {
    const { id } = req.params

    try {
        await List.findByIdAndDelete(id)
        res.status(200).json({ message: `list ${id} has been deleted` })
    } catch (error) {
        res.status(401).json(error.message)
    }
}