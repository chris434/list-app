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