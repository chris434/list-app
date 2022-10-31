import { List } from '../models/listModel.js'
import { User } from '../models/userModel.js'

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
    const { list } = req.body
    res.status(200).json(list)

}
export const addListItem = async(req, res) => {
    const { id } = req.params
    const { itemName, list } = req.body
    const { listItems } = list

    try {

        if (!itemName) {
            throw new Error('item name is required')
        }
        const newListItem = {...listItems, ... { itemName } }
        await List.findByIdAndUpdate({ _id: id }, { listItems: [...listItems, newListItem] })
        res.status(200).json({ message: `item name ${itemName} has been added` })
    } catch (error) {
        res.status(401).json(error.message)
    }

}
export const editListItem = async(req, res) => {
    const { id } = req.params
    const { listItemId } = req.query
    const listItemFields = req.body

    let fields = {}
    Object.entries(listItemFields).forEach(([key, value]) => {
        fields = {...fields, [`listItems.$.${key}`]: value }
    })

    try {
        await List.updateOne({ _id: id, "listItems._id": listItemId }, { $set: fields })

        res.status(200).json({ message: `list item ${listItemId} of list ${id} has been edited` })
    } catch (error) {
        res.status(200).json(error.message)
    }



}