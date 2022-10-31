import jwt from 'jsonwebtoken'
import { List } from '../models/listModel.js'

export const authenticateUser = async(req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN)

        req.body.adminID = verifiedToken.userId
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
        if (list.adminID !== verifiedToken.userId) {
            throw new Error("user dose not have access to this list")
        }

        req.body.list = list
        next()
    } catch (error) {
        res.status(401).json(error.message)
    }


}