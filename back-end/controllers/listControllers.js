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
    const { list } = req.body
    res.status(200).json(list)

}
export const addListItem = async(req, res) => {
    const { id } = req.params
    const { itemName } = req.body

    try {

        if (!itemName) {
            throw new Error('item name is required')
        }

        await List.updateOne({ _id: id }, { $push: { listItems: { itemName } } })
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

export const deleteListItem = async(req, res) => {
    const { id } = req.params
    const { listItemId } = req.query
    console.log(id)
    try {
        await List.updateOne({ _id: id }, { $pull: { listItems: { _id: listItemId } } })
        res.status(200).json({ message: `list item ${listItemId} of list ${id} has been deleted` })
    } catch (error) {

        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: `list item id ${listItemId} dose not exist` })
        }
        res.status(402).json(error.message)
    }
}