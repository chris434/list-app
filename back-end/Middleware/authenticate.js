import jwt from 'jsonwebtoken'
import { List } from '../models/listModel.js'

export const authenticateUser = async(req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN)

        req.userId = verifiedToken.userId
        next()
    } catch (error) {
        res.status(401).json(error.message)
    }

}

export const authenticateList = async(req, res, next) => {
    const { id } = req.params
    try {
        const token = req.headers.authorization.split(' ')[1]
        const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN)

        const list = await List.findById(id)

        if (!list) {
            throw new Error(`list ${id} dose not exist`)
        }

        if (list.adminID !== verifiedToken.userId) {
            throw new Error("user dose not have access to this list")
        }
        req.list = list
        req.userId = verifiedToken.userId
        next()
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: `list id ${id} dose not exist` })
        }
        res.status(401).json(error.message)
    }


}